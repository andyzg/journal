import db
import json

import rethinkdb as r

class EntryDB(object):

    _TABLE_NAME = 'entry'

    @classmethod
    def ensure_table_exists(cls):
        db.ensure_table_exists(cls._TABLE_NAME)


    @classmethod
    def table(cls):
        return r.table(cls._TABLE_NAME)

    @classmethod
    def get_entries(cls, user_id):
        response = EntryDB.table() \
            .filter({'userId': user_id}) \
            .run(db.r_conn())
        return response

    @classmethod
    def post_entry(cls, user_model):
        print json.dumps(user_model.__dict__)
        response = EntryDB.table() \
            .insert(user_model.__dict__) \
            .run(db.r_conn())

        print response
        return response
