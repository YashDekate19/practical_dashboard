import React, { useRef } from 'react';
import { X, RotateCw, ExternalLink, Globe } from 'lucide-react';

export default function PreviewModal({ practical, isOpen, onClose }) {
  const iframeRef = useRef(null);

  if (!isOpen || !practical) return null;

  const url = practical.previewUrl || practical.entryPath;

  const handleReload = () => {
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      iframeRef.current.src = src;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: '#0f172a',
        width: '100%',
        maxWidth: '1200px',
        height: '90vh',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Modal Top Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              {practical.number}
            </span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
              {practical.title}
            </h3>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#94a3b8',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              <Globe size={13} /> {url}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={handleReload}
              title="Reload frame"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <RotateCw size={14} /> Reload
            </button>

            <a 
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <ExternalLink size={14} /> Open in Tab
            </a>

            <button 
              onClick={onClose}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Embedded Iframe */}
        <div style={{ flex: 1, background: '#fff', position: 'relative' }}>
          <iframe 
            ref={iframeRef}
            src={url}
            title={practical.title}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
