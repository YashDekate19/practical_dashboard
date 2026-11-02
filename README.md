# 🎓 Web Development Practicals Suite & Centralized Dashboard

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Render](https://img.shields.io/badge/Render-Deploy%20Ready-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

A comprehensive, academic full-stack portfolio comprising **6 Web Development practicals** developed for the **5th Semester Technical Skill Development (TSD)** curriculum. The suite features pure HTML5/CSS3 frontend showcases, full-stack Python Flask + MySQL/SQLite authentication, modern React 19 Single Page Applications (SPA), and a unified **Modular Python Flask Backend** providing centralized access, live process management, REST APIs for all 6 practicals, and seamless one-click deployment to **Render**.

---

## 🌟 Practicals Overview

| Practical | Project Title | Architecture & Stack | Directory | Route / Access URL | Backend API Prefix |
|---|---|---|---|---|---|
| **Practical 01** | **Tasty Restaurant** | Static HTML5 / CSS3 / Flexbox | `Pr1/` | Served at `/practicals/pr1/` | `/api/pr1/...` (menu, order, reservation) |
| **Practical 02** | **ShopEasy E-Commerce** | Static HTML5 / CSS3 / CSS Grid | `Pr2/` | Served at `/practicals/pr2/` | `/api/pr2/...` (products, search, cart, checkout) |
| **Practical 03** | **Personal Portfolio** | Static HTML5 / CSS3 Showcase | `Pr3/` | Served at `/practicals/pr3/` | `/api/pr3/...` (profile, skills, projects, contact) |
| **Practical 04** | **Auth & Profile System** | Flask + MySQL / SQLite + bcrypt | `Pr4/` | Served at `/practicals/pr4/` | `/api/...` (register, login, users, test-db) |
| **Practical 05** | **The Daily Times News** | Static HTML5 / CSS Grid Editorial | `Pr5/` | Served at `/practicals/pr5/` | `/api/pr5/...` (articles, breaking, weather) |
| **Practical 06** | **Student Profile Portal** | React 19 + Vite + Tailwind CSS | `Pr 6/new-practical/` | Served at `/practicals/pr6/` | `/api/pr6/...` (students, stats, advisor) |
| **Dashboard** | **Home Dashboard** | Unified Python Flask Microserver | `backend/` | `http://localhost:5000` | `/api/practicals`, `/api/status`, `/health` |

---

## 🚀 Quick Start (Local Run)

### 1. Clone the Repository
```bash
git clone https://github.com/YashDekate19/practical_dashboard.git
cd practical_dashboard
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Start the Unified Flask Backend
```bash
python wsgi.py
```
*Or directly via Python:*
```bash
python backend/app.py
```
👉 Open **`http://localhost:5000`** in your browser.

### 4. (Optional) Run React Frontend in Development Mode
To run the modern React 19 frontend with Hot Module Replacement (HMR):
```bash
npm run frontend:dev
```
👉 Open **`http://localhost:5173`** (API requests are automatically proxied to Flask on port 5000).

To build the React frontend for Flask to serve in production:
```bash
npm run frontend:build
```

From the Dashboard UI, you can:
- Switch seamlessly between all practicals (Tasty Restaurant, ShopEasy, Developer Portfolio, Auth System, Daily Times, Student Portal).
- Instantly preview Practicals via embedded routing or dedicated React views.
- Check live server & database connection statuses for Practical 4.
- Make REST API requests across all practicals (`/api/pr1/*`, `/api/pr2/*`, `/api/pr3/*`, `/api/register`, `/api/pr5/*`, `/api/pr6/*`).
- View both the pure React 19 components and original static files at `/practicals/prX/`.

---

## ☁️ Deployment on Render

This repository is pre-configured for instant zero-configuration deployment to **Render** using Gunicorn:

1. Connect your repository on [Render Dashboard](https://dashboard.render.com).
2. Choose **New Web Service** and select `practical_dashboard`.
3. Set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn wsgi:app --bind 0.0.0.0:$PORT`
4. Deploy!

*(For full step-by-step instructions with environment variable setup and SQLite/MySQL options, see [DEPLOYMENT_RENDER.md](DEPLOYMENT_RENDER.md).)*

---

## 📂 Repository Structure

```text
practical_dashboard/
├── .env.example                 # Environment configuration template
├── .gitignore                   # Universal git ignore rules
├── DEPLOYMENT_RENDER.md         # Step-by-step Render deployment guide
├── LICENSE                      # MIT License
├── package.json                 # Convenience commands (npm start runs wsgi.py)
├── Procfile                     # Web process configuration for Render/Heroku
├── README.md                    # Root project documentation
├── render.yaml                  # Render Infrastructure-as-Code blueprint
├── requirements.txt             # Production Python dependencies
├── wsgi.py                      # WSGI entry point for Gunicorn
│
├── backend/                     # Unified Modular Python Flask Backend
│   ├── app.py                   # Flask Application Factory & blueprint registry
│   ├── config.py                # Environment-driven configuration
│   ├── requirements.txt         # Backend Python package requirements
│   │
│   ├── dashboard/               # Home Dashboard Blueprint
│   │   ├── logic.py             # Practical definitions & health checkers
│   │   └── routes.py            # Dashboard UI and status APIs
│   │
│   ├── practical1/              # Practical 01: Tasty Restaurant
│   │   ├── logic.py             # Menu catalog, ordering & reservation logic
│   │   └── routes.py            # Static file serving & REST endpoints
│   │
│   ├── practical2/              # Practical 02: ShopEasy E-Commerce
│   │   ├── logic.py             # Product catalog, search & checkout logic
│   │   └── routes.py            # Static file serving & REST endpoints
│   │
│   ├── practical3/              # Practical 03: Personal Developer Portfolio
│   │   ├── logic.py             # Developer profile, skills matrix & inquiries
│   │   └── routes.py            # Static file serving & REST endpoints
│   │
│   ├── practical4/              # Practical 04: Auth & Profile System
│   │   ├── logic.py             # Supabase PostgreSQL / MySQL driver with SQLite fallback & bcrypt
│   │   └── routes.py            # Auth templates (/profile) and auth REST APIs
│   │
│   ├── practical5/              # Practical 05: The Daily Times News Portal
│   │   ├── logic.py             # Newspaper articles, breaking news & weather
│   │   └── routes.py            # Static file serving & REST endpoints
│   │
│   └── practical6/              # Practical 06: Student Profile Portal
│       ├── logic.py             # Academic student directory & analytics
│       └── routes.py            # React 19 SPA bundle delivery & student APIs
│
├── frontend/                    # Modern Unified React 19 + Vite Frontend
│   ├── package.json             # React 19, Lucide React, Vite dependencies
│   ├── vite.config.js           # Proxy configuration to Flask backend (:5000)
│   ├── dist/                    # Compiled production bundle served by Flask
│   └── src/
│       ├── App.jsx              # Main React SPA shell & navigation router
│       ├── dashboard/           # React Dashboard components & practical cards
│       ├── practical1/          # Tasty Restaurant React view
│       ├── practical2/          # ShopEasy E-Commerce React view & cart state
│       ├── practical3/          # Developer Portfolio React view & contact form
│       ├── practical4/          # Auth & Profile React view & authentication
│       ├── practical5/          # Daily Times News Portal React view & weather
│       ├── practical6/          # Student Academic Portal React view & stats
│       └── services/api.js      # Unified REST API client for Flask backend
│
├── home-dashboard/              # Dashboard Legacy Frontend Files
│   └── public/                  # Original Glassmorphism Dashboard UI
│       ├── index.html
│       ├── styles.css
│       └── app.js
│
├── Pr1/                         # Practical 01: Tasty Restaurant (Original Static files)
├── Pr2/                         # Practical 02: ShopEasy E-Commerce (Original Static files)
├── Pr3/                         # Practical 03: Yash Dekate Portfolio (Original Static files)
├── Pr4/                         # Practical 04: Auth & Profile (Original Templates & scripts)
├── Pr5/                         # Practical 05: The Daily Times (Original Static files)
└── Pr 6/                        # Practical 06: Student Academic Portal (Original React SPA)
```

---

## 🛡️ Database Architecture (Practical 04)

- **Cloud Database**: Supabase Managed PostgreSQL (`DATABASE_URL` pooler connection, `users` table).
- **Secondary / Local**: MySQL Server (`authentication_db` database, `users` table).
- **Automatic Cloud Fallback**: If external database is not reachable during isolated offline development, the system automatically initializes an internal SQLite database (`authentication.db`) with the exact same `users` schema.
- **Security**: Cryptographic password hashing using `bcrypt` (work factor 12) with zero plain-text storage.

---

## 👨‍💻 Author

**Yash Dekate**
- GitHub: [@YashDekate19](https://github.com/YashDekate19)
- Academic Program: Diploma in Computer Engineering (5th Semester - TSD)

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
