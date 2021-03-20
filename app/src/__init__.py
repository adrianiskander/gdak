from flask import Flask

from apscheduler.schedulers.background import BackgroundScheduler


app = Flask(__name__)
sched = BackgroundScheduler()


def create_app(config):
    """ Create new application instance.
    """
    app.config.from_object(config)

    # Imports here bypass circular dependencies
    from . import routes, tasks

    tasks.update_gps_data()
    start_scheduler(tasks)

    return app


def start_scheduler(tasks):
    """ Start background tasks scheduler.
    """
    sched.add_job(tasks.update_gps_data, 'interval', seconds=5)
    sched.start()
