from pathlib import Path
from flask import Blueprint, jsonify, request, send_from_directory, redirect
from backend.config import Config
from backend.practical1.logic import (
    RESTAURANT_INFO,
    get_all_menu_items,
    get_menu_item_by_id,
    calculate_order,
    make_reservation
)

pr1_bp = Blueprint('practical1', __name__)


# -----------------------------------------------------------------------------
# Static Frontend Serving for Practical 1
# -----------------------------------------------------------------------------

@pr1_bp.route('/practicals/pr1', methods=['GET'])
def redirect_pr1():
    return redirect('/practicals/pr1/', code=301)


@pr1_bp.route('/practicals/pr1/', methods=['GET'])
@pr1_bp.route('/practicals/pr1/<path:filename>', methods=['GET'])
def serve_pr1_static(filename='index.html'):
    """Serve static files for Practical 01 (Tasty Restaurant)"""
    pr1_dir = Path(Config.PR1_DIR)
    target = pr1_dir / filename

    if not target.exists() or target.is_dir():
        filename = 'index.html'

    return send_from_directory(pr1_dir, filename)


# -----------------------------------------------------------------------------
# Practical 1 REST API Endpoints
# -----------------------------------------------------------------------------

@pr1_bp.route('/api/pr1/info', methods=['GET'])
def api_pr1_info():
    """Get restaurant information and operating hours"""
    return jsonify({"success": True, "restaurant": RESTAURANT_INFO})


@pr1_bp.route('/api/pr1/menu', methods=['GET'])
def api_pr1_menu():
    """Retrieve full or category-filtered restaurant menu"""
    category = request.args.get('category')
    items = get_all_menu_items(category)
    return jsonify({
        "success": True,
        "count": len(items),
        "menu": items
    })


@pr1_bp.route('/api/pr1/menu/<item_id>', methods=['GET'])
def api_pr1_menu_item(item_id):
    """Retrieve details for a specific menu item"""
    item = get_menu_item_by_id(item_id)
    if not item:
        return jsonify({"success": False, "message": "Menu item not found"}), 404
    return jsonify({"success": True, "item": item})


@pr1_bp.route('/api/pr1/order', methods=['POST'])
def api_pr1_order():
    """Place a culinary order with itemized billing and GST"""
    data = request.get_json() or {}
    result = calculate_order(data)
    status_code = 200 if result.get("success") else 400
    return jsonify(result), status_code


@pr1_bp.route('/api/pr1/reservation', methods=['POST'])
def api_pr1_reservation():
    """Reserve a dining table"""
    data = request.get_json() or {}
    result = make_reservation(data)
    status_code = 200 if result.get("success") else 400
    return jsonify(result), status_code
