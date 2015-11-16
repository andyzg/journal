from flask import request

from db.models.entry import EntryModel
from db.entry import EntryDB
from jl_flask import jl_app


import flask

POST = 'POST'
GET = 'GET'

API_BASE = '/api'

print 'Starting api.py script.'

@jl_app.route(API_BASE + '/entry', methods=['GET', 'POST'])
def entry():
    user_id = 'andyzg'
    if request.method == POST:
        text = 'Hello world!'
        model = EntryModel(user_id, text)
        return flask.jsonify(**EntryDB.post_entry(model))

    elif request.method == GET:
        entries = list(EntryDB.get_entries(user_id))
        print entries
        return flask.jsonify({
            'entries': entries
        })
