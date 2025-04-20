from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import google.generativeai as genai
import os, json
import psycopg2
from services.cloudinary_assets import workout_images, meal_images
from utils.db import get_db_connection

generate_plan_bp = Blueprint("generate_plan", __name__)

# 🔑 Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@generate_plan_bp.route("/plan", methods=["GET"])
@jwt_required()
def generate_plan():
    user_id = get_jwt_identity()

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # 🏋️ Fetch workout preferences
        cur.execute("""
            SELECT workout_days, muscle_groups, intensity, duration, equipment
            FROM peakfit_workout_plans WHERE user_id = %s
        """, (user_id,))
        workout_row = cur.fetchone()

        # 🥗 Fetch diet preferences
        cur.execute("""
            SELECT diet_type, carb_preference, allergies, meal_frequency
            FROM peakfit_diet_plans WHERE user_id = %s
        """, (user_id,))
        diet_row = cur.fetchone()

        cur.close()
        conn.close()

        if not workout_row or not diet_row:
            return jsonify({"error": "Workout or diet preferences not found."}), 404

        workout_days, muscle_groups, intensity, duration, equipment = workout_row
        diet_type, carb_pref, allergies, meal_frequency = diet_row

        # 🧠 Construct Gemini prompt
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
        - Carbohydrates preference: {carb_pref}
        - Allergies: {allergies}
        - Meal frequency: {meal_frequency}

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
        Just return the JSON. No explanation.
        """

        # ✅ Use the free-tier model
        model = genai.GenerativeModel("models/text-bison-001")  # Ensure this model is correct based on available models
        response = model.generate_content(prompt)

        # 🧹 Clean and parse
        content = response.text.strip("```json").strip("```").strip()
        plan_data = json.loads(content)

        # 🖼️ Inject images for workouts and meals
        for workout in plan_data["day_1"].get("workouts", []):
            workout["image"] = workout_images.get(workout["name"], "")

        for meal in plan_data["day_1"].get("meals", []):
            meal["image"] = meal_images.get(meal["name"], "")

        return jsonify(plan_data), 200

    except Exception as e:
        print("Error generating plan:", e)
        return jsonify({"error": f"Failed to generate personalized plan: {str(e)}"}), 500
