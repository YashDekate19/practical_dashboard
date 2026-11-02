from pathlib import Path
from flask import Blueprint, jsonify, request, send_from_directory, redirect
from backend.config import Config
from backend.practical3.logic import (
    get_profile,
    get_skills,
    get_projects,
    get_education,
    handle_contact_inquiry
)

pr3_bp = Blueprint('practical3', __name__)


# -----------------------------------------------------------------------------
# Static Frontend Serving for Practical 3
# -----------------------------------------------------------------------------

@pr3_bp.route('/practicals/pr3', methods=['GET'])
def redirect_pr3():
    return redirect('/practicals/pr3/', code=301)


@pr3_bp.route('/practicals/pr3/', methods=['GET'])
@pr3_bp.route('/practicals/pr3/<path:filename>', methods=['GET'])
def serve_pr3_static(filename='index.html'):
    """Serve static files for Practical 03 (Yash Dekate Portfolio)"""
    pr3_dir = Path(Config.PR3_DIR)
    target = pr3_dir / filename

    if not target.exists() or target.is_dir():
        filename = 'index.html'

    return send_from_directory(pr3_dir, filename)


# -----------------------------------------------------------------------------
# Practical 3 REST API Endpoints
# -----------------------------------------------------------------------------

@pr3_bp.route('/api/pr3/profile', methods=['GET'])
def api_pr3_profile():
    """Get developer profile biography and social links"""
    return jsonify({"success": True, "profile": get_profile()})


@pr3_bp.route('/api/pr3/skills', methods=['GET'])
def api_pr3_skills():
    """Get technical competencies categorized with proficiency levels"""
    return jsonify({"success": True, "skills": get_skills()})


@pr3_bp.route('/api/pr3/projects', methods=['GET'])
def api_pr3_projects():
    """Get portfolio engineering projects list"""
    return jsonify({"success": True, "projects": get_projects()})


@pr3_bp.route('/api/pr3/education', methods=['GET'])
def api_pr3_education():
    """Get academic milestones and degree timeline"""
    return jsonify({"success": True, "education": get_education()})


@pr3_bp.route('/api/pr3/contact', methods=['POST'])
def api_pr3_contact():
    """Submit a contact message to the developer"""
    data = request.get_json() or {}
    result = handle_contact_inquiry(data)
    status_code = 200 if result.get('success') else 400
    return jsonify(result), status_code
