import os
from pathlib import Path
from flask import Blueprint, jsonify, send_from_directory, request, current_app
from backend.config import Config
from backend.dashboard.logic import get_practicals_list, get_system_statuses, SERVICE_STATES

dashboard_bp = Blueprint('dashboard', __name__)


@dashboard_bp.route('/', defaults={'filename': 'index.html'}, methods=['GET'])
@dashboard_bp.route('/<path:filename>', methods=['GET'])
def serve_dashboard(filename):
    """Serve Home Dashboard frontend assets: prefers modern React build in frontend/dist,
    falls back cleanly to legacy home-dashboard/public if dist not present."""
    react_dir = Path(Config.REACT_DIST_DIR)
    react_index = react_dir / 'index.html'

    if Config.USE_REACT_FRONTEND and react_index.exists():
        target_file = react_dir / filename
        if target_file.exists() and not target_file.is_dir():
            return send_from_directory(react_dir, filename)
        return send_from_directory(react_dir, 'index.html')

    public_dir = Path(Config.DASHBOARD_PUBLIC_DIR)
    target_file = public_dir / filename

    if not target_file.exists() or target_file.is_dir():
        filename = 'index.html'

    return send_from_directory(public_dir, filename)


@dashboard_bp.route('/api/practicals', methods=['GET'])
def api_practicals():
    """Return all practicals definition metadata"""
    return jsonify(get_practicals_list())


@dashboard_bp.route('/api/status', methods=['GET'])
def api_status():
    """Return live status of all practicals"""
    return jsonify(get_system_statuses())


@dashboard_bp.route('/api/service/<service_name>/start', methods=['POST'])
def api_start_service(service_name):
    """Handle starting service signal"""
    service_name = service_name.lower()
    SERVICE_STATES[service_name] = True
    return jsonify({
        "success": True,
        "message": f"Service '{service_name}' is fully integrated and active in Flask backend"
    })


@dashboard_bp.route('/api/service/<service_name>/stop', methods=['POST'])
def api_stop_service(service_name):
    """Handle stopping service signal"""
    service_name = service_name.lower()
    SERVICE_STATES[service_name] = False
    return jsonify({
        "success": True,
        "message": f"Service '{service_name}' standby mode activated"
    })
