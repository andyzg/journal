import rethinkdb as r
import conf


def r_conn():
    return r.connect(
        host=conf.DB_HOST,
        port=conf.DB_PORT,
        db=conf.DB_NAME)


def ensure_db_exists(db_name, *args, **kwargs):
    """Creates a DB if it doesn't exist."""
    conn = r.connect()

    try:
        r.db_create(db_name, *args, **kwargs).run(conn)
    except r.RqlRuntimeError:
        pass  # Ignore DB already created


def ensure_table_exists(table_name, *args, **kwargs):
    """Creates a table if it doesn't exist."""
    try:
        r.table_create(table_name, *args, **kwargs).run(r_conn())
        print 'Successfully created table ' + table_name
    except r.RqlRuntimeError:
        print 'Table ' + table_name + ' has already been created.'
        pass  # Ignore table already created
