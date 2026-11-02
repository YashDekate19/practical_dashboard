# 🚀 Render Deployment Guide: Practical Dashboard (Flask Backend)

This guide walks you through deploying the unified **Python Flask Practicals Dashboard** to [Render](https://render.com) as a Web Service.

---

## 📋 Overview

The entire project (Home Dashboard + Practicals 1 to 6) is now consolidated into a modular Python Flask backend with WSGI production support (`gunicorn`).

- **Framework**: Python 3.8+ / Flask 3.0
- **WSGI Server**: Gunicorn
- **Entry Point**: `wsgi.py` (`wsgi:app`)
- **Port**: Dynamically bound via `$PORT` environment variable
- **Frontend Compatibility**: 100% preserved. The Dashboard UI, static routing, REST APIs, and embedded iframe previews work out-of-the-box.

---

## 🛠️ Step-by-Step Render Deployment

### Step 1: Push Changes to GitHub
Ensure all new backend files, configuration, and dependencies are committed and pushed:
```bash
git add .
git commit -m "feat: migrate entire backend from Node.js to modular Python Flask"
git push origin main
```

---

### Step 2: Create a New Web Service on Render
1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Click **"New +"** in the top right corner and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and click **Next**.
4. Connect your GitHub account and select your repository: **`YashDekate19/practical_dashboard`**.

---

### Step 3: Configure Web Service Settings

Fill in the settings in the Render configuration form:

| Field | Recommended Value | Notes |
|---|---|---|
| **Name** | `practical-dashboard` | Or any unique name for your URL |
| **Region** | `Singapore` or `Oregon` | Choose nearest to your target users |
| **Branch** | `main` | Production branch |
| **Root Directory** | *(Leave blank)* | Uses root of repository |
| **Runtime** | `Python 3` | Python runtime environment |
| **Build Command** | `npm --prefix frontend install && npm --prefix frontend run build && pip install -r requirements.txt` | Builds React frontend and installs Flask/WSGI dependencies |
| **Start Command** | `gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120` | Production WSGI runner |
| **Instance Type** | `Free` | Completely supported on Free tier |

> **Pro Tip:** Alternatively, Render will automatically detect the included [`render.yaml`](render.yaml) file if you deploy as a **Blueprint**!

---

### Step 4: Configure Environment Variables

In the **Environment Variables** section on Render, add the following:

| Key | Recommended Value | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres.[ref]:[pass]@[host]:6543/postgres?sslmode=require` | **Supabase PostgreSQL Connection URI** (From Supabase -> Settings -> Database -> Connection String) |
| `PYTHON_VERSION` | `3.10.12` | Recommended Python version |
| `FLASK_DEBUG` | `False` | Production mode |
| `SECRET_KEY` | *(Click "Generate" on Render)* | App cryptographic secret |

> **How to get your Supabase Connection String for Render:**
> 1. In your [Supabase Dashboard](https://supabase.com/dashboard), open your project.
> 2. Go to **Project Settings** (gear icon) -> **Database**.
> 3. Scroll down to **Connection string** and click the **URI** tab.
> 4. Select **Session** or **Transaction Pooler** (recommended for serverless/cloud: port `6543`).
> 5. Copy the URI and replace `[YOUR-PASSWORD]` with your actual Supabase database password.
> 6. Add it as `DATABASE_URL` in Render.
>
> *(Note: If `DATABASE_URL` is omitted, the application will automatically fall back to internal SQLite so it never crashes!)*

---

### Step 5: Deploy & Verify

1. Click **"Create Web Service"**.
2. Render will start the build process:
   - Cloning repository
   - Installing dependencies via `pip install -r requirements.txt`
   - Launching with `gunicorn wsgi:app`
3. Once live, open your service URL (e.g. `https://practical-dashboard.onrender.com`).
4. Test the health endpoint:
   ```
   GET https://practical-dashboard.onrender.com/health
   ```
   Expected response:
   ```json
   {
     "status": "healthy",
     "framework": "Python Flask",
     "dashboard": "Ready",
     "environment": "production"
   }
   ```

---

## 🧪 Local Testing Before Deployment

You can test the exact production setup locally:

```powershell
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run with Python
python wsgi.py

# Or directly:
python backend/app.py
```
Open **`http://localhost:5000`** in your browser. All practicals (Pr1 to Pr6) and the Home Dashboard will be running on Flask!
