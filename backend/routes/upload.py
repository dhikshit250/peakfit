from flask import Blueprint, request, jsonify
from services.cloudinary_service import upload_image

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload():
    """Handles image uploads to Cloudinary."""
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({'error': 'Empty file uploaded'}), 400

    try:
        upload_result = upload_image(image_file)
        if not upload_result:
            return jsonify({'error': 'Image upload failed'}), 500
        
        return jsonify(upload_result), 200

    except Exception as e:
        return jsonify({'error': f'Upload error: {str(e)}'}), 500
