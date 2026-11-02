import os
from pathlib import Path
from dotenv import load_dotenv

# Base Directory: root of the repository
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env if present
env_path = BASE_DIR / '.env'
if not env_path.exists():
    env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)


class Config:
    """Application Configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'tsd-5th-sem-secret-key-2026-dashboard')
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() in ('true', '1', 't')
    PORT = int(os.environ.get('PORT', 5000))
    HOST = os.environ.get('HOST', '0.0.0.0')

    # Path Configurations
    ROOT_DIR = str(BASE_DIR)
    REACT_DIST_DIR = str(BASE_DIR / 'frontend' / 'dist')
    USE_REACT_FRONTEND = os.environ.get('USE_REACT_FRONTEND', 'true').lower() in ('true', '1', 't')
    DASHBOARD_PUBLIC_DIR = str(BASE_DIR / 'home-dashboard' / 'public')
    PR1_DIR = str(BASE_DIR / 'Pr1')
    PR2_DIR = str(BASE_DIR / 'Pr2')
    PR3_DIR = str(BASE_DIR / 'Pr3')
    PR4_DIR = str(BASE_DIR / 'Pr4')
    PR5_DIR = str(BASE_DIR / 'Pr5')
    PR6_DIST_DIR = str(BASE_DIR / 'Pr 6' / 'new-practical' / 'dist')

    # Practical 4 Database Configuration (Supabase PostgreSQL / MySQL / SQLite Fallback)
    DATABASE_URL = os.environ.get('DATABASE_URL')
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_PORT = int(os.environ.get('DB_PORT', 3306))
    DB_USER = os.environ.get('DB_USER', 'personal')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', 'MyNewPassword123!')
    DB_NAME = os.environ.get('DB_NAME', 'authentication_db')

    # SQLite fallback database file for offline/cloud deployment
    SQLITE_DB_PATH = os.environ.get(
        'SQLITE_DB_PATH',
        str(BASE_DIR / 'backend' / 'authentication.db')
    )

    # CORS Settings
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*')
