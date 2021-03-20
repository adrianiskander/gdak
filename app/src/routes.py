from flask import jsonify, redirect, render_template

from . import app, config


@app.route('/')
def index_route():
    """ Serve home page.
    """
    return render_template('index.html')


@app.route('/api/gps')
def gps_data_route():
    """ Return GPS json data.
    """
    data = config.GPS_DATA_CACHE
    if data:
        return jsonify(data), 200
    response = {'message': 'Not Found'}
    return jsonify(response), 404


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def redirect_404(path):
    """ Redirect non-existing routes to index route.
    """
    return redirect('/')
