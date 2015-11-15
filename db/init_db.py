import conf
import db
import entry


def ensure_db_exists():
    db.ensure_db_exists(conf.DB_NAME)

def ensure_tables_exists():
    entry.EntryDB.ensure_table_exists()


if __name__ == '__main__':
    ensure_db_exists()
    ensure_tables_exists()
