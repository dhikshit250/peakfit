from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import openai, os, json
import psycopg2
from services.cloudinary_assets import workout_images, meal_images
from utils.db import get_db_connection  # make sure you have a db connection utility

generate_plan_bp = Blueprint("generate_plan", __name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@generate_plan_bp.route("/api/generate/plan", methods=["GET"])
@jwt_required()
def generate_plan():
    user_id = get_jwt_identity()

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # 🏋️ Fetch workout preferences
        cur.execute("SELECT workout_days, muscle_groups, intensity, duration, equipment FROM peakfit_workout_plans WHERE user_id = %s", (user_id,))
        workout_row = cur.fetchone()

        # 🥗 Fetch diet preferences
        cur.execute("SELECT diet_type, caloric_intake, protein_preference, allergy_restrictions FROM peakfit_diet_plans WHERE user_id = %s", (user_id,))
        diet_row = cur.fetchone()

        cur.close()
        conn.close()

        if not workout_row or not diet_row:
            return jsonify({"error": "Workout or diet preferences not found."}), 404

        workout_days, muscle_groups, intensity, duration, equipment = workout_row
        diet_type, caloric_intake, protein_pref, allergies = diet_row

        # 🧠 Construct NLP prompt
        prompt = f"""
        Create a personalized fitness plan for Day 1.

        Workout preferences:
        - Days: {workout_days}
        - Muscle focus: {muscle_groups}
        - Intensity: {intensity}
        - Duration: {duration} mins
        - Equipment available: {equipment}

        Diet preferences:
        - Diet type: {diet_type}
        - Calories: {caloric_intake}
        - Protein source: {protein_pref}
        - Allergies: {allergies}

        Output JSON format:

        {{
          "day_1": {{
            "workouts": [
              {{ "name": "Push-ups", "sets": 3, "reps": 15, "rest": "30 sec" }}
            ],
            "meals": [
              {{ "name": "Oatmeal with Fruits", "calories": 350, "protein": 10, "carbs": 50 }}
            ]
          }}
        }}
        Do not include image fields. Just use JSON.
        """

        # 🔮 Call OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )

        plan_data = json.loads(response["choices"][0]["message"]["content"])

        # 🖼️ Inject Cloudinary images
        for workout in plan_data["day_1"].get("workouts", []):
            workout["image"] = workout_images.get(workout["name"], "")

        for meal in plan_data["day_1"].get("meals", []):
            meal["image"] = meal_images.get(meal["name"], "")

        return jsonify(plan_data), 200

    except Exception as e:
        print("Error generating plan:", e)
        return jsonify({"error": "Failed to generate personalized plan."}), 500
