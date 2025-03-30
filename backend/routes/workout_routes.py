from flask import Blueprint, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor

workout_routes = Blueprint("workout_routes", __name__)  # ✅ Create a Blueprint

def get_db_connection():
    return psycopg2.connect(
        dbname="your_db_name",
        user="your_user",
        password="your_password",
        host="your_host",
        port="your_port"
    )

@workout_routes.route("/workout_plans", methods=["POST"])
def create_workout_plan():
    try:
        data = request.json
        user_id = data.get("user_id")

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO workout_plans (user_id, intensity, duration, type, muscle_group, calorie_goal, reminders, trainer_access, progressive_overload, warm_up_cool_down)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id, data["intensity"], data["duration"], data["type"], data["muscleGroup"], 
            data["calorieGoal"], data["reminders"], data["trainerAccess"], 
            data["progressiveOverload"], data["warmUpCoolDown"]
        ))

        workout_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Workout plan created", "id": workout_id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
