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
        # Check if a diet plan already exists
        cur.execute("SELECT id FROM peakfit_diet_plans WHERE user_id = %s", (user_id,))
        if cur.fetchone():
            return jsonify({'error': 'Diet plan already exists. Use PUT to update it.'}), 409

        cur.execute("""
            INSERT INTO peakfit_diet_plans (
                user_id, diet_type, calorie_goal, macronutrient_distribution,
                micronutrients, protein_goal, carb_preference, fat_preference,
                allergies, meal_frequency, water_intake, fasting_mode, cheat_meals
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id, data.get('diet_type'), data.get('calorie_goal'),
            data.get('macronutrient_distribution'), data.get('micronutrients'),
            data.get('protein_goal'), data.get('carb_preference'),
            data.get('fat_preference'), data.get('allergies'),
            data.get('meal_frequency'), data.get('water_intake'),
            data.get('fasting_mode'), data.get('cheat_meals')
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

@diet_bp.route('/diet-plan', methods=['GET'])
@jwt_required()
def get_diet_plan():
    """Retrieve the diet plan of the authenticated user."""
    user_id = get_jwt_identity()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            SELECT diet_type, calorie_goal, macronutrient_distribution, micronutrients,
                   protein_goal, carb_preference, fat_preference, allergies,
                   meal_frequency, water_intake, fasting_mode, cheat_meals
            FROM peakfit_diet_plans WHERE user_id = %s
        """, (user_id,))
        diet_plan = cur.fetchone()

        if not diet_plan:
            return jsonify({'error': 'No diet plan found for this user'}), 404

        diet_plan_data = {
            'diet_type': diet_plan[0],
            'calorie_goal': diet_plan[1],
            'macronutrient_distribution': diet_plan[2],
            'micronutrients': diet_plan[3],
            'protein_goal': diet_plan[4],
            'carb_preference': diet_plan[5],
            'fat_preference': diet_plan[6],
            'allergies': diet_plan[7],
            'meal_frequency': diet_plan[8],
            'water_intake': diet_plan[9],
            'fasting_mode': diet_plan[10],
            'cheat_meals': diet_plan[11]
        }
        return jsonify(diet_plan_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@diet_bp.route('/diet-plan', methods=['PUT'])
@jwt_required()
def update_diet_plan():
    """Update the diet plan of the authenticated user."""
    user_id = get_jwt_identity()
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            UPDATE peakfit_diet_plans
            SET diet_type = %s, calorie_goal = %s, macronutrient_distribution = %s,
                micronutrients = %s, protein_goal = %s, carb_preference = %s,
                fat_preference = %s, allergies = %s, meal_frequency = %s,
                water_intake = %s, fasting_mode = %s, cheat_meals = %s
            WHERE user_id = %s
        """, (
            data.get('diet_type'), data.get('calorie_goal'), data.get('macronutrient_distribution'),
            data.get('micronutrients'), data.get('protein_goal'), data.get('carb_preference'),
            data.get('fat_preference'), data.get('allergies'), data.get('meal_frequency'),
            data.get('water_intake'), data.get('fasting_mode'), data.get('cheat_meals'),
            user_id
        ))
        if cur.rowcount == 0:
            return jsonify({'error': 'No existing diet plan to update'}), 404
        conn.commit()
        return jsonify({'message': 'Diet plan updated successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@diet_bp.route('/diet-plan', methods=['DELETE'])
@jwt_required()
def delete_diet_plan():
    """Delete the diet plan of the authenticated user."""
    user_id = get_jwt_identity()

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM peakfit_diet_plans WHERE user_id = %s", (user_id,))
        if cur.rowcount == 0:
            return jsonify({'error': 'No diet plan found to delete'}), 404
        conn.commit()
        return jsonify({'message': 'Diet plan deleted successfully'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()
