from pathlib import Path
from flask import Blueprint, jsonify, request, send_from_directory, redirect
from backend.config import Config
from backend.practical6.logic import (
    get_students,
    get_student_by_id,
    get_academic_stats,
    add_student,
    send_advisor_message
)

pr6_bp = Blueprint('practical6', __name__)


# -----------------------------------------------------------------------------
# Static React SPA Serving for Practical 6 (Vite Production Build)
# -----------------------------------------------------------------------------

@pr6_bp.route('/practicals/pr6', methods=['GET'])
def redirect_pr6():
    return redirect('/practicals/pr6/', code=301)


@pr6_bp.route('/practicals/pr6-preview', methods=['GET'])
def redirect_pr6_preview():
    return redirect('/practicals/pr6-preview/', code=301)


@pr6_bp.route('/practicals/pr6/', methods=['GET'])
@pr6_bp.route('/practicals/pr6/<path:filename>', methods=['GET'])
@pr6_bp.route('/practicals/pr6-preview/', methods=['GET'])
@pr6_bp.route('/practicals/pr6-preview/<path:filename>', methods=['GET'])
def serve_pr6_static(filename='index.html'):
    """Serve production React 19 bundle assets for Practical 06"""
    dist_dir = Path(Config.PR6_DIST_DIR)
    target = dist_dir / filename

    if not target.exists() or target.is_dir():
        filename = 'index.html'

    return send_from_directory(dist_dir, filename)


# -----------------------------------------------------------------------------
# Practical 6 REST API Endpoints
# -----------------------------------------------------------------------------

@pr6_bp.route('/api/pr6/students', methods=['GET'])
def api_pr6_students():
    """Retrieve students directory with optional search query, department, or GPA filter"""
    query = request.args.get('q')
    department = request.args.get('department')
    min_gpa = request.args.get('min_gpa')
    status = request.args.get('status')

    students = get_students(query, department, min_gpa, status)
    return jsonify({
        "success": True,
        "count": len(students),
        "students": students
    })


@pr6_bp.route('/api/pr6/students/<student_id>', methods=['GET'])
def api_pr6_student_detail(student_id):
    """Retrieve full record for a specific student"""
    student = get_student_by_id(student_id)
    if not student:
        return jsonify({"success": False, "message": "Student not found"}), 404
    return jsonify({"success": True, "student": student})


@pr6_bp.route('/api/pr6/stats', methods=['GET'])
def api_pr6_stats():
    """Get academic analytics: enrollment counts, average GPA, honors students"""
    return jsonify({"success": True, "stats": get_academic_stats()})


@pr6_bp.route('/api/pr6/students', methods=['POST'])
def api_pr6_enroll_student():
    """Enroll a new student into the portal database"""
    data = request.get_json() or {}
    result = add_student(data)
    status_code = 201 if result.get('success') else 400
    return jsonify(result), status_code


@pr6_bp.route('/api/pr6/contact-advisor', methods=['POST'])
def api_pr6_advisor_contact():
    """Send an inquiry message to an academic advisor"""
    data = request.get_json() or {}
    result = send_advisor_message(data)
    status_code = 200 if result.get('success') else 400
    return jsonify(result), status_code
