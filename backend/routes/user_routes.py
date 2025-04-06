from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import get_db_connection

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/delete_account", methods=["DELETE"])
@jwt_required()
def delete_account():
    """Delete the authenticated user's account and related data."""
    user_id = get_jwt_identity()  # Get user ID from JWT token

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Delete user account (CASCADE should handle related tables)
        cur.execute("DELETE FROM peakfit_users WHERE id = %s", (user_id,))
        conn.commit()

        return jsonify({"message": "Account deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        conn.close()
