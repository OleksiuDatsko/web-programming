from settings import REDIS as redis


class HttpError(Exception):
    def __init__(self, status: int, *args) -> None:
        self.status = status
        super().__init__(*args)


class Hotel:
    id: str
    name: str
    total_rooms: int
    total_visitors: int

    hotel_atributes = ("id", "name", "total_rooms", "total_visitors")

    prefix: str = "hotels"

    @classmethod
    def __get_hotel_id(cls, id: str):
        return f"{cls.prefix}:{id}"

    @classmethod
    def __is_in_db(cls, id: str):
        return cls.__get_hotel_id(id) in redis.keys(f"{cls.prefix}:*")

    @classmethod
    def __is_valid_hotel(cls, hotel, exeption: str = None):
        for atribute in cls.hotel_atributes:
            if atribute not in hotel and atribute != exeption:
                return False
        return True

    @classmethod
    def get(cls, id: str):
        if not cls.__is_in_db(id):
            raise HttpError(404)
        return redis.hgetall(cls.__get_hotel_id(id))

    @classmethod
    def get_all(cls):
        ids = [key.split(":")[1] for key in redis.keys(f"{cls.prefix}:*")]
        all_hotels = []
        for id in ids:
            all_hotels.append(cls.get(id))
        return all_hotels

    @classmethod
    def create(cls, hotel):
        if not cls.__is_valid_hotel(hotel) or cls.__is_in_db(hotel["id"]):
            raise HttpError(400)
        redis.hset(cls.__get_hotel_id(hotel["id"]), mapping=hotel)
        if not cls.__is_in_db(hotel["id"]):
            raise HttpError(400)
        return hotel

    @classmethod
    def update(cls, hotel_id: str, hotel: dict):
        if not cls.__is_in_db(hotel_id):
            raise HttpError(404)
        if not cls.__is_valid_hotel(hotel, exeption="id"):
            raise HttpError(400)
        if "id" not in hotel:
            hotel["id"] = hotel_id
        redis.hset(cls.__get_hotel_id(hotel_id), mapping=hotel)
        print(hotel, flush=True)
        return hotel

    @classmethod
    def delete(cls, id: str):
        if not cls.__is_in_db(id):
            raise HttpError(400)
        redis.delete(cls.__get_hotel_id(id))
        return cls.get_all()
