from flask import Blueprint, request, jsonify
import psycopg2
from utils.db import get_db_connection

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/delete_account", methods=["DELETE"])
def delete_account():
    try:
        user_id = request.json.get("user_id")  # Get user ID from request body

        conn = get_db_connection()
        cur = conn.cursor()

        # Delete user (CASCADE will remove associated rows)
        cur.execute("DELETE FROM users_project2 WHERE id = %s", (user_id,))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
