set -e

compass watch --sass-dir web/static/sass --css-dir web/static/build/css &

webpack --config webpack.config.js --watch &

# TODO: Find a way to stop a rethinkdb instance from hanging
rethinkdb &

PYTHONPATH=. python main.py
