import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB Atlas Connection URI
MONGO_URI = os.getenv(
    "MONGODB_URI",
    "mongodb+srv://hariharan12052007_db_user:qUmHDBypHnpIle0B@hariharan07.kdcrdrg.mongodb.net/hopedental_db?retryWrites=true&w=majority"
)

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

# Select Database
db = client["hopedental_db"]

# Define Collections
appointments_collection = db["appointments"]
chat_logs_collection = db["chat_logs"]