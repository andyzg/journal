set -e

compass watch --sass-dir web/static/sass --css-dir web/static/build/css &

jsx --watch web/static/js/ web/static/build/js/ &

python web/server.py
