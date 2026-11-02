import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  Layers, 
  Activity, 
  Check, 
  Server, 
  Sparkles,
  Zap
} from 'lucide-react';
import PracticalCard from './PracticalCard';
import PreviewModal from './PreviewModal';
import { getPracticals, getStatuses, startService, stopService } from '../services/api';

const DEFAULT_PRACTICALS = [
  {
    id: "pr1",
    number: "Practical 01",
    numIndex: 1,
    title: "Tasty Restaurant",
    subtitle: "Restaurant Landing Page & Food Catalog",
    category: "Frontend Web Development",
    tech: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "Flask API"],
    description: "A culinary landing page showcasing an interactive hero showcase, special menu with pricing in INR (Pizza, Burger, Pasta, Sandwich, etc.), about our chefs story, table reservation form, and REST endpoints.",
    type: "static",
    folder: "Pr1",
    entryPath: "/practicals/pr1/index.html",
    externalUrl: "/practicals/pr1/index.html",
    port: "5000 (Flask)",
    command: "python wsgi.py",
    requirements: { db: "None required", env: "None required", dependencies: "Flask, Flask-Cors" }
  },
  {
    id: "pr2",
    number: "Practical 02",
    numIndex: 2,
    title: "ShopEasy E-Commerce",
    subtitle: "Electronics & Gadgets Product Catalog",
    category: "Frontend Web Development",
    tech: ["HTML5", "CSS3", "CSS Grid", "E-Commerce UI", "Flask API"],
    description: "E-commerce storefront featuring summer sale promotion banners, category navigation, live search bar, and electronics catalog (Gaming Laptops, Smartwatches, DSLR Cameras, Audio Gear, Monitors, 4K TVs).",
    type: "static",
    folder: "Pr2",
    entryPath: "/practicals/pr2/index.html",
    externalUrl: "/practicals/pr2/index.html",
    port: "5000 (Flask)",
    command: "python wsgi.py",
    requirements: { db: "None required", env: "None required", dependencies: "Flask, Flask-Cors" }
  },
  {
    id: "pr3",
    number: "Practical 03",
    numIndex: 3,
    title: "Personal Developer Portfolio",
    subtitle: "Yash Dekate - Engineering Showcase",
    category: "Frontend Web Development",
    tech: ["HTML5", "CSS3", "UI/UX Design", "Portfolio", "Flask API"],
    description: "Modern developer portfolio presenting personal biography, core competencies in AI, ML, Python, C++, and Web Development, academic education timeline, project showcase, and inquiry contact endpoints.",
    type: "static",
    folder: "Pr3",
    entryPath: "/practicals/pr3/index.html",
    externalUrl: "/practicals/pr3/index.html",
    port: "5000 (Flask)",
    command: "python wsgi.py",
    requirements: { db: "None required", env: "None required", dependencies: "Flask, Flask-Cors" }
  },
  {
    id: "pr4",
    number: "Practical 04",
    numIndex: 4,
    title: "Authentication & Profile System",
    subtitle: "Full-Stack Flask + MySQL/SQLite Web App",
    category: "Full-Stack Web Development",
    tech: ["Python 3", "Flask", "MySQL / SQLite", "bcrypt", "REST API"],
    description: "Full-stack authentication system with animated double-sided sliding sign-in & sign-up forms, cryptographic bcrypt password hashing, database persistence, authenticated student profile dashboard (/profile), and JSON REST endpoints.",
    type: "fullstack",
    folder: "Pr4",
    entryPath: "/practicals/pr4/",
    externalUrl: "/practicals/pr4/",
    port: "5000 (Flask) | 3306 (MySQL)",
    command: "python wsgi.py",
    serviceKey: "pr4",
    requirements: { db: "MySQL (authentication_db) or auto SQLite fallback", env: "DB_HOST=localhost, DB_PORT=3306, DB_USER=personal", dependencies: "Flask, Flask-Cors, bcrypt" }
  },
  {
    id: "pr5",
    number: "Practical 05",
    numIndex: 5,
    title: "The Daily Times News Portal",
    subtitle: "Multi-Column Editorial Newspaper",
    category: "Frontend Web Development",
    tech: ["HTML5", "CSS3", "Grid Layout", "Editorial UI", "Flask API"],
    description: "Digital broadsheet news portal with authentic newspaper design, live weather and date header, breaking news banner, and multi-column grid layout spanning World News, National Politics, Technology, Economy, Sports, and Science.",
    type: "static",
    folder: "Pr5",
    entryPath: "/practicals/pr5/index.html",
    externalUrl: "/practicals/pr5/index.html",
    port: "5000 (Flask)",
    command: "python wsgi.py",
    requirements: { db: "None required", env: "None required", dependencies: "Flask, Flask-Cors" }
  },
  {
    id: "pr6",
    number: "Practical 06",
    numIndex: 6,
    title: "Student Profile Portal",
    subtitle: "React 19 SPA + Vite + Tailwind CSS",
    category: "Modern Frontend Framework",
    tech: ["React 19", "Vite", "Tailwind CSS 4", "Lucide Icons", "Flask API"],
    description: "Interactive student directory and academic profile portal featuring real-time search, department & GPA filters, Grid vs List layout switcher, student bookmarking, modal popups for academic courses and skills, and contact forms.",
    type: "vite",
    folder: "Pr 6/new-practical",
    entryPath: "/practicals/pr6/index.html",
    externalUrl: "/practicals/pr6/index.html",
    previewUrl: "/practicals/pr6-preview/index.html",
    port: "5000 (Flask Static / API) | 5173 (Vite Dev)",
    command: "npm run dev",
    serviceKey: "pr6",
    requirements: { db: "None required", env: "Node.js (for dev only)", dependencies: "Pre-built SPA bundle (served by Flask) + Python API endpoints" }
  }
];

