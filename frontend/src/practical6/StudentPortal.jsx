import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  Bookmark, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  User, 
  X, 
  Send, 
  CheckCircle, 
  GraduationCap, 
  ShieldAlert,
  Star
} from 'lucide-react';
import { getPr6Students, getPr6Stats, contactAdvisor } from '../services/api';

const DEFAULT_STUDENTS = [
  {
    id: "STU-89210",
    name: "Alexandria Rivera",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    major: "Computer Science",
    department: "School of Engineering",
    gpa: 3.92,
    academicYear: "Senior",
    email: "a.rivera@university.edu",
    phone: "+1 (555) 234-5678",
    status: "Honors",
    bio: "Passionate software engineer focusing on AI systems and modern web frameworks. Active peer mentor and VP of the Coding Society.",
    skills: ["React", "Python", "Machine Learning", "TypeScript", "Tailwind CSS"],
    courses: [
      { code: "CS-401", name: "Distributed Systems", grade: "A" },
      { code: "CS-480", name: "Artificial Intelligence", grade: "A" },
      { code: "MATH-310", name: "Linear Algebra", grade: "A-" }
    ],
    emergencyContact: { name: "Maria Rivera", relation: "Mother", phone: "+1 (555) 987-6543" },
    advisor: "Dr. Robert Vance"
  },
  {
    id: "STU-74321",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    major: "Data Science",
    department: "School of Information",
    gpa: 3.78,
    academicYear: "Junior",
    email: "m.chen@university.edu",
    phone: "+1 (555) 345-6789",
    status: "Active",
    bio: "Data enthusiast with a love for statistical modeling and data visualization. Currently researching predictive analytics in urban mobility.",
    skills: ["Python", "R", "SQL", "Tableau", "Data Analysis"],
    courses: [
      { code: "DS-301", name: "Data Wrangling", grade: "A-" },
      { code: "STAT-402", name: "Applied Statistics", grade: "B+" },
      { code: "CS-201", name: "Data Structures", grade: "A" }
    ],
    emergencyContact: { name: "David Chen", relation: "Father", phone: "+1 (555) 876-5432" },
    advisor: "Dr. Elena Rostova"
  },
  {
    id: "STU-61298",
    name: "Sophia Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    major: "Bioengineering",
    department: "School of Engineering",
    gpa: 3.98,
    academicYear: "Senior",
    email: "s.patel@university.edu",
    phone: "+1 (555) 456-7890",
    status: "Honors",
    bio: "Biomedical researcher working on sustainable tissue engineering. President of the Biomedical Engineering Club and Dean's List student.",
    skills: ["CAD", "Biomaterials", "MATLAB", "Lab Research", "Genetics"],
    courses: [
      { code: "BIO-450", name: "Tissue Engineering", grade: "A" },
      { code: "CHEM-302", name: "Organic Chemistry II", grade: "A" },
      { code: "BIO-410", name: "Cellular Dynamics", grade: "A" }
    ],
    emergencyContact: { name: "Aarav Patel", relation: "Brother", phone: "+1 (555) 765-4321"},
    advisor: "Dr. Marcus Thorne"
  },
  {
    id: "STU-52109",
    name: "Jordan Hayes",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    major: "Mechanical Engineering",
    department: "School of Engineering",
    gpa: 3.45,
    academicYear: "Sophomore",
    email: "j.hayes@university.edu",
    phone: "+1 (555) 567-8901",
    status: "Active",
    bio: "Robotics team lead and CAD designer. Enthusiastic about renewable energy systems and autonomous rover exploration.",
    skills: ["SolidWorks", "MATLAB", "Robotics", "3D Printing", "C++"],
    courses: [
      { code: "ME-201", name: "Thermodynamics", grade: "B" },
      { code: "ME-220", name: "Fluid Mechanics", grade: "B+" },
      { code: "CS-110", name: "Python for Engineers", grade: "A" }
    ],
    emergencyContact: { name: "Lisa Hayes", relation: "Mother", phone: "+1 (555) 654-3210" },
    advisor: "Dr. Sarah Jenkins"
  },
  {
    id: "STU-43981",
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    major: "Electrical Engineering",
    department: "School of Engineering",
    gpa: 3.85,
    academicYear: "Senior",
    email: "e.rodriguez@university.edu",
    phone: "+1 (555) 678-9012",
    status: "Honors",
    bio: "Embedded systems researcher building low-power IoT sensor networks for environmental monitoring. IEEE Student Chapter secretary.",
    skills: ["Embedded C", "Circuit Design", "IoT", "FPGA", "Python"],
    courses: [
      { code: "EE-301", name: "Signals & Systems", grade: "A" },
      { code: "EE-450", name: "Microcontroller Systems", grade: "A-" },
      { code: "PHYS-220", name: "Electromagnetism", grade: "A" }
    ],
    emergencyContact: { name: "Carlos Rodriguez", relation: "Father", phone: "+1 (555) 543-2109" },
    advisor: "Dr. Robert Vance"
  },
  {
    id: "STU-31872",
    name: "Tariq Washington",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    major: "Cybersecurity",
    department: "School of Information",
    gpa: 3.65,
    academicYear: "Junior",
    email: "t.washington@university.edu",
    phone: "+1 (555) 789-0123",
    status: "Active",
    bio: "Ethical hacker and competitive CTF player. Researching network vulnerability assessment and cryptographic protocol analysis.",
    skills: ["Network Security", "Linux", "Python", "Cryptography", "Penetration Testing"],
    courses: [
      { code: "SEC-301", name: "Network Defense", grade: "A" },
      { code: "SEC-410", name: "Applied Cryptography", grade: "B+" },
      { code: "CS-350", name: "Operating Systems", grade: "B" }
    ],
    emergencyContact: { name: "Angela Washington", relation: "Sister", phone: "+1 (555) 432-1098" },
    advisor: "Dr. Elena Rostova"
  }
];

