from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import get_db_connection

workout_routes = Blueprint("workout_routes", __name__)

@workout_routes.route("/workout_plans", methods=["POST"])
@jwt_required()
def create_workout_plan():
    """Create a new workout plan for the authenticated user."""
    user_id = get_jwt_identity()
    data = request.get_json()

    # Basic validation
    if not data.get("days"):
        return jsonify({"error": "Workout days are required"}), 400
    if not data.get("intensity") in ["Low", "Moderate", "High"]:
        return jsonify({"error": "Intensity must be one of: Low, Moderate, High"}), 400
    if not isinstance(data.get("duration"), int) or data.get("duration") <= 0:
        return jsonify({"error": "Duration must be a positive integer"}), 400
    if not isinstance(data.get("calorieGoal"), int) or data.get("calorieGoal") <= 0:
        return jsonify({"error": "Calorie goal must be a positive integer"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO peakfit_workout_plans (
                user_id, workout_days, rest_days, intensity, duration, 
                workout_type, muscle_group_focus, exercises, calorie_burn_goal,
                equipment, reminders, trainer_access, progressive_overload, warm_up_cool_down
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id,
            data.get("days"),
            data.get("restDays"),
            data.get("intensity"),
            data.get("duration"),
            data.get("type"),
            data.get("muscleGroup"),
            data.get("exercises"),
            data.get("calorieGoal"),
            data.get("equipment"),
            data.get("reminders", False),
            data.get("trainerAccess", False),
            data.get("progressiveOverload", False),
            data.get("warmUpCoolDown", False)
        ))

        workout_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"message": "Workout plan created", "id": workout_id}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        conn.close()
