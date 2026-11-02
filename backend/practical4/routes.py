from pathlib import Path
from flask import Blueprint, jsonify, request, render_template_string, send_from_directory
from backend.config import Config
from backend.practical4.logic import (
    check_db_health,
    register_user,
    authenticate_user,
    list_users
)

pr4_bp = Blueprint('practical4', __name__)


# -----------------------------------------------------------------------------
# Static and Template Serving for Practical 4
# -----------------------------------------------------------------------------

@pr4_bp.route('/practicals/pr4/static/<path:filename>', methods=['GET'])
@pr4_bp.route('/pr4/static/<path:filename>', methods=['GET'])
def serve_pr4_static(filename):
    """Serve CSS and JS assets for Practical 04"""
    static_dir = Path(Config.PR4_DIR) / 'static'
    return send_from_directory(static_dir, filename)


@pr4_bp.route('/practicals/pr4/', strict_slashes=False, methods=['GET'])
@pr4_bp.route('/practicals/pr4/index.html', methods=['GET'])
@pr4_bp.route('/pr4', strict_slashes=False, methods=['GET'])
@pr4_bp.route('/pr4/index.html', methods=['GET'])
def serve_pr4_index():
    """Render Practical 04: serves React app if requested via /pr4 and dist is present, else legacy template"""
    if request.path.rstrip('/') == '/pr4' and Config.USE_REACT_FRONTEND:
        react_dir = Path(Config.REACT_DIST_DIR)
        if (react_dir / 'index.html').exists():
            return send_from_directory(react_dir, 'index.html')

    template_file = Path(Config.PR4_DIR) / 'templates' / 'index.html'
    if not template_file.exists():
        template_file = Path(Config.PR4_DIR) / 'index.html'

    with open(template_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize url_for to direct static paths for seamless rendering
    content = content.replace("{{ url_for('static', filename='style.css') }}", "/practicals/pr4/static/style.css")
    content = content.replace("{{ url_for('static', filename='script.js') }}", "/practicals/pr4/static/script.js")
    return content, 200, {'Content-Type': 'text/html; charset=utf-8'}


@pr4_bp.route('/practicals/pr4/profile', methods=['GET'])
@pr4_bp.route('/practicals/pr4/profile.html', methods=['GET'])
@pr4_bp.route('/pr4/profile', methods=['GET'])
@pr4_bp.route('/profile', methods=['GET'])
def serve_pr4_profile():
    """Render Student Profile Dashboard for Practical 04"""
    template_file = Path(Config.PR4_DIR) / 'templates' / 'profile.html'
    with open(template_file, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("{{ url_for('static', filename='profile.css') }}", "/practicals/pr4/static/profile.css")
    content = content.replace("{{ url_for('static', filename='profile.js') }}", "/practicals/pr4/static/profile.js")
    return content, 200, {'Content-Type': 'text/html; charset=utf-8'}


# -----------------------------------------------------------------------------
# REST API Endpoints (Preserving both standard /api/* and namespaced /api/pr4/*)
# -----------------------------------------------------------------------------

@pr4_bp.route('/api/test-db', methods=['GET'])
@pr4_bp.route('/api/pr4/test-db', methods=['GET'])
def api_test_db():
    """Check database connectivity (Supabase PostgreSQL with automatic SQLite fallback)"""
    health = check_db_health()
    if health.get("ok"):
        return jsonify({
            "success": True,
            "message": health.get("message", "Database connection successful"),
            "type": health.get("type"),
            "database": health.get("database"),
            "supabase_error": health.get("supabase_error")
        }), 200
    return jsonify({
        "success": False,
        "message": health.get("message", "Database connection failed"),
        "supabase_error": health.get("supabase_error")
    }), 500


@pr4_bp.route('/api/register', methods=['POST'])
@pr4_bp.route('/api/pr4/register', methods=['POST'])
def api_register():
    """Register a new student user"""
    data = request.get_json() or {}
    resp, code = register_user(data)
    return jsonify(resp), code


@pr4_bp.route('/api/login', methods=['POST'])
@pr4_bp.route('/api/pr4/login', methods=['POST'])
def api_login():
    """Authenticate student user credentials"""
    data = request.get_json() or {}
    resp, code = authenticate_user(data)
    return jsonify(resp), code


@pr4_bp.route('/api/users', methods=['GET'])
@pr4_bp.route('/api/pr4/users', methods=['GET'])
def api_users():
    """List registered users"""
    try:
        users = list_users()
        return jsonify({"success": True, "count": len(users), "users": users}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Could not fetch users: {str(e)}"}), 500
