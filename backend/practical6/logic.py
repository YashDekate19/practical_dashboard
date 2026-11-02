import uuid
from datetime import datetime

STUDENTS_DATABASE = [
    {
        "id": "STU-89210",
        "name": "Alexandria Rivera",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
        "major": "Computer Science",
        "department": "School of Engineering",
        "gpa": 3.92,
        "academicYear": "Senior",
        "email": "a.rivera@university.edu",
        "phone": "+1 (555) 234-5678",
        "status": "Honors",
        "bio": "Passionate software engineer focusing on AI systems and modern web frameworks. Active peer mentor and VP of the Coding Society.",
        "skills": ["React", "Python", "Machine Learning", "TypeScript", "Tailwind CSS"],
        "courses": [
            {"code": "CS-401", "name": "Distributed Systems", "grade": "A"},
            {"code": "CS-480", "name": "Artificial Intelligence", "grade": "A"},
            {"code": "MATH-310", "name": "Linear Algebra", "grade": "A-"}
        ],
        "emergencyContact": {"name": "Maria Rivera", "relation": "Mother", "phone": "+1 (555) 987-6543"},
        "advisor": "Dr. Robert Vance"
    },
    {
        "id": "STU-74321",
        "name": "Marcus Chen",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
        "major": "Data Science",
        "department": "School of Information",
        "gpa": 3.78,
        "academicYear": "Junior",
        "email": "m.chen@university.edu",
        "phone": "+1 (555) 345-6789",
        "status": "Active",
        "bio": "Data enthusiast with a love for statistical modeling and data visualization. Currently researching predictive analytics in urban mobility.",
        "skills": ["Python", "R", "SQL", "Tableau", "Data Analysis"],
        "courses": [
            {"code": "DS-301", "name": "Data Wrangling", "grade": "A-"},
            {"code": "STAT-402", "name": "Applied Statistics", "grade": "B+"},
            {"code": "CS-201", "name": "Data Structures", "grade": "A"}
        ],
        "emergencyContact": {"name": "David Chen", "relation": "Father", "phone": "+1 (555) 876-5432"},
        "advisor": "Dr. Elena Rostova"
    },
    {
        "id": "STU-61298",
        "name": "Sophia Patel",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        "major": "Bioengineering",
        "department": "School of Engineering",
        "gpa": 3.98,
        "academicYear": "Senior",
        "email": "s.patel@university.edu",
        "phone": "+1 (555) 456-7890",
        "status": "Honors",
        "bio": "Biomedical researcher working on sustainable tissue engineering. President of the Biomedical Engineering Club and Dean's List student.",
        "skills": ["CAD", "Biomaterials", "MATLAB", "Lab Research", "Genetics"],
        "courses": [
            {"code": "BIO-450", "name": "Tissue Engineering", "grade": "A"},
            {"code": "CHEM-302", "name": "Organic Chemistry II", "grade": "A"},
            {"code": "BIO-410", "name": "Cellular Dynamics", "grade": "A"}
        ],
        "emergencyContact": {"name": "Aarav Patel", "relation": "Brother", "phone": "+1 (555) 765-4321"},
        "advisor": "Dr. Marcus Thorne"
    },
    {
        "id": "STU-52109",
        "name": "Jordan Hayes",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
        "major": "Mechanical Engineering",
        "department": "School of Engineering",
        "gpa": 3.45,
        "academicYear": "Sophomore",
        "email": "j.hayes@university.edu",
        "phone": "+1 (555) 567-8901",
        "status": "Active",
        "bio": "Robotics team lead and CAD designer. Enthusiastic about renewable energy systems and autonomous rover exploration.",
        "skills": ["SolidWorks", "MATLAB", "Robotics", "3D Printing", "C++"],
        "courses": [
            {"code": "ME-201", "name": "Thermodynamics", "grade": "B"},
            {"code": "ME-220", "name": "Fluid Mechanics", "grade": "B+"},
            {"code": "CS-110", "name": "Python for Engineers", "grade": "A"}
        ],
        "emergencyContact": {"name": "Lisa Hayes", "relation": "Mother", "phone": "+1 (555) 654-3210"},
        "advisor": "Dr. Sarah Jenkins"
    },
    {
        "id": "STU-43981",
        "name": "Elena Rodriguez",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
        "major": "Electrical Engineering",
        "department": "School of Engineering",
        "gpa": 3.85,
        "academicYear": "Senior",
        "email": "e.rodriguez@university.edu",
        "phone": "+1 (555) 678-9012",
        "status": "Honors",
        "bio": "Embedded systems researcher building low-power IoT sensor networks for environmental monitoring. IEEE Student Chapter secretary.",
        "skills": ["Embedded C", "Circuit Design", "IoT", "FPGA", "Python"],
        "courses": [
            {"code": "EE-301", "name": "Signals & Systems", "grade": "A"},
            {"code": "EE-450", "name": "Microcontroller Systems", "grade": "A-"},
            {"code": "PHYS-220", "name": "Electromagnetism", "grade": "A"}
        ],
        "emergencyContact": {"name": "Carlos Rodriguez", "relation": "Father", "phone": "+1 (555) 543-2109"},
        "advisor": "Dr. Robert Vance"
    },
    {
        "id": "STU-31872",
        "name": "Tariq Washington",
        "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
        "major": "Cybersecurity",
        "department": "School of Information",
        "gpa": 3.65,
        "academicYear": "Junior",
        "email": "t.washington@university.edu",
        "phone": "+1 (555) 789-0123",
        "status": "Active",
        "bio": "Ethical hacker and competitive CTF player. Researching network vulnerability assessment and cryptographic protocol analysis.",
        "skills": ["Network Security", "Linux", "Python", "Cryptography", "Penetration Testing"],
        "courses": [
            {"code": "SEC-301", "name": "Network Defense", "grade": "A"},
            {"code": "SEC-410", "name": "Applied Cryptography", "grade": "B+"},
            {"code": "CS-350", "name": "Operating Systems", "grade": "B"}
        ],
        "emergencyContact": {"name": "Angela Washington", "relation": "Sister", "phone": "+1 (555) 432-1098"},
        "advisor": "Dr. Elena Rostova"
    }
]

