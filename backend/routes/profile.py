from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import get_db_connection

profile_bp = Blueprint('profile_bp', __name__)

@profile_bp.route('/get-profile', methods=['GET'])
@jwt_required()  # Require authentication
def get_profile():
    """Fetch user profile including email from users_project2"""
    user_id = get_jwt_identity()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            SELECT u.email, p.name, p.height, p.weight, p.age, p.goal, p.gender, p.profile_pic
            FROM users_project2 u
            LEFT JOIN user_profiles p ON u.id = p.user_id
            WHERE u.id = %s
        """, (user_id,))

        user_data = cur.fetchone()

        if user_data:
            profile = {
                "email": user_data[0],  # Get email from users_project2
                "name": user_data[1],
                "height": user_data[2],
                "weight": user_data[3],
                "age": user_data[4],
                "goal": user_data[5],
                "gender": user_data[6],
                "profile_pic": user_data[7],
            }
            return jsonify(profile), 200
        else:
            return jsonify({"error": "Profile not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()