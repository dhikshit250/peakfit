from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import get_db_connection

diet_bp = Blueprint('diet_bp', __name__)

@diet_bp.route('/diet-plan', methods=['POST'])
@jwt_required()
def create_diet_plan():
    """Create a new diet plan for the authenticated user."""
    user_id = get_jwt_identity()
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Check if a diet plan already exists for the user
        cur.execute("SELECT id FROM peakfit_diet_plans WHERE user_id = %s", (user_id,))
        if cur.fetchone():
            return jsonify({'error': 'Diet plan already exists. Use PUT to update it.'}), 409

        # Insert the new diet plan
        cur.execute("""
            INSERT INTO peakfit_diet_plans (
                user_id, diet_type, carb_preference, allergies,
                meal_frequency, cheat_meals
            ) VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id, data.get('diet_type'), data.get('carb_preference'),
            data.get('allergies'), data.get('meal_frequency'),
            data.get('cheat_meals')
        ))
        diet_plan_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({'message': 'Diet plan created successfully', 'diet_plan_id': diet_plan_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()