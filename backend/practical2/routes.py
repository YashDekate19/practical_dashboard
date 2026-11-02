from pathlib import Path
from flask import Blueprint, jsonify, request, send_from_directory, redirect
from backend.config import Config
from backend.practical2.logic import (
    get_all_products,
    get_product_by_id,
    get_special_offers,
    search_products,
    calculate_cart,
    process_checkout
)

pr2_bp = Blueprint('practical2', __name__)


# -----------------------------------------------------------------------------
# Static Frontend Serving for Practical 2
# -----------------------------------------------------------------------------

@pr2_bp.route('/practicals/pr2', methods=['GET'])
def redirect_pr2():
    return redirect('/practicals/pr2/', code=301)


@pr2_bp.route('/practicals/pr2/', methods=['GET'])
@pr2_bp.route('/practicals/pr2/<path:filename>', methods=['GET'])
def serve_pr2_static(filename='index.html'):
    """Serve static files for Practical 02 (ShopEasy E-Commerce)"""
    pr2_dir = Path(Config.PR2_DIR)
    target = pr2_dir / filename

    if not target.exists() or target.is_dir():
        filename = 'index.html'

    return send_from_directory(pr2_dir, filename)


# -----------------------------------------------------------------------------
# Practical 2 REST API Endpoints
# -----------------------------------------------------------------------------

@pr2_bp.route('/api/pr2/products', methods=['GET'])
def api_pr2_products():
    """Retrieve e-commerce catalog products, optionally filtered by category or max_price"""
    category = request.args.get('category')
    max_price = request.args.get('max_price')
    items = get_all_products(category, max_price)
    return jsonify({
        "success": True,
        "count": len(items),
        "products": items
    })


@pr2_bp.route('/api/pr2/products/<product_id>', methods=['GET'])
def api_pr2_product_detail(product_id):
    """Retrieve details for a single product"""
    product = get_product_by_id(product_id)
    if not product:
        return jsonify({"success": False, "message": "Product not found"}), 404
    return jsonify({"success": True, "product": product})


@pr2_bp.route('/api/pr2/offers', methods=['GET'])
def api_pr2_offers():
    """Retrieve current special summer promotional deals"""
    offers = get_special_offers()
    return jsonify({
        "success": True,
        "count": len(offers),
        "offers": offers
    })


@pr2_bp.route('/api/pr2/search', methods=['GET'])
def api_pr2_search():
    """Search products by name, description, or category"""
    query = request.args.get('q', '')
    results = search_products(query)
    return jsonify({
        "success": True,
        "query": query,
        "count": len(results),
        "results": results
    })


@pr2_bp.route('/api/pr2/cart', methods=['POST'])
def api_pr2_cart():
    """Calculate subtotal, discounts, shipping, and grand total for cart items"""
    data = request.get_json() or {}
    items = data.get('items', [])
    coupon = data.get('coupon')
    calculation = calculate_cart(items, coupon)
    status_code = 200 if calculation.get('success') else 400
    return jsonify(calculation), status_code


@pr2_bp.route('/api/pr2/checkout', methods=['POST'])
def api_pr2_checkout():
    """Place customer checkout order"""
    data = request.get_json() or {}
    result = process_checkout(data)
    status_code = 200 if result.get('success') else 400
    return jsonify(result), status_code
