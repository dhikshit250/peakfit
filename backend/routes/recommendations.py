# routes/recommendations.py
from flask import Blueprint, request, jsonify
from utils import token_required

rec_bp = Blueprint('rec_bp', __name__)

@rec_bp.route('/workout', methods=['POST'])
@token_required
def get_workout_plan(current_user):
    data = request.get_json()
    # Extract user inputs (like workout goals, history, etc.) from `data`
    # Call your AI model/function here to generate a personalized workout plan.
    workout_plan = "Sample workout plan based on your input."  # Replace with real logic
    return jsonify({
        'user': current_user,
        'workout_plan': workout_plan
    })

@rec_bp.route('/diet', methods=['POST'])
@token_required
def get_diet_plan(current_user):
    data = request.get_json()
    # Extract dietary preferences and restrictions from `data`
    # Call your AI model/function here to generate a personalized diet plan.
    diet_plan = "Sample diet plan based on your input."  # Replace with real logic
    return jsonify({
        'user': current_user,
        'diet_plan': diet_plan
    })
