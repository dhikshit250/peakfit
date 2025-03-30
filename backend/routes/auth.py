from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from utils.db import get_db_connection
from datetime import timedelta

# Initialize Blueprint
auth_bp = Blueprint('auth_bp', __name__)

# Initialize JWT (to be set in app.py)
jwt = JWTManager()

def init_jwt(app):
    jwt.init_app(app)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Handles user registration."""
    data = request.get_json()
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
        if cur.fetchone():
            return jsonify({'error': 'Username or Email already exists'}), 400

        # Insert new user
        cur.execute("""
            INSERT INTO users_project2 (username, email, password_hash)
            VALUES (%s, %s, %s) RETURNING id
        """, (username, email, password_hash))
        user_id = cur.fetchone()[0]
        conn.commit()

        return jsonify({'message': 'User registered successfully', 'user_id': user_id}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@auth_bp.route('/login', methods=['POST'])
def login():
    """Handles user login."""
    data = request.get_json()
    identifier = data.get('identifier')  # Username or Email
    password = data.get('password')

    if not identifier or not password:
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Fetch user by username or email
        cur.execute("SELECT id, password_hash FROM users_project2 WHERE username = %s OR email = %s", (identifier, identifier))
        user = cur.fetchone()

        if not user or not check_password_hash(user[1], password):
            return jsonify({'error': 'Invalid credentials'}), 401

        # Generate JWT tokens
        access_token = create_access_token(identity=user[0], expires_delta=timedelta(hours=1))
        refresh_token = create_refresh_token(identity=user[0])
        
        return jsonify({'message': 'Login successful', 'access_token': access_token, 'refresh_token': refresh_token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refreshes an access token."""
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id, expires_delta=timedelta(hours=1))
    return jsonify({'access_token': new_access_token}), 200

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """Example of a protected route."""
    user_id = get_jwt_identity()
    return jsonify({'message': 'Protected content', 'user_id': user_id}), 200
