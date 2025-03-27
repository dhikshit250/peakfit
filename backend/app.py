from flask import Flask
from config import Config
from flask_cors import CORS
from routes.auth import auth_bp
from routes.upload import upload_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(upload_bp, url_prefix='/api/upload')

if __name__ == '__main__':
    app.run(debug=True)
