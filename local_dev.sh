set -e

# TODO: Find a way to stop a rethinkdb instance from hanging
rethinkdb &

# Init the data
PYTHONPATH=. python db/init_db.py

compass watch --sass-dir web/static/sass --css-dir web/static/build/css &

webpack --config webpack.config.js --watch &

PYTHONPATH=. python main.py
