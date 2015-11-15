from . import db

import rethinkdb as r

class EntryDB(object):

    _TABLE_NAME = 'entry'

    @classmethod
    def ensure_table_exists(cls):
        db.ensure_table_exists(cls._TABLE_NAME)


    @classmethod
    def get_entries(user):
        pass

    @classmethod
    def post_entry(user_model):
        r.table(cls._TABLE_NAME) \
                .insert(user_model.json()) \
                .run(db.r_conn())
