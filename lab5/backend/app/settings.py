import redis
import dotenv
import os

dotenv.load_dotenv()

DEBUG = True

REDIS = redis.Redis(
    host="redis",
    port="6379",
    password=os.getenv("REDIS_PASSWORD"),
    decode_responses=True,
)