export default function Dashboard({ onOpenPractical }) {
  const [practicals, setPracticals] = useState(DEFAULT_PRACTICALS);
  const [statuses, setStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [previewPractical, setPreviewPractical] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Load practicals and health statuses
  useEffect(() => {
    async function loadData() {
      try {
        const [pData, sData] = await Promise.all([
          getPracticals(),
          getStatuses()
        ]);
        if (Array.isArray(pData) && pData.length > 0) setPracticals(pData);
        if (sData) setStatuses(sData);
      } catch (err) {
        // Fallback to defaults
      }
    }
    loadData();

    // Auto-refresh poll every 8 seconds
    const interval = setInterval(async () => {
      try {
        const sData = await getStatuses();
        if (sData) setStatuses(sData);
      } catch (e) {}
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartService = async (serviceKey) => {
    try {
      const res = await startService(serviceKey);
      showToast(res.message || `Started ${serviceKey}`);
      const sData = await getStatuses();
      if (sData) setStatuses(sData);
    } catch (err) {
      showToast(`Failed: ${err.message}`);
    }
  };

  const handleStopService = async (serviceKey) => {
    try {
      const res = await stopService(serviceKey);
      showToast(res.message || `Stopped ${serviceKey}`);
      const sData = await getStatuses();
      if (sData) setStatuses(sData);
    } catch (err) {
      showToast(`Failed: ${err.message}`);
    }
  };

  const handleCopyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd)
      .then(() => showToast(`Copied command: ${cmd}`))
      .catch(() => showToast(`Command: ${cmd}`));
  };

  // Filtered practicals
  const filteredPracticals = useMemo(() => {
    return practicals.filter(p => {
      // Category filter
      let matchesFilter = true;
      if (currentFilter === 'frontend') matchesFilter = p.category.includes('Frontend');
      else if (currentFilter === 'fullstack') matchesFilter = p.category.includes('Full-Stack');
      else if (currentFilter === 'framework') matchesFilter = p.category.includes('Framework') || p.type === 'vite';

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.number.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech?.some(t => t.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [practicals, currentFilter, searchQuery]);

  const readyCount = useMemo(() => {
    return Object.values(statuses).filter(s => s.status?.startsWith('Ready')).length || practicals.length;
  }, [statuses, practicals]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'rgba(99, 102, 241, 0.95)', color: '#fff', padding: '12px 24px',
          borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600,
          animation: 'slideUp 0.3s ease'
        }}>
          <Check size={18} /> {toastMessage}
        </div>
      )}

      {/* Hero Header */}
      <header style={{
        maxWidth: '1360px', margin: '0 auto', padding: '48px 32px 32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', padding: '4px 12px', borderRadius: '999px',
                fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                <Sparkles size={14} /> 5th Semester • TSD Curriculum
              </span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)', color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '999px',
                fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                <Activity size={14} /> {readyCount} / {practicals.length} Services Ready
              </span>
            </div>

            <h1 style={{
              fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 12px'
            }}>
              Web Development Practicals Suite
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '720px', margin: 0, lineHeight: 1.6 }}>
              Centralized dashboard providing unified access, interactive React applications, live monitoring, and production Python Flask APIs for all 6 practical assignments.
            </p>
          </div>

          <div style={{
            background: 'rgba(18, 24, 38, 0.75)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px',
            padding: '18px 24px', display: 'flex', gap: '24px', alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Backend Engine</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <Server size={18} /> Python Flask 3.0
              </div>
            </div>
            <div style={{ height: '36px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Frontend Architecture</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <Zap size={18} /> React 19 + Vite
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Control Bar: Search & Category Filters */}
      <section style={{ maxWidth: '1360px', margin: '0 auto 36px', padding: '0 32px' }}>
        <div style={{
          background: 'rgba(18, 24, 38, 0.75)', backdropFilter: 'blur(16px)',
          borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px'
        }}>
          {/* Search Box */}
          <div style={{
            display: 'flex', alignItems: 'center', background: '#0f172a',
            borderRadius: '12px', padding: '10px 16px', minWidth: '320px', flex: 1,
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <Search size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
            <input 
              type="text"
              placeholder="Search practicals by title, technology (React, MySQL, CSS)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#fff', fontSize: '0.9rem', width: '100%'
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'transparent', color: '#94a3b8' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Practicals' },
              { id: 'frontend', label: 'Frontend Web' },
              { id: 'fullstack', label: 'Full-Stack Web' },
              { id: 'framework', label: 'Modern Framework' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setCurrentFilter(pill.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: currentFilter === pill.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255, 255, 255, 0.05)',
                  color: currentFilter === pill.id ? '#fff' : '#94a3b8',
                  border: currentFilter === pill.id ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: currentFilter === pill.id ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none'
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Practicals Cards Grid */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 32px' }}>
        {filteredPracticals.length === 0 ? (
          <div style={{
            background: 'rgba(18, 24, 38, 0.6)', borderRadius: '20px',
            border: '1px dashed rgba(255,255,255,0.1)', padding: '60px 24px',
            textAlign: 'center', color: '#94a3b8'
          }}>
            <Layers size={48} strokeWidth={1} style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>No practicals found</h3>
            <p>Try modifying your search keywords or filter category.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '28px'
          }}>
            {filteredPracticals.map(p => (
              <PracticalCard 
                key={p.id}
                practical={p}
                status={statuses[p.id]}
                onPreview={setPreviewPractical}
                onOpenReactView={onOpenPractical}
                onStartService={handleStartService}
                onStopService={handleStopService}
                onCopyCommand={handleCopyCommand}
              />
            ))}
          </div>
        )}
      </main>

      {/* Preview Modal */}
      <PreviewModal 
        practical={previewPractical}
        isOpen={Boolean(previewPractical)}
        onClose={() => setPreviewPractical(null)}
      />
    </div>
  );
}