ADVISOR_MESSAGES = []


def get_students(query=None, department=None, min_gpa=None, status=None):
    """Filter students by search term, department, and GPA"""
    results = STUDENTSDATABASE = STUDENTS_DATABASE

    if query:
        q = query.lower().strip()
        results = [
            s for s in results
            if q in s["name"].lower() or q in s["major"].lower() or q in s["id"].lower()
            or any(q in sk.lower() for sk in s.get("skills", []))
        ]

    if department and department.lower() != 'all':
        results = [s for s in results if s["department"].lower() == department.lower()]

    if min_gpa:
        try:
            val = float(min_gpa)
            results = [s for s in results if s["gpa"] >= val]
        except ValueError:
            pass

    if status and status.lower() != 'all':
        results = [s for s in results if s["status"].lower() == status.lower()]

    return results


def get_student_by_id(student_id):
    """Retrieve full student record by STU-ID"""
    for s in STUDENTS_DATABASE:
        if s["id"].lower() == student_id.lower():
            return s
    return None


def get_academic_stats():
    """Calculate institutional statistics across student population"""
    total = len(STUDENTS_DATABASE)
    if total == 0:
        return {"total": 0, "avg_gpa": 0, "honors_count": 0}

    avg_gpa = round(sum(s["gpa"] for s in STUDENTS_DATABASE) / total, 2)
    honors_count = sum(1 for s in STUDENTS_DATABASE if s["status"] == "Honors")
    departments = {}
    for s in STUDENTS_DATABASE:
        dept = s["department"]
        departments[dept] = departments.get(dept, 0) + 1

    return {
        "total_students": total,
        "average_gpa": avg_gpa,
        "honors_students": honors_count,
        "departments": departments
    }


def add_student(data):
    """Enroll new student"""
    name = data.get("name", "").strip()
    major = (data.get("major") or data.get("course") or "").strip()
    email = data.get("email", "").strip()

    if not name or not major or not email:
        return {"success": False, "message": "Name, major, and email are required."}

    stu_id = f"STU-{uuid.uuid4().hex[:5].upper()}"
    new_student = {
        "id": stu_id,
        "name": name,
        "avatar": data.get("avatar", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80"),
        "major": major,
        "department": data.get("department", "School of Engineering"),
        "gpa": float(data.get("gpa", 3.50)),
        "academicYear": data.get("academicYear", "Freshman"),
        "email": email,
        "phone": data.get("phone", "+1 (555) 000-0000"),
        "status": "Active" if float(data.get("gpa", 3.50)) < 3.8 else "Honors",
        "bio": data.get("bio", "Newly enrolled university student."),
        "skills": data.get("skills", ["Web Development", "Python"]),
        "courses": data.get("courses", []),
        "emergencyContact": data.get("emergencyContact", {}),
        "advisor": data.get("advisor", "Dr. Robert Vance")
    }
    STUDENTS_DATABASE.append(new_student)

    return {
        "success": True,
        "message": f"Student {name} enrolled successfully!",
        "student": new_student
    }


def send_advisor_message(data):
    """Record contact inquiry sent to academic advisor"""
    student_id = data.get("student_id", "")
    advisor = data.get("advisor", "")
    message = data.get("message", "").strip()

    if not student_id or not message:
        return {"success": False, "message": "student_id and message are required."}

    msg_id = f"MSG-{uuid.uuid4().hex[:6].upper()}"
    record = {
        "msg_id": msg_id,
        "student_id": student_id,
        "advisor": advisor,
        "message": message,
        "sent_at": datetime.now().isoformat()
    }
    ADVISOR_MESSAGES.append(record)

    return {
        "success": True,
        "message": "Message sent to academic advisor successfully.",
        "record": record
    }
