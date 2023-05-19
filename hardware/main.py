import time
import RPi.GPIO as GPIO
import requests

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# TODO(haydendaly): configure pins per board
LIGHT_SENSOR_PIN_0 = 4
LIGHT_SENSOR_PIN_1 = 17

GPIO.setup(LIGHT_SENSOR_PIN_0, GPIO.IN)
GPIO.setup(LIGHT_SENSOR_PIN_1, GPIO.IN)

DETECTION_INTERVAL = 0.01
ball_count_0 = 0
ball_count_1 = 0

def givePoint(target):
    url = 'https://hw3-bice.vercel.app/api/points/4242/0'
    data = {'target': target}
    response = requests.post(url, json=data)

    if response.status_code == 200:
        if target == 0:
            global ball_count_0
            ball_count_0 += 1
            print(f"Ball {ball_count_0} detected for target 0!")
        elif target == 1:
            global ball_count_1
            ball_count_1 += 1
            print(f"Ball {ball_count_1} detected for target 1!")
    else:
        print(f"Error sending POST request: {response.status_code}")

def detect_ball():
    if not GPIO.input(LIGHT_SENSOR_PIN_0):
        givePoint(0)
    if not GPIO.input(LIGHT_SENSOR_PIN_1):
        givePoint(1)

try:
    while True:
        detect_ball()
        time.sleep(DETECTION_INTERVAL)

except KeyboardInterrupt:
    print("\nExiting...")
    GPIO.cleanup()
