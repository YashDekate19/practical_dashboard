# Web Development Practicals Dashboard (Semester 5)

A unified, modern **Home Dashboard** providing centralized access, live runtime monitoring, and health checking for all 6 web development practicals.

---

## 🌟 Overview of Practicals

| Practical | Title | Architecture | Location | Port / URL | Run Command |
|---|---|---|---|---|---|
| **Practical 01** | **Tasty Restaurant** | Static HTML5 / CSS3 | `Pr1/` | Served at `/practicals/pr1/` | Handled by Dashboard |
| **Practical 02** | **ShopEasy E-Commerce** | Static HTML5 / CSS3 Grid | `Pr2/` | Served at `/practicals/pr2/` | Handled by Dashboard |
| **Practical 03** | **Yash Dekate Portfolio** | Static HTML5 / CSS3 | `Pr3/` | Served at `/practicals/pr3/` | Handled by Dashboard |
| **Practical 04** | **Auth & Profile System** | Python Flask + MySQL | `Pr4/` | `http://127.0.0.1:5000` | `cd Pr4 && python app.py` |
| **Practical 05** | **The Daily Times News** | Static HTML5 / CSS3 Grid | `Pr5/` | Served at `/practicals/pr5/` | Handled by Dashboard |
| **Practical 06** | **Student Profile Portal** | React 19 + Vite + Tailwind | `Pr 6/new-practical/` | `http://127.0.0.1:5173` | `cd "Pr 6/new-practical" && npm run dev` |

---

## 🚀 How to Start the Dashboard

### 1. Launch the Dashboard Server
Open a terminal in the `home-dashboard` folder:
```powershell
cd d:\TSD_5th\dashboard\home-dashboard
node server.js
```
The dashboard will start immediately at:
👉 **`http://localhost:3000`**

---

## ⚙️ Practical Services & Startup Instructions

### Practical 4 (Flask + MySQL)
1. Ensure your local MySQL server is running (Port `3306`).
   - Default Database: `authentication_db`
   - Default Table: `users`
   - Configured in `Pr4/app.py`:
     - User: `personal`
     - Password: `MyNewPassword123!`
     - Host: `localhost`
     - Port: `3306`
2. Start the Flask application:
```powershell
cd d:\TSD_5th\dashboard\Pr4
python app.py
```
*(Alternatively, you can click **"Start Service"** directly on Card 4 in the dashboard!)*

### Practical 6 (React 19 + Vite)
Start the Vite development server with Hot Module Replacement:
```powershell
cd "d:\TSD_5th\dashboard\Pr 6\new-practical"
npm run dev
```
*(Or click **"Start Service"** directly on Card 6 in the dashboard! Even if the dev server is offline, the pre-built production build in `dist/` can be previewed seamlessly!)*

---

## 🛡️ Project Integrity & Preservation
- All 6 original practical codebases remain untouched in their respective folders.
- The dashboard is housed completely inside its own isolated `home-dashboard` directory.
- No database credentials, passwords, or secrets are leaked into client frontend code.
- Dynamic health checks periodically query endpoints (`/api/test-db`, Vite dev server) to show genuine live statuses (`Ready`, `Not Running`, `Configuration Needed`).
