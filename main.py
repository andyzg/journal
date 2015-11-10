from web import web
from web import api
from web.jl_flask import jl_app


if __name__ == "__main__":
    jl_app.run(debug=True)
