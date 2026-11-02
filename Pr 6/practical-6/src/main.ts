import React, { useState, useMemo } from 'react';

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
  ChevronDown, 
  ChevronUp, 
  X, 
  Send, 
  CheckCircle, 
  GraduationCap, 
  ShieldAlert
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_STUDENTS = [
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
      { code: "BENG-410", name: "Biomechanics", grade: "A" }
    ],
    emergencyContact: { name: "Aarav Patel", relation: "Brother", phone: "+1 (555) 765-4321" },
    advisor: "Dr. James Sterling"
  },
  {
    id: "STU-52019",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    major: "Business Administration",
    department: "School of Business",
    gpa: 3.12,
    academicYear: "Sophomore",
    email: "l.oconnor@university.edu",
    phone: "+1 (555) 567-8901",
    status: "Active",
    bio: "Aspiring entrepreneur and marketing strategist. Active member of the Student Investment Fund and intramural soccer captain.",
    skills: ["Financial Analysis", "Marketing", "Public Speaking", "Excel", "Project Management"],
    courses: [
      { code: "BUS-201", name: "Principles of Finance", grade: "B" },
      { code: "MKT-210", name: "Digital Marketing", grade: "A-" },
      { code: "ECON-102", name: "Macroeconomics", grade: "C+" }
    ],
    emergencyContact: { name: "Sarah O'Connor", relation: "Mother", phone: "+1 (555) 654-3210" },
    advisor: "Prof. Karen Miller"
  },
  {
    id: "STU-41832",
    name: "Emma Watson-Taylor",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    major: "Graphic Design",
    department: "School of Arts",
    gpa: 3.65,
    academicYear: "Freshman",
    email: "e.watson@university.edu",
    phone: "+1 (555) 678-9012",
    status: "On Leave",
    bio: "UI/UX designer and digital illustrator on a semester leave for an industry internship at a global design agency.",
    skills: ["Figma", "Illustrator", "UI/UX", "Typography", "Branding"],
    courses: [
      { code: "DES-101", name: "Design Fundamentals", grade: "A" },
      { code: "ART-120", name: "Digital Media", grade: "A-" }
    ],
    emergencyContact: { name: "Arthur Watson", relation: "Father", phone: "+1 (555) 543-2109" },
    advisor: "Prof. Chloe Bennett"
  },
  {
    id: "STU-33921",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    major: "Computer Science",
    department: "School of Engineering",
    gpa: 3.85,
    academicYear: "Junior",
    email: "d.kim@university.edu",
    phone: "+1 (555) 789-0123",
    status: "Active",
    bio: "Cybersecurity researcher with a focus on network security and cryptography. Competitive CTF player.",
    skills: ["Cybersecurity", "C++", "Networking", "Linux", "Ethical Hacking"],
    courses: [
      { code: "CS-350", name: "Computer Security", grade: "A" },
      { code: "CS-310", name: "Operating Systems", grade: "A-" },
      { code: "MATH-240", name: "Discrete Math", grade: "A" }
    ],
    emergencyContact: { name: "Grace Kim", relation: "Sister", phone: "+1 (555) 432-1098" },
    advisor: "Dr. Robert Vance"
  }
];

// --- REUSABLE COMPONENTS ---

// 1. Badge Component using Grayscale Theme
const Badge = ({ variant = 'default', children, className = '' }) => {
  // Styles mapping using #212529, #343a40, #495057, #ced4da, #f8f9fa
  const badgeStyles = {
    Honors: 'bg-[#212529] text-[#f8f9fa] border-[#212529]',
    Active: 'bg-[#343a40] text-[#f8f9fa] border-[#343a40]',
    'On Leave': 'bg-[#f8f9fa] text-[#495057] border-[#ced4da]',
    default: 'bg-[#f8f9fa] text-[#212529] border-[#ced4da]'
  };

  const style = badgeStyles[variant] || badgeStyles.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-[11px] font-medium tracking-wide uppercase ${style} ${className}`}>
      {variant === 'Honors' && <Award className="w-3 h-3 mr-1" />}
      {variant === 'Active' && <CheckCircle className="w-3 h-3 mr-1" />}
      {children || variant}
    </span>
  );
};

// 2. Skill Tag Component
const SkillTag = ({ skill, onClick, isSelected }) => {
  return (
    <span 
      onClick={() => onClick && onClick(skill)}
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded border transition-colors ${
        onClick ? 'cursor-pointer' : ''
      } ${
        isSelected 
          ? 'bg-[#212529] text-[#f8f9fa] border-[#212529]' 
          : 'bg-[#f8f9fa] text-[#343a40] border-[#ced4da] hover:bg-[#ced4da]/30'
      }`}
    >
      #{skill}
    </span>
  );
};

