import os

from . import confsec, utils

DEBUG = confsec.DEBUG

APP_DIR = os.getcwd()

GPS_DATA_CACHE = None
GPS_DATA_URI = os.path.join(APP_DIR, 'gpsdata.json')
GPS_DATA_URL = 'http://ckan2.multimediagdansk.pl/gpsPositions'
