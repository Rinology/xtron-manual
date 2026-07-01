import React from 'react';
import { useGuides } from '../context/GuideContext';
import { ChevronLeft, Menu, Home } from 'lucide-react';

export default function Header({ activePage, setActivePage, isOpen, setIsOpen }) {
  const { allGuideItems } = useGuides();
  const guide = activePage ? allGuideItems.find(item => item.id === activePage) : null;
  const isWizard = activePage === 'troubleshooting-wizard';
  const showBreadcrumb = guide || isWizard;
  const titleText = isWizard ? '자가진단 마법사' : (guide ? guide.title : '');

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
        borderBottom: 'none', // 구분선을 없애 본문과 자연스럽게 이어지게 함
        transition: 'border-color var(--transition-normal)'
      }} className="app-header">
      <div className="header-inner">
        <div className="header-nav-container">
          {!isOpen && (
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(true)}
              title="메뉴 열기"
              style={{ 
                marginRight: '0.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '50%'
              }}
            >
              <img 
                src={`${import.meta.env.VITE_CDN_URL}/common/logos/X_logo_black_v2.webp`} 
                alt="Menu" 
                style={{ width: '24px', height: '24px', objectFit: 'contain' }}
              />
            </button>
          )}
          {showBreadcrumb && (
            <>
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
                 {titleText}
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
