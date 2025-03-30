import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Load Secret Key for JWT Authentication
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallback_secret_key')  # Ensure a strong key!

    # JWT Configuration
    JWT_SECRET_KEY = SECRET_KEY  # Explicitly set JWT secret key

    # PostgreSQL (Aiven) Connection
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = os.getenv('DB_PORT')

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME = os.getenv('CLOUDINARY_CLOUD_NAME')
    CLOUDINARY_API_KEY = os.getenv('CLOUDINARY_API_KEY')
    CLOUDINARY_API_SECRET = os.getenv('CLOUDINARY_API_SECRET')