export default function StudentPortal({ onBackToDashboard }) {
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [minGpa, setMinGpa] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [bookmarks, setBookmarks] = useState(new Set());
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [advisorMsg, setAdvisorMsg] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [sRes, stRes] = await Promise.all([
          getPr6Students(),
          getPr6Stats()
        ]);
        if (sRes?.students?.length) setStudents(sRes.students);
        if (stRes?.stats) setStats(stRes.stats);
      } catch (err) {}
    }
    load();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContactAdvisor = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !advisorMsg) return;
    try {
      const res = await contactAdvisor({
        student_id: selectedStudent.id,
        advisor: selectedStudent.advisor,
        message: advisorMsg
      });
      showToast(res.message || 'Message sent to academic advisor!');
      setAdvisorMsg('');
      setAdvisorModalOpen(false);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || 
        s.name.toLowerCase().includes(q) || 
        s.major.toLowerCase().includes(q) || 
        s.id.toLowerCase().includes(q) ||
        s.skills?.some(sk => sk.toLowerCase().includes(q));

      const matchDept = selectedDept === 'All' || s.department === selectedDept;
      const matchGpa = minGpa === 'All' || s.gpa >= parseFloat(minGpa);

      return matchSearch && matchDept && matchGpa;
    });
  }, [students, searchQuery, selectedDept, minGpa]);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0d14', color: '#fff', paddingBottom: '60px' }}>
      {/* Toast Alert */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'rgba(16, 185, 129, 0.95)', color: '#fff', padding: '12px 24px',
          borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
        }}>
          <CheckCircle size={18} /> {toastMsg}
        </div>
      )}

      {/* Top Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(15, 21, 35, 0.9)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            width: '40px', height: '40px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <GraduationCap size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Student Profile Portal</h1>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>Practical 06 • React 19 SPA + Flask API</span>
          </div>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', background: '#1e293b',
          borderRadius: '10px', padding: '8px 16px', maxWidth: '400px', flex: 1, border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />
          <input 
            type="text" placeholder="Search by student name, major, or skills..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

        {/* View Switcher & Exit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '2px' }}>
            <button 
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? '#334155' : 'transparent',
                color: viewMode === 'grid' ? '#fff' : '#94a3b8',
                padding: '6px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center'
              }}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? '#334155' : 'transparent',
                color: viewMode === 'list' ? '#fff' : '#94a3b8',
                padding: '6px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center'
              }}
            >
              <List size={16} />
            </button>
          </div>

          {onBackToDashboard && (
            <button onClick={onBackToDashboard} style={{
              background: '#334155', color: '#cbd5e1', padding: '8px 16px',
              borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600
            }}>
              Exit to Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Analytics Summary */}
      <div style={{ maxWidth: '1280px', margin: '24px auto 0', padding: '0 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'
        }}>
          <div style={{ background: 'rgba(18, 24, 38, 0.7)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Enrolled Students</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
              {stats?.total_students || students.length}
            </div>
          </div>
          <div style={{ background: 'rgba(18, 24, 38, 0.7)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Average Cumulative GPA</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              {stats?.average_gpa || '3.77'}
            </div>
          </div>
          <div style={{ background: 'rgba(18, 24, 38, 0.7)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Honors Scholars</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
              {stats?.honors_students || '3'} Students
            </div>
          </div>
          <div style={{ background: 'rgba(18, 24, 38, 0.7)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Bookmarked</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818cf8', marginTop: '4px' }}>
              {bookmarks.size} Profiles
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{
        maxWidth: '1280px', margin: '20px auto', padding: '0 24px',
        display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Department:</span>
          <select 
            value={selectedDept} onChange={e => setSelectedDept(e.target.value)}
            style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            <option value="All">All Departments</option>
            <option value="School of Engineering">School of Engineering</option>
            <option value="School of Information">School of Information</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Min GPA:</span>
          <select 
            value={minGpa} onChange={e => setMinGpa(e.target.value)}
            style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            <option value="All">Any GPA</option>
            <option value="3.5">3.50+ GPA</option>
            <option value="3.8">3.80+ (Honors)</option>
          </select>
        </div>
      </div>

      {/* Student Directory Grid / List */}
      <main style={{ maxWidth: '1280px', margin: '20px auto', padding: '0 24px' }}>
        {filteredStudents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            <User size={48} strokeWidth={1} style={{ marginBottom: '16px' }} />
            <p>No student records match your filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredStudents.map(s => (
              <div key={s.id} style={{
                background: 'rgba(18, 24, 38, 0.85)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)',
                padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative'
              }}>
                <button 
                  onClick={() => toggleBookmark(s.id)}
                  style={{
                    position: 'absolute', top: '18px', right: '18px', background: 'transparent',
                    color: bookmarks.has(s.id) ? '#38bdf8' : '#64748b'
                  }}
                >
                  <Bookmark size={20} fill={bookmarks.has(s.id) ? '#38bdf8' : 'none'} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img 
                    src={s.avatar} alt={s.name}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(56, 189, 248, 0.5)' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{s.name}</h3>
                    <p style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, margin: '2px 0' }}>{s.major}</p>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{s.id}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#1e293b', borderRadius: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cumulative GPA</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{s.gpa}</span>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.85rem', flex: 1, marginBottom: '16px', lineHeight: 1.5 }}>
                  {s.bio}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {s.skills?.slice(0, 4).map((sk, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8',
                      padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600
                    }}>
                      {sk}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setSelectedStudent(s)}
                    style={{
                      flex: 1, background: 'rgba(255,255,255,0.08)', color: '#fff',
                      padding: '8px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => { setSelectedStudent(s); setAdvisorModalOpen(true); }}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: '#fff',
                      padding: '8px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700
                    }}
                  >
                    Contact Advisor
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List Mode */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredStudents.map(s => (
              <div key={s.id} style={{
                background: 'rgba(18, 24, 38, 0.85)', borderRadius: '12px', padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={s.avatar} alt={s.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 700 }}>{s.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{s.major} • {s.department}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#34d399' }}>GPA {s.gpa}</div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{s.status}</span>
                  </div>
                  <button onClick={() => setSelectedStudent(s)} style={{ background: '#334155', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Student Details Modal */}
      {selectedStudent && !advisorModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#111827', width: '100%', maxWidth: '580px', borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)', padding: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src={selectedStudent.avatar} alt={selectedStudent.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{selectedStudent.name}</h3>
                  <p style={{ color: '#38bdf8', fontWeight: 600, margin: '2px 0' }}>{selectedStudent.major}</p>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{selectedStudent.department} • Year: {selectedStudent.academicYear}</span>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} style={{ background: 'transparent', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Enrolled Courses & Grades</h4>
              <div style={{ background: '#1e293b', borderRadius: '12px', padding: '12px' }}>
                {selectedStudent.courses?.map((c, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: idx < selectedStudent.courses.length - 1 ? '1px solid #334155' : 'none' }}>
                    <span style={{ fontWeight: 600 }}>{c.code}: {c.name}</span>
                    <span style={{ color: '#34d399', fontWeight: 800 }}>{c.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div style={{ background: '#1e293b', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Emergency Contact</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedStudent.emergencyContact?.name} ({selectedStudent.emergencyContact?.relation})</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>{selectedStudent.emergencyContact?.phone}</div>
              </div>
              <div style={{ background: '#1e293b', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Academic Advisor</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedStudent.advisor}</div>
                <div style={{ fontSize: '0.8rem', color: '#a855f7' }}>Advisor Office Active</div>
              </div>
            </div>

            <button 
              onClick={() => setAdvisorModalOpen(true)}
              style={{
                width: '100%', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: '#fff', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem'
              }}
            >
              Contact Academic Advisor
            </button>
          </div>
        </div>
      )}

      {/* Advisor Message Modal */}
      {advisorModalOpen && selectedStudent && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#111827', width: '100%', maxWidth: '480px', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.12)', padding: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Inquiry for {selectedStudent.advisor}</h3>
              <button onClick={() => setAdvisorModalOpen(false)} style={{ background: 'transparent', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '16px' }}>
              Submitting an academic inquiry regarding student <b>{selectedStudent.name}</b> ({selectedStudent.id}).
            </p>
            <form onSubmit={handleContactAdvisor}>
              <div style={{ marginBottom: '20px' }}>
                <textarea 
                  required rows="4" placeholder="Enter message for advisor regarding courses, academic standing, or inquiries..."
                  value={advisorMsg} onChange={e => setAdvisorMsg(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#1e293b', border: '1px solid #334155', color: '#fff' }}
                />
              </div>
              <button type="submit" style={{
                width: '100%', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: '#fff', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem'
              }}>
                Send Advisor Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
