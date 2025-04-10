from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import get_db_connection
import json

workout_routes = Blueprint("workout_routes", __name__)

@workout_routes.route("/workout_plans", methods=["POST"])
@jwt_required()
def create_workout_plan():
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data.get("days"):
        return jsonify({"error": "Workout days are required"}), 400

    if data.get("intensity") not in ["Light", "Moderate", "Intense"]:
        return jsonify({"error": "Intensity must be one of: Light, Moderate, Intense"}), 400

    try:
        duration = int(data.get("duration"))
        calorie_goal = int(data.get("calorieGoal"))
        if duration <= 0 or calorie_goal <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({"error": "Duration and Calorie Goal must be positive numbers"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO peakfit_workout_plans (
                user_id, workout_days, rest_days, intensity, duration,
                workout_type, muscle_groups, exercises, calorie_burn_goal,
                equipment, reminders, trainer_access, progressive_overload, warmup_cooldown
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id,
            json.dumps(data.get("days")),
            json.dumps(data.get("restDays")),
            data.get("intensity"),
            duration,
            data.get("type"),
            json.dumps(data.get("muscleGroup")),
            json.dumps(data.get("exercises")),
            calorie_goal,
            json.dumps(data.get("equipment")),
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
        return jsonify({"error": f"Failed to create workout plan: {str(e)}"}), 500

    finally:
        cur.close()
        conn.close()

@workout_routes.route("/workout_plans", methods=["GET"])
@jwt_required()
def get_workout_plan():
    user_id = get_jwt_identity()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            SELECT workout_days, rest_days, intensity, duration, workout_type,
                   muscle_groups, exercises, calorie_burn_goal, equipment,
                   reminders, trainer_access, progressive_overload, warmup_cooldown
            FROM peakfit_workout_plans
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT 1
        """, (user_id,))
        result = cur.fetchone()

        if result is None:
            return jsonify({"message": "No workout plan found"}), 404

        keys = [
            "days", "restDays", "intensity", "duration", "type", "muscleGroup",
            "exercises", "calorieGoal", "equipment", "reminders",
            "trainerAccess", "progressiveOverload", "warmUpCoolDown"
        ]
        workout_plan = dict(zip(keys, result))

        for field in ["days", "restDays", "muscleGroup", "exercises", "equipment"]:
            if workout_plan[field]:
                workout_plan[field] = json.loads(workout_plan[field])

        return jsonify(workout_plan), 200

    except Exception as e:
        return jsonify({"error": f"Failed to fetch workout plan: {str(e)}"}), 500

    finally:
        cur.close()
        conn.close()
