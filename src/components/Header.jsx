import React from 'react';
import { allGuideItems } from '../data/guides';
import { ChevronLeft } from 'lucide-react';

export default function Header({ activePage, setActivePage }) {
  const guide = activePage ? allGuideItems.find(item => item.id === activePage) : null;

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 50,
      minHeight: '64px',
      borderBottom: guide ? '1px solid rgba(226, 232, 240, 0.5)' : '1px solid transparent',
      transition: 'border-color var(--transition-normal)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <img 
          src={`${import.meta.env.BASE_URL}images/Xtron_x_Qualisports_Logo_Black.png`} 
          alt="Qualisports Logo" 
          style={{ height: '26px', objectFit: 'contain', cursor: 'pointer' }} 
          onClick={() => setActivePage(null)} 
        />
        
        {guide && (
           <button 
             onClick={() => setActivePage(null)}
             title="목록으로 가기"
             style={{
               display: 'inline-flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '0.25rem',
               background: 'var(--ci-white)',
               border: '1px solid var(--surface-border)',
               color: 'var(--text-secondary)',
               cursor: 'pointer',
               padding: '0.4rem 0.75rem 0.4rem 0.5rem',
               borderRadius: 'var(--radius-full)',
               fontSize: '0.9rem',
               fontWeight: 600,
               boxShadow: 'var(--shadow-sm)',
               transition: 'all 0.2s',
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
             <ChevronLeft size={16} /> 목록으로 가기
           </button>
        )}
        
        {guide && (
          <div style={{
            color: 'var(--text-primary)',
            fontSize: '1.15rem',
            fontWeight: 500,
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
        )}
      </div>
    </header>
  );
}
