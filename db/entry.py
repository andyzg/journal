import db

import rethinkdb as r

class EntryDB(object):

    _TABLE_NAME = 'entry'

    @classmethod
    def ensure_table_exists(cls):
        db.ensure_table_exists(cls._TABLE_NAME)


    @classmethod
    def get_entries(cls, user_id):
        pass

    @classmethod
    def post_entry(cls, user_model):
        response = r.table(cls._TABLE_NAME) \
                .insert(user_model.__dict__) \
                .run(db.r_conn())

        print response
        return response
