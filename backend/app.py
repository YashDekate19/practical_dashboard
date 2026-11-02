import os
import sys
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS

# Add root directory to python path
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.config import Config
from backend.dashboard.routes import dashboard_bp
from backend.practical1.routes import pr1_bp
from backend.practical2.routes import pr2_bp
from backend.practical3.routes import pr3_bp
from backend.practical4.routes import pr4_bp
from backend.practical5.routes import pr5_bp
from backend.practical6.routes import pr6_bp


def create_app(config_class=Config):
    """Application factory for Web Development Practicals Dashboard"""
    app = Flask(
        __name__,
        static_folder=None  # Static serving is managed explicitly by blueprints
    )
    app.config.from_object(config_class)

    # Enable Cross-Origin Resource Sharing (CORS)
    CORS(app, resources={r"/*": {"origins": config_class.CORS_ORIGINS}})

    # Register all modular practical blueprints
    app.register_blueprint(pr1_bp)
    app.register_blueprint(pr2_bp)
    app.register_blueprint(pr3_bp)
    app.register_blueprint(pr4_bp)
    app.register_blueprint(pr5_bp)
    app.register_blueprint(pr6_bp)

    # Dashboard blueprint registered last to handle root / and fallback public files
    app.register_blueprint(dashboard_bp)

    # Health check endpoint for cloud monitoring (Render, AWS, Railway)
    @app.route('/health', methods=['GET'])
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "framework": "Python Flask",
            "dashboard": "Ready",
            "environment": "production" if not app.debug else "development"
        }), 200

    # Global Error Handlers
    @app.errorhandler(404)
    def not_found_error(error):
        if request.path.startswith('/api/'):
            return jsonify({"success": False, "error": "Endpoint not found"}), 404
        # For browser navigation, fallback to dashboard index.html
        from backend.dashboard.routes import serve_dashboard
        return serve_dashboard('index.html')

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "success": False,
            "error": "Internal Server Error",
            "details": str(error)
        }), 500

    return app


# Application instance for Gunicorn / WSGI
app = create_app()


if __name__ == '__main__':
    port = Config.PORT
    host = Config.HOST
    print("=" * 60)
    print(" 🚀 Python Flask Web Development Practicals Dashboard")
    print(f" URL: http://localhost:{port}")
    print(" Active: Pr1, Pr2, Pr3, Pr4 (Auth & DB), Pr5, Pr6 (React)")
    print("=" * 60)
    app.run(host=host, port=port, debug=Config.DEBUG)
