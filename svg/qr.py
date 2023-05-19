import qrcode
from qrcode.image.svg import SvgImage
from lxml import etree

url = 'https://hw3-bice.vercel.app/'

if __name__ == '__main__':
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white", image_factory=SvgImage)
    with open('qr_code.svg', 'wb') as f:
        f.write(etree.tostring(img._img, encoding='utf-8', xml_declaration=True))
