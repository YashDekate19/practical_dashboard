import os
from pathlib import Path
from backend.config import Config

PRACTICALS = [
    {
        "id": "pr1",
        "number": "Practical 01",
        "numIndex": 1,
        "title": "Tasty Restaurant",
        "subtitle": "Restaurant Landing Page & Food Catalog",
        "category": "Frontend Web Development",
        "tech": ["HTML5", "CSS3", "Responsive Design", "Flexbox", "Flask API"],
        "description": "A culinary landing page showcasing an interactive hero showcase, special menu with pricing in INR (Pizza, Burger, Pasta, Sandwich, etc.), about our chefs story, table reservation form, and REST endpoints.",
        "type": "static",
        "folder": "Pr1",
        "entryPath": "/practicals/pr1/index.html",
        "externalUrl": "/practicals/pr1/index.html",
        "port": "5000 (Flask)",
        "command": "Served directly by Python Flask Backend",
        "requirements": {
            "db": "None required",
            "env": "None required",
            "dependencies": "Flask, Flask-Cors"
        }
    },
    {
        "id": "pr2",
        "number": "Practical 02",
        "numIndex": 2,
        "title": "ShopEasy E-Commerce",
        "subtitle": "Electronics & Gadgets Product Catalog",
        "category": "Frontend Web Development",
        "tech": ["HTML5", "CSS3", "CSS Grid", "E-Commerce UI", "Flask API"],
        "description": "E-commerce storefront featuring summer sale promotion banners, category navigation, live search bar, and electronics catalog (Gaming Laptops, Smartwatches, DSLR Cameras, Audio Gear, Monitors, 4K TVs).",
        "type": "static",
        "folder": "Pr2",
        "entryPath": "/practicals/pr2/index.html",
        "externalUrl": "/practicals/pr2/index.html",
        "port": "5000 (Flask)",
        "command": "Served directly by Python Flask Backend",
        "requirements": {
            "db": "None required",
            "env": "None required",
            "dependencies": "Flask, Flask-Cors"
        }
    },
    {
        "id": "pr3",
        "number": "Practical 03",
        "numIndex": 3,
        "title": "Personal Developer Portfolio",
        "subtitle": "Yash Dekate - Engineering Showcase",
        "category": "Frontend Web Development",
        "tech": ["HTML5", "CSS3", "UI/UX Design", "Portfolio", "Flask API"],
        "description": "Modern developer portfolio presenting personal biography, core competencies in AI, ML, Python, C++, and Web Development, academic education timeline, project showcase, and inquiry contact endpoints.",
        "type": "static",
        "folder": "Pr3",
        "entryPath": "/practicals/pr3/index.html",
        "externalUrl": "/practicals/pr3/index.html",
        "port": "5000 (Flask)",
        "command": "Served directly by Python Flask Backend",
        "requirements": {
            "db": "None required",
            "env": "None required",
            "dependencies": "Flask, Flask-Cors"
        }
    },
    {
        "id": "pr4",
        "number": "Practical 04",
        "numIndex": 4,
        "title": "Authentication & Profile System",
        "subtitle": "Full-Stack Flask + Supabase PostgreSQL Web App",
        "category": "Full-Stack Web Development",
        "tech": ["Python 3", "Flask", "Supabase PostgreSQL", "bcrypt", "REST API"],
        "description": "Full-stack authentication system with animated double-sided sliding sign-in & sign-up forms, cryptographic bcrypt password hashing, Supabase PostgreSQL persistence, authenticated student profile dashboard (/profile), and JSON REST endpoints.",
        "type": "fullstack",
        "folder": "Pr4",
        "entryPath": "/practicals/pr4/",
        "externalUrl": "/practicals/pr4/",
        "port": "5000 (Flask)",
        "command": "Integrated in Flask Backend (or standalone: python app.py in Pr4)",
        "serviceKey": "pr4",
        "requirements": {
            "db": "Supabase PostgreSQL (DATABASE_URL) with auto SQLite fallback",
            "env": "DATABASE_URL=postgresql://...",
            "dependencies": "Flask, Flask-Cors, psycopg2-binary, bcrypt"
        }
    },
    {
        "id": "pr5",
        "number": "Practical 05",
        "numIndex": 5,
        "title": "The Daily Times News Portal",
        "subtitle": "Multi-Column Editorial Newspaper",
        "category": "Frontend Web Development",
        "tech": ["HTML5", "CSS3", "Grid Layout", "Editorial UI", "Flask API"],
        "description": "Digital broadsheet news portal with authentic newspaper design, live weather and date header, breaking news banner, and multi-column grid layout spanning World News, National Politics, Technology, Economy, Sports, and Science.",
        "type": "static",
        "folder": "Pr5",
        "entryPath": "/practicals/pr5/index.html",
        "externalUrl": "/practicals/pr5/index.html",
        "port": "5000 (Flask)",
        "command": "Served directly by Python Flask Backend",
        "requirements": {
            "db": "None required",
            "env": "None required",
            "dependencies": "Flask, Flask-Cors"
        }
    },
    {
        "id": "pr6",
        "number": "Practical 06",
        "numIndex": 6,
        "title": "Student Profile Portal",
        "subtitle": "React 19 SPA + Vite + Tailwind CSS",
        "category": "Modern Frontend Framework",
        "tech": ["React 19", "Vite", "Tailwind CSS 4", "Lucide Icons", "Flask API"],
        "description": "Interactive student directory and academic profile portal featuring real-time search, department & GPA filters, Grid vs List layout switcher, student bookmarking, modal popups for academic courses and skills, and contact forms.",
        "type": "vite",
        "folder": "Pr 6/new-practical",
        "entryPath": "/practicals/pr6/index.html",
        "externalUrl": "/practicals/pr6/index.html",
        "previewUrl": "/practicals/pr6-preview/index.html",
        "port": "5000 (Flask Static / API) | 5173 (Vite Dev)",
        "command": "Pre-built production bundle served by Flask (or run: npm run dev in Pr 6/new-practical)",
        "serviceKey": "pr6",
        "requirements": {
            "db": "None required",
            "env": "Node.js (for dev only)",
            "dependencies": "Pre-built SPA bundle (served by Flask) + Python API endpoints"
        }
    }
]


