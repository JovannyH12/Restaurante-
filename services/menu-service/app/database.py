from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://mongoadmin:mongopass@localhost:27017/reservaciones?authSource=admin")
MONGODB_DB = os.getenv("MONGODB_DB", "reservaciones")

client = AsyncIOMotorClient(MONGODB_URI)
db = client[MONGODB_DB]

menu_collection = db["menu_items"]
mesas_collection = db["mesas"]
