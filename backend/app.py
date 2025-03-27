# app.py
from flask import Flask
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)

# Import and register blueprints
from routes.auth import auth_bp
from routes.recommendations import rec_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(rec_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
