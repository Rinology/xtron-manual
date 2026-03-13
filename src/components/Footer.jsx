import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      setIsAtBottom(e.detail.isAtBottom);
    };

    window.addEventListener('main-scroll', handleScroll);
    return () => window.removeEventListener('main-scroll', handleScroll);
  }, []);

  return (
    <footer style={{
      padding: '1rem 2rem',
      textAlign: 'center',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
      background: isAtBottom ? 'var(--bg-color)' : 'linear-gradient(to bottom, transparent, var(--bg-color) 40%)',
      backdropFilter: isAtBottom ? 'none' : 'blur(8px)',
      borderTop: isAtBottom ? '1px solid var(--surface-border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      marginTop: '-60px', // Pull it up over the scrolling content
      pointerEvents: 'none' // Let clicks pass through if it's just fading
    }}>
      <div style={{ pointerEvents: 'auto' }}>
        <p style={{ marginBottom: '0.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>© 2026 XTRON. All rights reserved.</p>
        <p style={{ opacity: 0.8 }}>본 설명서는 엑스트론 전기자전거 공식 고객 지원용으로 가장 최신의 정보를 제공합니다.</p>
      </div>
    </footer>
  );
}
