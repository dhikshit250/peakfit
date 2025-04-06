from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from utils.db import get_db_connection

profile_bp = Blueprint('profile_bp', __name__)

@profile_bp.route('/save-profile', methods=['POST'])
def save_profile():
    print("🛡️ Pre-auth debug — route hit before JWT check")

    try:
        verify_jwt_in_request()
    except Exception as e:
        print("❌ JWT Verification Failed:", e)
        return jsonify({"error": "Unauthorized"}), 401

    print("🚀 Hit the /save-profile route!")
    print("📦 Content-Type:", request.content_type)

    user_id = get_jwt_identity()

    # If using FormData
    data = request.form
    print("🔍 Incoming Form Data:", dict(data))

    try:
        full_name = data.get("name", "").strip()
        height = float(data.get("height", 0))
        weight = float(data.get("weight", 0))
        age = int(data.get("age", 0))
        goal = data.get("goal", "").strip()
        gender = data.get("gender", "").strip()
        profile_picture = data.get("profile_pic", "").strip()
    except Exception as e:
        print("❌ Error parsing form data:", e)
        return jsonify({"error": "Invalid input for height, weight, or age"}), 422

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT user_id FROM peakfit_profiles WHERE user_id = %s", (user_id,))
        existing_profile = cur.fetchone()

        if existing_profile:
            cur.execute("""
                UPDATE peakfit_profiles 
                SET full_name = %s, height = %s, weight = %s, age = %s, goal = %s, gender = %s, profile_picture = %s
                WHERE user_id = %s
            """, (full_name, height, weight, age, goal, gender, profile_picture, user_id))
        else:
            cur.execute("""
                INSERT INTO peakfit_profiles 
                (user_id, full_name, height, weight, age, goal, gender, profile_picture) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (user_id, full_name, height, weight, age, goal, gender, profile_picture))

        conn.commit()
        print("✅ Profile saved/updated successfully.")
        return jsonify({"message": "Profile saved successfully!"}), 200

    except Exception as e:
        conn.rollback()
        print("❌ Database error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        conn.close()


@profile_bp.route('/get-profile', methods=['GET'])
def get_profile():
    print("🛡️ Pre-auth debug — route hit before JWT check (get-profile)")

    try:
        verify_jwt_in_request()
    except Exception as e:
        print("❌ JWT Verification Failed:", e)
        return jsonify({"error": "Unauthorized"}), 401

    user_id = get_jwt_identity()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            SELECT full_name AS name, height, weight, age, goal, gender, profile_picture AS profile_pic 
            FROM peakfit_profiles WHERE user_id = %s
        """, (user_id,))
        profile = cur.fetchone()

        if not profile:
            return jsonify({"error": "Profile not found"}), 404

        columns = [desc[0] for desc in cur.description]
        result = dict(zip(columns, profile))
        return jsonify(result), 200

    except Exception as e:
        print("❌ Error fetching profile:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        conn.close()
