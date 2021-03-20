import json


def load_file(uri):
    """ Load file from given uri.
    """
    with open(uri, encoding='utf-8') as file:
        return file.read()


def save_json(data, uri):
    """ Save data as json file at given uri.
    """
    with open(uri, 'w') as file:
        json.dump(data, file, indent=2)
