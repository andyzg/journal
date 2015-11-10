from flask import request

from jl_flask import jl_app

import flask

POST = 'POST'
GET = 'GET'

API_BASE = '/api'

print 'Starting api.py script.'

@jl_app.route(API_BASE + '/entry', methods=['GET', 'POST'])
def entry():
    # TODO: For starters, this should return the last 10 entries
    # from the database.
    data = {
        'entries': [{
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }, {
            'text': 'Hello World'
        }]
    }
    if request.method == POST:
        pass
    else:
        pass
    return flask.jsonify(**data)
