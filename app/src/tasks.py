import requests

from . import config, utils


def update_gps_data():
    """ Request json data and store for later processing.
    """
    req = requests.get(config.GPS_DATA_URL)

    if not req.status_code == 200:
        return None
    
    data = req.json()
    utils.save_json(data, config.GPS_DATA_URI)
    config.GPS_DATA_CACHE = data

    return data
