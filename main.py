import cv2
import numpy as np
from svgwrite import Drawing
from svgpathtools import Path, Line, wsvg


def convert_to_tritone(image, color1, color2, color3):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, img_bw1 = cv2.threshold(img_gray, 85, 255, cv2.THRESH_BINARY)
    _, img_bw2 = cv2.threshold(img_gray, 170, 255, cv2.THRESH_BINARY)

    color1_np = np.array(color1, dtype=np.uint8)
    color2_np = np.array(color2, dtype=np.uint8)
    color3_np = np.array(color3, dtype=np.uint8)

    img_color = np.zeros((*img_gray.shape, 3), dtype=np.uint8)
    img_color[img_gray <= 85] = color1_np
    img_color[np.logical_and(img_gray > 85, img_gray <= 170)] = color2_np
    img_color[img_gray > 170] = color3_np

    return img_color




def resize_to_fit(image, target_size):
    height, width = image.shape[:2]
    aspect_ratio = width / height

    if height > width:
        new_height = target_size
        new_width = int(aspect_ratio * new_height)
    else:
        new_width = target_size
        new_height = int(new_width / aspect_ratio)

    return cv2.resize(image, (new_width, new_height))

def detect_edges(image, low_threshold=100, high_threshold=200):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    img_blurred = cv2.GaussianBlur(img_gray, (5, 5), 0)
    img_edges = cv2.Canny(img_blurred, low_threshold, high_threshold)
    return img_edges



def save_svg_from_image(image, output_filename):
    height, width = image.shape[:2]

    drawing = Drawing(output_filename, size=(width, height))
    for y in range(height):
        for x in range(width):
            pixel_color = tuple(map(int, image[y, x]))
            drawing.add(drawing.rect(insert=(x, y), size=(
                1, 1), fill='rgb{}'.format(pixel_color)))

    drawing.save()

def save_svg_path_from_image(image, output_filename):
    height, width = image.shape[:2]
    paths = []


    for y in range(height):
        start_x = None
        for x in range(width):
            pixel_color = tuple(map(int, image[y, x]))

            if pixel_color != (255, 255, 255):  # Exclude white pixels
                if start_x is None:
                    start_x = x
            else:
                if start_x is not None:
                    paths.append(Path(Line(complex(start_x, y), complex(x, y))))
                    start_x = None

        if start_x is not None:
            paths.append(Path(Line(complex(start_x, y), complex(width, y))))

    colors = ['black'] * len(paths)
    stroke_widths = [1] * len(paths)

    wsvg(paths, colors=colors, stroke_widths=stroke_widths, filename=output_filename, dimensions=(width, height))

from svgpathtools import Path, Line, wsvg

def save_svg_from_image_single(image, output_filename):
    height, width = image.shape[:2]

    single_channel = len(image.shape) == 2

    paths = []
    for y in range(height):
        start_x = None
        for x in range(width):
            # Get pixel value
            pixel_value = image[y, x] if single_channel else tuple(map(int, image[y, x]))

            if pixel_value != 255:
                if start_x is None:
                    start_x = x
            else:
                if start_x is not None:
                    paths.append(Path(Line(complex(start_x, y), complex(x, y))))
                    start_x = None

        if start_x is not None:
            paths.append(Path(Line(complex(start_x, y), complex(width, y))))

    colors = ['black'] * len(paths)
    stroke_widths = [1] * len(paths)

    wsvg(paths, colors=colors, stroke_widths=stroke_widths, filename=output_filename, dimensions=(width, height))



SIZE = 1.5 # in
DPI = 96 # pix / in

def main(input_filename, output_filename):
    img = cv2.imread(input_filename)
    img_resized = resize_to_fit(img, int(SIZE * DPI))

    color1 = (0, 0, 0)
    color2 = (128, 128, 128)
    color3 = (255, 255, 255)
    img_tritone = convert_to_tritone(img_resized, color1, color2, color3)
    save_svg_from_image(img_tritone, output_filename)
    save_svg_path_from_image(img_tritone, 'path_' + output_filename)

    img_edges = detect_edges(img_resized)
    save_svg_from_image_single(img_edges, 'edges_path_' + output_filename)

if __name__ == "__main__":
    input_filename = 'me.jpg'
    output_filename = 'output_image.svg'
    main(input_filename, output_filename)
