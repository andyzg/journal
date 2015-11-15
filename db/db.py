import rethinkdb as r

DB_HOST = 'localhost'
DB_PORT = 28015
DB_NAME = 'journal'


def r_conn():
    return r.connect(
        host=DB_HOST,
        port=DB_PORT,
        db=DB_NAME)

def ensure_table_exists(table_name):
    """Creates a table if it doesn't exist."""
    try:
        r.table_create(table_name, *args, **kwargs).run(r_conn())
    except r.RqlRuntimeError:
        pass  # Ignore table already created
