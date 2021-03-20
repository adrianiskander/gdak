import sys

from src.wsgi import application as app


ARGS = {
    'runserver': app.run
}


if __name__ == '__main__':
    ARGS[sys.argv[1]]()
