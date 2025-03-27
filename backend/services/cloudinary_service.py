import cloudinary
import cloudinary.uploader
import os

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

def upload_image(image_file):
    try:
        result = cloudinary.uploader.upload(image_file)
        return {"url": result["secure_url"]}
    except Exception as e:
        return {"error": str(e)}
