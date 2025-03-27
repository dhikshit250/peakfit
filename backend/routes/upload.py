from flask import Blueprint, request, jsonify
from services.cloudinary_service import upload_image

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image_file = request.files['image']
    upload_result = upload_image(image_file)

    return jsonify(upload_result)
