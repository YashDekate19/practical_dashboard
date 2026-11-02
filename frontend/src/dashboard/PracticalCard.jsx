import React from 'react';
import { 
  Play, 
  Square, 
  Copy, 
  ExternalLink, 
  Eye, 
  Database, 
  Terminal, 
  Cpu,
  Layers
} from 'lucide-react';

export default function PracticalCard({ 
  practical, 
  status, 
  onPreview, 
  onOpenReactView,
  onStartService, 
  onStopService, 
  onCopyCommand 
}) {
  const currentStatus = status || {
    status: 'Ready',
    badgeClass: 'badge-ready',
    details: 'Verified and active'
  };

  const isLive = currentStatus.isLive !== false;
  const isServiceRunning = currentStatus.status === 'Ready';

  return (
    <div style={{
      background: 'rgba(18, 24, 38, 0.75)',
      backdropFilter: 'blur(16px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
      transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
      position: 'relative'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(99, 102, 241, 0.15)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.35)';
    }}
    >
      {/* Top Header: Number, Category, and Live Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#818cf8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {practical.number}
          </span>
          <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
            {practical.category}
          </span>
        </div>

        {/* Dynamic Status Badge */}
        <div className={`badge-status ${currentStatus.badgeClass || 'badge-ready'}`}>
          <span className="pulse-dot" />
          <span>{currentStatus.status}</span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
        {practical.title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600, marginBottom: '14px' }}>
        {practical.subtitle}
      </p>

      {/* Tech Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {practical.tech?.map((tech, idx) => (
          <span key={idx} style={{
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#a5b4fc',
            padding: '3px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
        {practical.description}
      </p>

      {/* Requirements Box */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '12px',
        padding: '14px 16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        marginBottom: '22px',
        fontSize: '0.8rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
          <Database size={14} color="#f59e0b" />
          <span style={{ color: '#94a3b8' }}>Database:</span>
          <span style={{ fontWeight: 600 }}>{practical.requirements?.db || 'None'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
          <Cpu size={14} color="#06b6d4" />
          <span style={{ color: '#94a3b8' }}>Runtime:</span>
          <span style={{ fontWeight: 600 }}>{practical.port}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
          <Terminal size={14} color="#a855f7" />
          <span style={{ color: '#94a3b8' }}>Status:</span>
          <span style={{ color: '#34d399', fontWeight: 600 }}>{currentStatus.details}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Open Native React View on Separate Route */}
          <a 
            href={`/${practical.id}`}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1.2,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
            }}
          >
            <Layers size={16} /> Open React App
          </a>

          {/* Preview Modal Button */}
          <button 
            onClick={() => onPreview(practical)}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <Eye size={16} /> Preview Modal
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Service Toggle if applicable */}
          {practical.serviceKey && (
            <button 
              onClick={() => isServiceRunning ? onStopService(practical.serviceKey) : onStartService(practical.serviceKey)}
              style={{
                flex: 1,
                background: isServiceRunning ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                color: isServiceRunning ? '#fb7185' : '#34d399',
                border: `1px solid ${isServiceRunning ? 'rgba(244, 63, 94, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {isServiceRunning ? <Square size={14} /> : <Play size={14} />}
              <span>{isServiceRunning ? 'Stop Service' : 'Start Service'}</span>
            </button>
          )}

          {/* Copy Command */}
          <button 
            onClick={() => onCopyCommand(practical.command)}
            title="Copy startup command"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#cbd5e1',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Copy size={14} /> Command
          </button>

          {/* External Link */}
          <a 
            href={practical.externalUrl || practical.entryPath} 
            target="_blank" 
            rel="noreferrer"
            title="Open in new window"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#cbd5e1',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
