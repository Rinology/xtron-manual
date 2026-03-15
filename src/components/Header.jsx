import React from 'react';
import { allGuideItems } from '../data/guides';
import { ChevronLeft, Menu, Home } from 'lucide-react';

export default function Header({ activePage, setActivePage, isOpen, setIsOpen }) {
  const guide = activePage ? allGuideItems.find(item => item.id === activePage) : null;

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 50,
      minHeight: '64px',
      borderBottom: guide ? '1px solid rgba(226, 232, 240, 0.5)' : '1px solid transparent',
      transition: 'border-color var(--transition-normal)'
    }} className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
        {!isOpen && (
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(true)}
            title="메뉴 열기"
            style={{ marginRight: '0.25rem' }}
          >
            <Menu size={24} />
          </button>
        )}
        {guide && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
            <button 
              onClick={() => setActivePage(null)}
              title="처음으로"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                background: 'var(--ci-white)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.4rem 0.85rem 0.4rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={e => {
                 e.currentTarget.style.background = 'var(--bg-color)';
                 e.currentTarget.style.color = 'var(--ci-primary)';
              }}
              onMouseLeave={e => {
                 e.currentTarget.style.background = 'var(--ci-white)';
                 e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <Home size={16} /> 처음으로
            </button>
            <div className="header-guide-title" style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
               <span style={{ color: 'var(--surface-border)', fontSize: '1.2rem', fontWeight: 300 }}>{'|'}</span>
               {guide.title}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', paddingRight: '0.5rem' }}>
          <img 
            src={`${import.meta.env.BASE_URL}images/Xtron_x_Qualisports_Logo_Black.png`} 
            alt="Qualisports Logo" 
            style={{ height: 'clamp(16px, 4.5vw, 24px)', objectFit: 'contain', cursor: 'pointer' }} 
            onClick={() => setActivePage(null)} 
          />
        </div>
      </div>
    </header>
  );
}
