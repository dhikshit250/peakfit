from flask import Blueprint, request, jsonify, current_app
import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from utils.db import get_db_connection

auth_bp = Blueprint('auth_bp', __name__)

def generate_token(user_id):
    """Generate JWT token for authentication."""
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

@auth_bp.route('/register', methods=['POST'])
def register():
    """Handles user registration."""
    data = request.get_json()
    print("Received Registration Data:", data)  # Debugging

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    password_hash = generate_password_hash(password)

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Check if username or email already exists
        cur.execute("SELECT id FROM users_project2 WHERE username = %s OR email = %s", (username, email))
        existing_user = cur.fetchone()
        if existing_user:
            return jsonify({'error': 'Username or Email already exists'}), 400

        # Insert new user
        cur.execute(
            "INSERT INTO users_project2 (username, email, password_hash) VALUES (%s, %s, %s) RETURNING id",
            (username, email, password_hash)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        
        print(f"User registered successfully with ID: {user_id}")  # Debugging
        return jsonify({'message': 'User registered successfully', 'user_id': user_id}), 201
    except Exception as e:
        conn.rollback()
        print("Database Error:", str(e))  # Debugging
        return jsonify({'error': 'Database error occurred'}), 500
    finally:
        cur.close()
        conn.close()

@auth_bp.route('/login', methods=['POST'])
def login():
    """Handles user login."""
    data = request.get_json()
    print("Received Login Data:", data)  # Debugging

    identifier = data.get('identifier')  # Username or Email
    password = data.get('password')

    if not identifier or not password:
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Try fetching user by username or email
        cur.execute("SELECT id, password_hash FROM users_project2 WHERE username = %s OR email = %s", (identifier, identifier))
        user = cur.fetchone()

        if not user or not check_password_hash(user[1], password):
            return jsonify({'error': 'Invalid credentials'}), 401

        token = generate_token(user[0])
        return jsonify({'message': 'Login successful', 'token': token}), 200
    except Exception as e:
        print("Database Error:", str(e))  # Debugging
        return jsonify({'error': 'Database error occurred'}), 500
    finally:
        cur.close()
        conn.close()
