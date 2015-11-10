set -e

compass watch --sass-dir web/static/sass --css-dir web/static/build/css &

jsx --watch web/static/js/ web/static/build/js/ &

# TODO: Find a way to stop a rethinkdb instance from hanging
rethinkdb &

PYTHONPATH=. python main.py
