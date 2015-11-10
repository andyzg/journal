import flask

from jl_flask import jl_app


print 'Starting web.py script.'

@jl_app.route("/")
def index():
    return flask.render_template('index.html')
