import rethinkdb as r

DB_HOST = 'localhost'
DB_PORT = 28015
DB_NAME = 'journal'


def r_conn():
    return r.connect(
        host=DB_HOST,
        port=DB_PORT
        db=DB_NAME)
