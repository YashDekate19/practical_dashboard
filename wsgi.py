# WSGI Entry Point for Gunicorn / Production Hosting (Render, Railway, Heroku)
import sys
from pathlib import Path

# Ensure root path is accessible in python module search
ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.app import app

if __name__ == "__main__":
    from backend.config import Config
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