# Service statuses tracking
SERVICE_STATES = {
    "pr4": True,  # Integrated directly in Flask
    "pr6": True   # Integrated pre-built React SPA bundle
}


def get_practicals_list():
    """Return copy of practicals metadata list"""
    return PRACTICALS


def get_system_statuses():
    """Evaluate live status for each practical"""
    from backend.practical4.logic import check_db_health

    statuses = {}
    base_path = Path(Config.ROOT_DIR)

    # Practical 1, 2, 3, 5: Check index.html presence
    for p in PRACTICALS:
        if p["type"] == "static":
            folder = base_path / p["folder"]
            index_file = folder / "index.html"
            if index_file.exists():
                statuses[p["id"]] = {
                    "status": "Ready",
                    "badgeClass": "badge-ready",
                    "details": "Static files verified and served live via Flask",
                    "isLive": True
                }
            else:
                statuses[p["id"]] = {
                    "status": "Setup Required",
                    "badgeClass": "badge-setup",
                    "details": f"index.html missing in {p['folder']}",
                    "isLive": False
                }

    # Practical 4 (Flask + MySQL / SQLite fallback)
    db_status = check_db_health()
    if db_status["ok"]:
        db_type = db_status.get("type", "Database")
        db_name = db_status.get("database", "authentication_db")
        statuses["pr4"] = {
            "status": "Ready",
            "badgeClass": "badge-ready",
            "details": f"Flask auth backend active • Connected to {db_type} [{db_name}]",
            "isLive": True,
            "port": Config.PORT
        }
    else:
        statuses["pr4"] = {
            "status": "Ready (Fallback)",
            "badgeClass": "badge-ready",
            "details": f"Flask auth backend active • {db_status.get('message', 'Active')}",
            "isLive": True,
            "port": Config.PORT
        }

    # Practical 6 (React 19 Vite Production Bundle / Preview)
    pr6_dist = Path(Config.PR6_DIST_DIR) / "index.html"
    if pr6_dist.exists():
        statuses["pr6"] = {
            "status": "Ready",
            "badgeClass": "badge-ready",
            "details": "Production React 19 bundle verified and served via Flask",
            "isLive": True,
            "hasPreview": True,
            "port": Config.PORT
        }
    else:
        statuses["pr6"] = {
            "status": "Setup Required",
            "badgeClass": "badge-setup",
            "details": "React build missing. Run `npm run build` in Pr 6/new-practical",
            "isLive": False,
            "port": Config.PORT
        }

    return statuses
