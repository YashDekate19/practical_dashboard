import uuid
from datetime import datetime

PROFILE_DATA = {
    "name": "Yash Dekate",
    "title": "Aspiring Software Developer | Problem Solver | Tech Enthusiast",
    "intro": "Hello, I'm Yash Dekate",
    "bio": "I am a B.Tech student interested in Artificial Intelligence, Data Science, Machine Learning, and Software Development. I enjoy solving real-world problems and building performant, useful software projects.",
    "avatar": "Photo.jpeg",
    "location": "Nagpur, Maharashtra, India",
    "social": {
        "email": "yashdekate312@gmail.com",
        "linkedin": "https://www.linkedin.com/in/yash-dekate-a210a2358",
        "github": "https://github.com/YashDekate19"
    }
}

SKILLS_DATA = [
    {
        "category": "Programming Languages",
        "skills": [
            {"name": "Python", "level": "Advanced", "percent": 90},
            {"name": "C++", "level": "Proficient", "percent": 85},
            {"name": "C", "level": "Proficient", "percent": 80},
            {"name": "JavaScript", "level": "Intermediate", "percent": 75},
            {"name": "SQL", "level": "Proficient", "percent": 80}
        ]
    },
    {
        "category": "Artificial Intelligence & Data Science",
        "skills": [
            {"name": "Machine Learning", "level": "Intermediate", "percent": 75},
            {"name": "Data Analysis & Pandas", "level": "Proficient", "percent": 80},
            {"name": "Computer Vision / OpenCV", "level": "Intermediate", "percent": 70},
            {"name": "Deep Learning Fundamentals", "level": "Intermediate", "percent": 65}
        ]
    },
    {
        "category": "Web Development",
        "skills": [
            {"name": "HTML5 & CSS3", "level": "Expert", "percent": 95},
            {"name": "Python Flask", "level": "Proficient", "percent": 85},
            {"name": "Node.js & Express", "level": "Intermediate", "percent": 75},
            {"name": "React 19 & Tailwind CSS", "level": "Intermediate", "percent": 70}
        ]
    },
    {
        "category": "Developer Tools",
        "skills": [
            {"name": "Git & GitHub", "level": "Proficient", "percent": 85},
            {"name": "VS Code", "level": "Expert", "percent": 90},
            {"name": "MySQL Workbench", "level": "Proficient", "percent": 80},
            {"name": "Linux / Bash", "level": "Intermediate", "percent": 75}
        ]
    }
]

PROJECTS_DATA = [
    {
        "id": "proj-01",
        "title": "Full-Stack Authentication & Profile System",
        "category": "Full-Stack Web Development",
        "tech": ["Python", "Flask", "MySQL", "bcrypt", "HTML5", "CSS3"],
        "description": "Double-sided animated login and signup portal with secure bcrypt cryptographic hashing, MySQL user persistence, and interactive user profile dashboard.",
        "link": "/practicals/pr4/"
    },
    {
        "id": "proj-02",
        "title": "Centralized Web Practicals Dashboard",
        "category": "Full-Stack System Architecture",
        "tech": ["Python Flask", "Node.js", "REST APIs", "Modern CSS"],
        "description": "Unified dashboard serving 6 academic practicals with dynamic health status checking, background service management, and responsive preview modals.",
        "link": "/"
    },
    {
        "id": "proj-03",
        "title": "ShopEasy E-Commerce Storefront",
        "category": "Frontend Architecture",
        "tech": ["HTML5", "CSS Grid", "Responsive Design"],
        "description": "Modern gadgets and consumer electronics storefront showcasing promotional summer sales, responsive product grid, and category navigation.",
        "link": "/practicals/pr2/"
    },
    {
        "id": "proj-04",
        "title": "Student Academic Profile Directory",
        "category": "Single Page Application",
        "tech": ["React 19", "Vite", "Tailwind CSS", "Lucide Icons"],
        "description": "State-of-the-art interactive student registry with real-time fuzzy search, GPA filters, courses modal popups, and bookmarks.",
        "link": "/practicals/pr6-preview/"
    }
]

EDUCATION_DATA = [
    {
        "order": "01",
        "year": "2024 - 2027",
        "degree": "B.Tech in Computer Engineering",
        "institution": "University Department of Engineering & Technology",
        "description": "Pursuing Bachelor's degree focusing on AI, Data Structures, Algorithms, Software Engineering, and Web Technologies.",
        "status": "Currently Pursuing"
    },
    {
        "order": "02",
        "year": "2022 - 2024",
        "degree": "Diploma in Computer Engineering",
        "institution": "Polytechnic Institute",
        "description": "Completed 3-year diploma curriculum with solid hands-on engineering practicals in Database Systems, Operating Systems, and Programming.",
        "result": "69.80%"
    },
    {
        "order": "03",
        "year": "2020 - 2022",
        "degree": "10th Standard (SSC)",
        "institution": "Secondary School",
        "description": "Completed secondary school certificate education with strong fundamentals in mathematics and science.",
        "result": "78.50%"
    }
]

INQUIRIES = []


def get_profile():
    return PROFILE_DATA


def get_skills():
    return SKILLS_DATA


def get_projects():
    return PROJECTS_DATA


def get_education():
    return EDUCATION_DATA


def handle_contact_inquiry(data):
    """Handle incoming contact inquiries from portfolio visitors"""
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip() or "General Inquiry"
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return {"success": False, "message": "Name, email, and message are required."}

    inquiry_id = f"INQ-{uuid.uuid4().hex[:6].upper()}"
    record = {
        "inquiry_id": inquiry_id,
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "created_at": datetime.now().isoformat()
    }
    INQUIRIES.append(record)

    return {
        "success": True,
        "message": f"Thank you, {name}! Your message has been received. Yash will respond shortly.",
        "inquiry": record
    }
