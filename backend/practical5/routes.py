from pathlib import Path
from flask import Blueprint, jsonify, request, send_from_directory, redirect
from backend.config import Config
from backend.practical5.logic import (
    get_all_articles,
    get_article_by_id,
    get_breaking_news,
    get_weather,
    subscribe_newsletter
)

pr5_bp = Blueprint('practical5', __name__)


# -----------------------------------------------------------------------------
# Static Frontend Serving for Practical 5
# -----------------------------------------------------------------------------

@pr5_bp.route('/practicals/pr5', methods=['GET'])
def redirect_pr5():
    return redirect('/practicals/pr5/', code=301)


@pr5_bp.route('/practicals/pr5/', methods=['GET'])
@pr5_bp.route('/practicals/pr5/<path:filename>', methods=['GET'])
def serve_pr5_static(filename='index.html'):
    """Serve static files for Practical 05 (The Daily Times News Portal)"""
    pr5_dir = Path(Config.PR5_DIR)
    target = pr5_dir / filename

    if not target.exists() or target.is_dir():
        filename = 'index.html'

    return send_from_directory(pr5_dir, filename)


# -----------------------------------------------------------------------------
# Practical 5 REST API Endpoints
# -----------------------------------------------------------------------------

@pr5_bp.route('/api/pr5/articles', methods=['GET'])
def api_pr5_articles():
    """Retrieve newspaper editorial articles, with optional category filtering"""
    category = request.args.get('category')
    articles = get_all_articles(category)
    return jsonify({
        "success": True,
        "count": len(articles),
        "articles": articles
    })


@pr5_bp.route('/api/pr5/articles/<art_id>', methods=['GET'])
def api_pr5_article_detail(art_id):
    """Retrieve full editorial article story"""
    article = get_article_by_id(art_id)
    if not article:
        return jsonify({"success": False, "message": "Article not found"}), 404
    return jsonify({"success": True, "article": article})


@pr5_bp.route('/api/pr5/breaking', methods=['GET'])
def api_pr5_breaking():
    """Get active breaking news banner headlines"""
    return jsonify({"success": True, "breaking": get_breaking_news()})


@pr5_bp.route('/api/pr5/weather', methods=['GET'])
def api_pr5_weather():
    """Get header weather telemetry"""
    city = request.args.get('city')
    return jsonify({"success": True, "weather": get_weather(city)})


@pr5_bp.route('/api/pr5/subscribe', methods=['POST'])
def api_pr5_subscribe():
    """Subscribe to Daily Times digital morning newsletter"""
    data = request.get_json() or {}
    result = subscribe_newsletter(data)
    status_code = 200 if result.get('success') else 400
    return jsonify(result), status_code