// 3. Info Row Component
const InfoRow = ({ icon: Icon, label, value, href }) => {
  return (
    <div className="flex items-center text-xs text-[#495057] py-1 border-b border-[#f8f9fa] last:border-0">
      <Icon className="w-3.5 h-3.5 text-[#495057] mr-2 flex-shrink-0" />
      <span className="font-semibold text-[#495057] w-20 flex-shrink-0">{label}:</span>
      {href ? (
        <a href={href} className="text-[#212529] font-medium hover:underline truncate">
          {value}
        </a>
      ) : (
        <span className="text-[#212529] font-medium truncate">{value}</span>
      )}
    </div>
  );
};

// 4. Student Card Component
const StudentCard = ({ student, viewMode, isBookmarked, onToggleBookmark, onOpenMessageModal, isExpanded, onToggleExpand }) => {
  const isGrid = viewMode === 'grid';

  return (
    <div 
      className={`bg-white rounded border border-[#ced4da] shadow-sm flex flex-col overflow-hidden relative ${
        isGrid ? 'w-full' : 'w-full flex-col sm:flex-row sm:items-center p-4'
      }`}
    >
      {/* Top Banner Accent */}
      {isGrid && (
        <div className="h-2 bg-[#212529] w-full" />
      )}

      {/* Main Content */}
      <div className={`p-5 ${isGrid ? 'w-full' : 'p-0 flex-1'}`}>
        <div className={`flex ${isGrid ? 'flex-col items-start' : 'items-center space-x-4'}`}>
          
          <div className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center space-x-3">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-12 h-12 rounded-full object-cover border border-[#ced4da]"
              />
              <div>
                <h3 className="text-base font-bold text-[#212529] leading-tight">
                  {student.name}
                </h3>
                <p className="text-xs text-[#495057] font-medium">
                  {student.major}
                </p>
                <p className="text-[11px] text-[#495057]/80">
                  ID: {student.id} • {student.academicYear}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 self-start">
              <Badge variant={student.status} />
              <button
                onClick={() => onToggleBookmark(student.id)}
                className={`p-1.5 rounded border transition-colors ${
                  isBookmarked 
                    ? 'bg-[#212529] text-[#f8f9fa] border-[#212529]' 
                    : 'bg-[#f8f9fa] text-[#495057] border-[#ced4da] hover:bg-[#ced4da]/30'
                }`}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark Profile"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

        </div>

        {/* GPA & Advisor Quick Stat Box */}
        <div className="my-3 grid grid-cols-2 gap-2 bg-[#f8f9fa] p-2.5 rounded border border-[#ced4da]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#495057]">GPA</span>
            <p className="text-sm font-extrabold text-[#212529]">{student.gpa} <span className="text-[10px] font-normal text-[#495057]">/ 4.0</span></p>
          </div>
          <div className="border-l border-[#ced4da] pl-2.5">
            <span className="text-[10px] uppercase font-bold text-[#495057]">Advisor</span>
            <p className="text-xs font-semibold text-[#212529] truncate">{student.advisor}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="my-2">
          <InfoRow icon={Mail} label="Email" value={student.email} href={`mailto:${student.email}`} />
          <InfoRow icon={Phone} label="Phone" value={student.phone} href={`tel:${student.phone}`} />
        </div>

        {/* Skill Tags */}
        <div className="mt-3">
          <p className="text-[10px] uppercase font-bold text-[#495057] mb-1">Top Skills</p>
          <div className="flex flex-wrap gap-1">
            {student.skills.slice(0, 3).map((skill, idx) => (
              <SkillTag key={idx} skill={skill} />
            ))}
            {student.skills.length > 3 && (
              <span className="text-xs text-[#495057] self-center px-1 font-medium">
                +{student.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Collapsible Details */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-[#ced4da] space-y-3">
            <div>
              <h4 className="text-[11px] uppercase font-bold text-[#212529] mb-1">
                Biography
              </h4>
              <p className="text-xs text-[#495057] leading-relaxed bg-[#f8f9fa] p-2.5 rounded border border-[#ced4da]">
                {student.bio}
              </p>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-[11px] uppercase font-bold text-[#212529] mb-1 flex items-center justify-between">
                <span>Enrolled Courses</span>
                <BookOpen className="w-3.5 h-3.5 text-[#343a40]" />
              </h4>
              <div className="space-y-1">
                {student.courses.map((course, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#f8f9fa] p-2 rounded border border-[#ced4da] text-xs">
                    <div>
                      <span className="font-bold text-[#212529]">{course.code}</span>
                      <span className="text-[#495057] ml-2">{course.name}</span>
                    </div>
                    <span className="font-bold text-[#f8f9fa] bg-[#343a40] px-1.5 py-0.5 rounded text-[10px]">
                      {course.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#f8f9fa] p-2.5 rounded border border-[#ced4da]">
              <h4 className="text-[10px] font-bold text-[#212529] uppercase flex items-center mb-0.5">
                <ShieldAlert className="w-3 h-3 mr-1 text-[#343a40]" /> Emergency Contact
              </h4>
              <p className="text-xs font-medium text-[#212529]">
                {student.emergencyContact.name} ({student.emergencyContact.relation})
              </p>
              <p className="text-xs font-mono text-[#495057]">
                {student.emergencyContact.phone}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={`p-3 bg-[#f8f9fa] border-t border-[#ced4da] flex items-center gap-2 ${
        isGrid ? 'mt-auto' : 'sm:flex-col sm:justify-center sm:border-t-0 sm:border-l'
      }`}>
        <button
          onClick={() => onToggleExpand(student.id)}
          className="flex-1 py-1.5 px-3 text-xs font-semibold text-[#343a40] bg-white hover:bg-[#ced4da]/30 border border-[#ced4da] rounded transition-colors flex items-center justify-center gap-1"
        >
          {isExpanded ? (
            <>Less <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Details <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
        <button
          onClick={() => onOpenMessageModal(student)}
          className="flex-1 py-1.5 px-3 text-xs font-semibold bg-[#212529] hover:bg-[#343a40] text-[#f8f9fa] rounded transition-colors flex items-center justify-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" /> Message
        </button>
      </div>
    </div>
  );
};

// 5. Filter Bar Component
const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedMajor, 
  setSelectedMajor, 
  selectedYear, 
  setSelectedYear, 
  selectedStatus, 
  setSelectedStatus,
  viewMode,
  setViewMode,
  majors,
  years,
  statuses,
  onReset
}) => {
  return (
    <div className="bg-white border border-[#ced4da] rounded p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#495057]" />
          <input
            type="text"
            placeholder="Search student name, ID, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-[#f8f9fa] border border-[#ced4da] rounded text-xs sm:text-sm text-[#212529] focus:outline-none focus:border-[#212529] placeholder:text-[#495057]"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#495057] hover:text-[#212529]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters & Grid/List Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="px-2.5 py-2 bg-[#f8f9fa] border border-[#ced4da] rounded text-xs text-[#212529] focus:outline-none focus:border-[#212529]"
          >
            <option value="All">All Majors</option>
            {majors.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2.5 py-2 bg-[#f8f9fa] border border-[#ced4da] rounded text-xs text-[#212529] focus:outline-none focus:border-[#212529]"
          >
            <option value="All">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-2 bg-[#f8f9fa] border border-[#ced4da] rounded text-xs text-[#212529] focus:outline-none focus:border-[#212529]"
          >
            <option value="All">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {(searchTerm || selectedMajor !== 'All' || selectedYear !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={onReset}
              className="text-xs font-semibold text-[#343a40] hover:underline px-2 py-1"
            >
              Reset
            </button>
          )}

          <div className="flex items-center bg-[#f8f9fa] border border-[#ced4da] rounded p-0.5 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#212529] text-[#f8f9fa]' 
                  : 'text-[#495057] hover:text-[#212529]'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#212529] text-[#f8f9fa]' 
                  : 'text-[#495057] hover:text-[#212529]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// 6. Student Grid Container
const StudentGrid = ({ students, viewMode, bookmarkedIds, onToggleBookmark, onOpenMessageModal, expandedIds, onToggleExpand }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded border border-[#ced4da]">
        <User className="w-10 h-10 text-[#ced4da] mx-auto mb-2" />
        <h3 className="text-sm font-bold text-[#212529]">No students match the criteria</h3>
        <p className="text-xs text-[#495057] mt-1">Try clearing filters or adjusting your search phrase.</p>
      </div>
    );
  }

  return (
    <div className={
      viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
        : "flex flex-col gap-3"
    }>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          viewMode={viewMode}
          isBookmarked={bookmarkedIds.includes(student.id)}
          onToggleBookmark={onToggleBookmark}
          onOpenMessageModal={onOpenMessageModal}
          isExpanded={expandedIds.includes(student.id)}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
};

// 7. Quick Message Modal
const QuickMessageModal = ({ student, onClose }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#212529]/60 backdrop-blur-xs">
      <div className="bg-white border border-[#ced4da] w-full max-w-md rounded shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#f8f9fa] border-b border-[#ced4da] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full border border-[#ced4da] object-cover" />
            <div>
              <h3 className="text-xs font-bold text-[#212529]">
                Send Message to {student.name}
              </h3>
              <p className="text-[10px] text-[#495057]">{student.email}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#495057] hover:text-[#212529]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {sent ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-[#212529] mx-auto" />
            <h4 className="text-xs font-bold text-[#212529]">Message Dispatched</h4>
            <p className="text-xs text-[#495057]">Your note has been submitted to the university messaging system.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#495057] mb-1">
                Subject
              </label>
              <input
                type="text"
                defaultValue="Academic Communication"
                className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#ced4da] rounded text-xs text-[#212529] focus:outline-none focus:border-[#212529]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#495057] mb-1">
                Message Text
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write message content here..."
                className="w-full p-2.5 bg-[#f8f9fa] border border-[#ced4da] rounded text-xs text-[#212529] focus:outline-none focus:border-[#212529] resize-none"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-[#ced4da]">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-[#495057] hover:bg-[#f8f9fa] border border-[#ced4da] rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold bg-[#212529] hover:bg-[#343a40] text-[#f8f9fa] rounded flex items-center gap-1"
              >
                <Send className="w-3 h-3" /> Send
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

// --- MAIN PORTAL APP ---
export default function App() {
  const [students] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [activeMessageStudent, setActiveMessageStudent] = useState(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const majors = useMemo(() => Array.from(new Set(students.map(s => s.major))), [students]);
  const years = useMemo(() => Array.from(new Set(students.map(s => s.academicYear))), [students]);
  const statuses = useMemo(() => Array.from(new Set(students.map(s => s.status))), [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesMajor = selectedMajor === 'All' || student.major === selectedMajor;
      const matchesYear = selectedYear === 'All' || student.academicYear === selectedYear;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
      const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(student.id);

      return matchesSearch && matchesMajor && matchesYear && matchesStatus && matchesBookmark;
    });
  }, [students, searchTerm, selectedMajor, selectedYear, selectedStatus, showBookmarksOnly, bookmarkedIds]);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleToggleExpand = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMajor('All');
    setSelectedYear('All');
    setSelectedStatus('All');
    setShowBookmarksOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#212529] p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Simple & Clean Header */}
        <header className="bg-white border border-[#ced4da] rounded p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#343a40]">
              <GraduationCap className="w-4 h-4" />
              <span>University Student Directory</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#212529] tracking-tight">
              Student Profile Portal
            </h1>
            <p className="text-xs text-[#495057]">
              Simple, high-contrast UI component collection for viewing and managing student records.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3 py-2 rounded text-xs font-bold flex items-center gap-1.5 border transition-colors ${
                showBookmarksOnly 
                  ? 'bg-[#212529] text-[#f8f9fa] border-[#212529]' 
                  : 'bg-[#f8f9fa] border-[#ced4da] text-[#343a40] hover:bg-[#ced4da]/30'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span>Bookmarked ({bookmarkedIds.length})</span>
            </button>

            <div className="bg-[#f8f9fa] border border-[#ced4da] rounded px-3 py-2 flex items-center gap-2 text-xs">
              <span className="font-bold uppercase text-[#495057]">Records:</span>
              <span className="font-extrabold text-[#212529]">{filteredStudents.length}</span>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedMajor={selectedMajor}
          setSelectedMajor={setSelectedMajor}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          viewMode={viewMode}
          setViewMode={setViewMode}
          majors={majors}
          years={years}
          statuses={statuses}
          onReset={handleResetFilters}
        />

        {/* Student Cards Area */}
        <main>
          <StudentGrid
            students={filteredStudents}
            viewMode={viewMode}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenMessageModal={(student) => setActiveMessageStudent(student)}
            expandedIds={expandedIds}
            onToggleExpand={handleToggleExpand}
          />
        </main>

        {/* Quick Message Modal */}
        <QuickMessageModal
          student={activeMessageStudent}
          onClose={() => setActiveMessageStudent(null)}
        />

      </div>
    </div>
  );
}