from functools import wraps
import settings
from models import Hotel, HttpError
import logging
import json

logging.basicConfig(level=logging.DEBUG)


from flask import Flask, request, Response
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


def respond_status(fn):
    @wraps(fn)
    def inner(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except HttpError as ex:
            return Response(status=ex.status)

    return inner


@app.route("/hotels/", methods=["GET", "POST"])
@cross_origin()
@respond_status
def get_all_create_new():
    if request.method == "GET":
        return Hotel.get_all()
    if request.method == "POST":
        hotel = request.json
        return Hotel.create(hotel)


@app.route("/hotels/<hotel_id>/", methods=["GET", "DELETE", "PUT"])
@cross_origin()
@respond_status
def get_put_delete(hotel_id):
    print(hotel_id, flush=True)
    if request.method == "GET":
        return Hotel.get(str(hotel_id))
    if request.method == "DELETE":
        return Hotel.delete(str(hotel_id))
    if request.method == "PUT":
        hotel = request.json
        return Hotel.update(hotel_id, hotel)


if __name__ == "__main__":
    app.run(debug=settings.DEBUG)
