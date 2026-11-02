# 🎓 Web Development Practicals Suite & Centralized Dashboard

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

A comprehensive, academic full-stack portfolio comprising **6 Web Development practicals** developed for the **5th Semester Technical Skill Development (TSD)** curriculum. The suite features pure HTML5/CSS3 frontend showcases, full-stack Python Flask + MySQL authentication, modern React 19 Single Page Applications (SPA), and a unified **Home Dashboard** providing centralized access, live process management, and dynamic health-checks.

---

## 🌟 Practicals Overview

| Practical | Project Title | Architecture & Stack | Directory | Route / Access URL | Start Command |
|---|---|---|---|---|---|
| **Practical 01** | **Tasty Restaurant** | Static HTML5 / CSS3 / Flexbox | `Pr1/` | Served at `/practicals/pr1/` | Handled by Dashboard |
| **Practical 02** | **ShopEasy E-Commerce** | Static HTML5 / CSS3 / CSS Grid | `Pr2/` | Served at `/practicals/pr2/` | Handled by Dashboard |
| **Practical 03** | **Personal Portfolio** | Static HTML5 / CSS3 Showcase | `Pr3/` | Served at `/practicals/pr3/` | Handled by Dashboard |
| **Practical 04** | **Auth & Profile System** | Python Flask + MySQL + bcrypt | `Pr4/` | `http://127.0.0.1:5000` | `cd Pr4 && python app.py` |
| **Practical 05** | **The Daily Times News** | Static HTML5 / CSS Grid Editorial | `Pr5/` | Served at `/practicals/pr5/` | Handled by Dashboard |
| **Practical 06** | **Student Profile Portal** | React 19 + Vite + Tailwind CSS | `Pr 6/new-practical/` | `http://localhost:5173` | `cd "Pr 6/new-practical" && npm run dev` |
| **Dashboard** | **Home Dashboard** | Pure Node.js HTTP Microserver | `home-dashboard/` | `http://localhost:3000` | `npm start` |

---

## 🚀 Quick Start (Launch Everything)

### 1. Clone the Repository
```bash
git clone https://github.com/YashDekate19/dashboard.git
cd dashboard
```

### 2. Start the Central Home Dashboard
The Home Dashboard runs on native Node.js (no external `node_modules` required for the dashboard core):
```bash
npm start
```
*Or directly:*
```bash
node home-dashboard/server.js
```
👉 Open **`http://localhost:3000`** in your browser.

From the Home Dashboard UI, you can:
- Instantly preview Practicals 1, 2, 3, and 5 via embedded static routing.
- Check live server & database connection statuses for Practical 4 (Flask + MySQL).
- Start or stop backend services (Flask and Vite dev servers) with one click.
- Seamlessly view the built React production bundle for Practical 6 even when Vite dev server is offline.

---

## ⚙️ Setting Up Individual Services

### Practical 04: Authentication & Profile System (Flask + MySQL)

1. **Install Python Dependencies**:
   ```bash
   cd Pr4
   pip install -r requirements.txt
   ```

2. **Setup MySQL Database**:
   - Make sure your local MySQL server is running on port `3306`.
   - Run the provided `schema.sql` script in MySQL Workbench or via terminal:
     ```bash
     mysql -u root -p < schema.sql
     ```
   - Default expected database: `authentication_db` with `users` table.

3. **Configure Environment (Optional)**:
   - Copy `.env.example` to `.env` if you wish to override default credentials:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=personal
     DB_PASSWORD=MyNewPassword123!
     DB_NAME=authentication_db
     ```

4. **Run Server**:
   ```bash
   python app.py
   ```
   *(Or click **"Start Service"** directly on Card 4 in the Home Dashboard!)*

---

### Practical 06: Student Profile Portal (React 19 + Vite + Tailwind)

1. **Install Node Dependencies**:
   ```bash
   cd "Pr 6/new-practical"
   npm install
   ```

2. **Run Vite Development Server**:
   ```bash
   npm run dev
   ```
   *The development server will launch at `http://localhost:5173` with instant Hot Module Replacement (HMR).*

3. **Build for Production**:
   ```bash
   npm run build
   ```
   *Creates an optimized production build in `dist/` which is previewable through the Home Dashboard at `/practicals/pr6-preview/index.html`.*

---

## 📂 Repository Structure

```text
dashboard/
├── .gitignore                   # Universal git ignore configuration
├── LICENSE                      # MIT License
├── package.json                 # Root convenience scripts (npm start, etc.)
├── README.md                    # Root project documentation
│
├── home-dashboard/              # Centralized management portal
│   ├── server.js                # Native Node.js HTTP server & process manager
│   ├── package.json             # Dashboard metadata & scripts
│   ├── README.md                # Dashboard specific documentation
│   └── public/                  # Dashboard frontend assets
│       ├── index.html           # Modern glassmorphism UI
│       ├── styles.css           # Premium dark mode CSS design system
│       └── app.js               # Reactive state & live polling logic
│
├── Pr1/                         # Practical 01: Tasty Restaurant
│   ├── index.html               # Semantic HTML5 layout
│   ├── style.css                # CSS3 Flexbox & menu styling
│   └── *.jpeg, *.webp           # Culinary asset images
│
├── Pr2/                         # Practical 02: ShopEasy E-Commerce
│   ├── index.html               # Product catalog interface
│   ├── style.css                # CSS Grid catalog layout
│   └── *.webp, *.jpeg           # Product images
│
├── Pr3/                         # Practical 03: Personal Developer Portfolio
│   ├── index.html               # Yash Dekate portfolio showcase
│   └── style.css                # Minimalist profile styling
│
├── Pr4/                         # Practical 04: Auth & Profile System
│   ├── app.py                   # Flask REST API & auth backend
│   ├── requirements.txt         # Python package dependencies
│   ├── schema.sql               # Database creation & table schema
│   ├── .env.example             # Database configuration template
│   ├── templates/               # Jinja2 HTML templates (Auth & Profile)
│   └── static/                  # Stylesheets and dynamic auth scripts
│
├── Pr5/                         # Practical 05: The Daily Times News Portal
│   ├── index.html               # Broadsheet editorial layout
│   └── style.css                # Multi-column CSS Grid styling
│
└── Pr 6/                        # Practical 06: Student Academic Profile Portal
    ├── new-practical/           # Active React 19 + Vite + Tailwind CSS project
    │   ├── src/                 # React components & Tailwind styles
    │   ├── package.json         # React & Vite dependencies
    │   └── vite.config.js       # Vite configuration
    └── practical-6/             # TypeScript alternative variant
```

---

## 🛡️ Security & Clean Code

- **Zero Secret Leaks**: All database configuration is externalized with environment variables and sample `.env.example` templates.
- **Git Ignore Safeguards**: `.gitignore` comprehensively filters all `node_modules/`, `dist/`, `__pycache__/`, `.env` secrets, and operating system caches.
- **Pure Native Architecture**: The Home Dashboard server operates entirely on native Node.js APIs without requiring `npm install` just to view practicals.

---

## 👨‍💻 Author

**Yash Dekate**
- GitHub: [@YashDekate19](https://github.com/YashDekate19)
- Academic Program: Diploma in Computer Engineering (5th Semester - TSD)

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
