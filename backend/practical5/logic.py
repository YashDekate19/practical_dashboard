import uuid
from datetime import datetime

WEATHER_DATA = {
    "city": "Mumbai",
    "temperature": "28°C",
    "condition": "Sunny",
    "humidity": "65%",
    "forecast": "Clear skies with light coastal breeze"
}

BREAKING_NEWS = [
    {"id": "b-01", "headline": "Global markets show positive momentum as tech sectors rally.", "time": "10 mins ago"},
    {"id": "b-02", "headline": "New national education framework updates announced for STEM universities.", "time": "25 mins ago"},
    {"id": "b-03", "headline": "ISRO outlines upcoming satellite missions for deep space climate observation.", "time": "1 hour ago"}
]

ARTICLES = [
    {
        "id": "art-01",
        "title": "Tata Trusts Proposes New Institutional Reforms to Accelerate Development",
        "category": "India",
        "author": "National Desk",
        "date": "28 September 2026",
        "image": "https://picsum.photos/600/300?random=2",
        "summary": "Key proposals include modernizing healthcare delivery frameworks and rural community education centers.",
        "content": "In a comprehensive strategy meeting, the leadership outlined modernization initiatives aimed at scaling grassroots community health and primary education infrastructure across the nation."
    },
    {
        "id": "art-02",
        "title": "Global Tech Summit Highlights AI Safety and Sustainable Compute",
        "category": "Tech",
        "author": "Technology Correspondent",
        "date": "28 September 2026",
        "image": "https://picsum.photos/250/150?random=1",
        "summary": "Industry leaders pledge adherence to open benchmarks in generative artificial intelligence.",
        "content": "Delegates from over 40 countries convened in Geneva to establish joint protocols ensuring green computing standards for data centers."
    },
    {
        "id": "art-03",
        "title": "National Economic Indicators Project 7.2% GDP Growth for Current Fiscal",
        "category": "Economy",
        "author": "Financial Bureau",
        "date": "28 September 2026",
        "image": "https://picsum.photos/250/150?random=3",
        "summary": "Robust manufacturing output and record digital payment transactions bolster economic outlook.",
        "content": "Quarterly reserve reports indicate buoyant consumer demand and sustained foreign direct investment across emerging manufacturing clusters."
    },
    {
        "id": "art-04",
        "title": "Championship Cricket Series Begins with Thrilling Last-Over Finish",
        "category": "Sports",
        "author": "Sports Bureau",
        "date": "28 September 2026",
        "image": "https://picsum.photos/250/150?random=4",
        "summary": "A sensational four on the final delivery secures dramatic victory in tournament opener.",
        "content": "The match showcased extraordinary athletic fielding and strategic bowling under pressure, delighting over 65,000 stadium spectators."
    },
    {
        "id": "art-05",
        "title": "James Webb Space Telescope Uncovers Ancient Galaxy Structures",
        "category": "Science",
        "author": "Science & Astronomy Desk",
        "date": "28 September 2026",
        "image": "https://picsum.photos/250/150?random=5",
        "summary": "Astrophysicists detect star formations dating back to just 350 million years after the Big Bang.",
        "content": "High-resolution infrared spectroscopy confirmed distinctive chemical signatures of early cosmic elements previously considered theoretical."
    }
]

SUBSCRIBERS = []


def get_all_articles(category=None):
    """Retrieve articles with optional category filter"""
    if category and category.lower() != 'all':
        return [a for a in ARTICLES if a["category"].lower() == category.lower()]
    return ARTICLES


def get_article_by_id(art_id):
    """Find article by id"""
    for a in ARTICLES:
        if a["id"] == art_id:
            return a
    return None


def get_breaking_news():
    return BREAKING_NEWS


def get_weather(city=None):
    if city:
        return {**WEATHER_DATA, "city": city}
    return WEATHER_DATA


def subscribe_newsletter(data):
    """Handle newsletter subscriptions"""
    email = data.get("email", "").strip().lower()
    if not email or "@" not in email:
        return {"success": False, "message": "A valid email address is required."}

    sub_id = f"SUB-{uuid.uuid4().hex[:6].upper()}"
    record = {
        "sub_id": sub_id,
        "email": email,
        "subscribed_at": datetime.now().isoformat()
    }
    SUBSCRIBERS.append(record)

    return {
        "success": True,
        "message": f"Successfully subscribed to The Daily Times morning edition!",
        "subscriber": record
    }
