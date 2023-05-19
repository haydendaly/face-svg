import time
import board
from adafruit_apds9960.apds9960 import APDS9960
import requests

i2c = board.I2C()
apds = APDS9960(i2c)

apds.enable_proximity = True

def givePoint(target):
    url = 'https://hw3-bice.vercel.app/api/points/4242/0'
    data = {'target': target}
    response = requests.post(url, json=data)
    print(response)

max_so_far = 0
prev_time = 0
while True:
    # hardcoded wall
    if apds.proximity > 4 and time.time() - prev_time > 1:
        max_so_far = apds.proximity
        givePoint(0)
        prev_time = time.time()

    time.sleep(0.005)

