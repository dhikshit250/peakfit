from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth import auth_bp
from routes.upload import upload_bp
from routes.profile import profile_bp
from routes.user_routes import user_routes
from routes.workout_routes import workout_routes
from routes.diet_routes import diet_bp
from dotenv import load_dotenv
from routes.generate_plan import generate_plan_bp

load_dotenv()
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize JWT
app.config["JWT_SECRET_KEY"] = Config.SECRET_KEY  # Load secret key for JWT
jwt = JWTManager(app)  # Initialize JWT Manager

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(upload_bp, url_prefix='/api/upload')
app.register_blueprint(profile_bp, url_prefix='/api/profile')
app.register_blueprint(user_routes, url_prefix='/api/user')
app.register_blueprint(workout_routes, url_prefix='/api/workout')
app.register_blueprint(diet_bp, url_prefix='/api/diet')
app.register_blueprint(generate_plan_bp,url_prefix='/api/generate')
if __name__ == '__main__':
    app.run(debug=True)
