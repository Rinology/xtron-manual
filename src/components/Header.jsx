import React, { useState, useRef, useEffect } from 'react';
import { useGuides } from '../context/GuideContext';
import { ChevronLeft, Menu, Home, LayoutGrid, MessageCircle, ShoppingBag, MapPin, Tag, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ activePage, setActivePage, isOpen, setIsOpen }) {
  const { allGuideItems, faqItems } = useGuides();
  const guide = activePage ? allGuideItems.find(item => item.id === activePage) : null;
  const isWizard = activePage === 'troubleshooting-wizard';
  const isFaq = activePage === 'faq' || Boolean(activePage && faqItems && faqItems.some(f => f.id.toLowerCase() === activePage.toLowerCase()));
  const showBreadcrumb = guide || isWizard || isFaq;
  const titleText = isWizard ? 'Xenie (자가진단 마법사)' : isFaq ? '자주 묻는 질문' : (guide ? guide.title : '');

  // 툴팁 상태 관리 (홈 버튼, 퀵메뉴 버튼)
  const [hoveredButton, setHoveredButton] = useState(null);

  // 우측 상단 퀵링크 팝업 상태
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const quickLinksRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickLinksRef.current && !quickLinksRef.current.contains(event.target)) {
        setIsQuickLinksOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      borderBottom: 'none',
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
                src={`${import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr'}/Common-logo/X_logo_black_v2.webp`} 
                alt="Menu" 
                style={{ width: '24px', height: '24px', objectFit: 'contain' }}
              />
            </button>
          )}
          {showBreadcrumb && (
            <>
              {/* 처음으로 아이콘 버튼 및 사이드바 일관 다크 플로팅 툴팁 */}
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <button 
                  onClick={() => setActivePage(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                     e.currentTarget.style.background = 'var(--surface-border)';
                     e.currentTarget.style.color = 'var(--ci-primary)';
                     setHoveredButton('home');
                  }}
                  onMouseLeave={e => {
                     e.currentTarget.style.background = 'transparent';
                     e.currentTarget.style.color = 'var(--text-secondary)';
                     setHoveredButton(null);
                  }}
                >
                  <Home size={19} />
                </button>

                {/* 사이드바와 동일한 형태의 툴팁 */}
                <HeaderTooltip text="처음으로" visible={hoveredButton === 'home'} position="bottom" />
              </div>

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

        {/* 우측 상단 퀵링크 버튼 (PC / 모바일 공통 접근성 강화) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={quickLinksRef}>
          <button
            onClick={() => {
              setIsQuickLinksOpen(!isQuickLinksOpen);
              setHoveredButton(null);
            }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: isQuickLinksOpen ? 'var(--surface-border)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--surface-border)';
              if (!isQuickLinksOpen) setHoveredButton('quicklinks');
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isQuickLinksOpen ? 'var(--surface-border)' : 'transparent';
              setHoveredButton(null);
            }}
          >
            <LayoutGrid size={19} />
          </button>

          {/* 퀵링크 버튼 호버 시 표시되는 사이드바 스타일 툴팁 */}
          <HeaderTooltip text="QUICK LINKS" visible={!isQuickLinksOpen && hoveredButton === 'quicklinks'} position="bottom-right" />

          <AnimatePresence>
            {isQuickLinksOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: 0,
                  background: 'var(--ci-white)',
                  padding: '0.5rem',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  width: '260px',
                  zIndex: 1000,
                  border: '1px solid var(--surface-border)'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 1rem', fontWeight: 600 }}>QUICK LINKS</span>
                <HeaderLinkButton icon={<MessageCircle size={16} color="#eab308" />} text="카카오톡 채널 상담하기" url="https://pf.kakao.com/_xhxhRZxl/chat" />
                <HeaderLinkButton icon={<ShoppingBag size={16} color="#03C75A" />} text="브랜드스토어" url="https://brand.naver.com/qualisports" />
                <HeaderLinkButton icon={<MapPin size={16} color="var(--ci-primary)" />} text="전국 대리점안내" url="https://xtronmap.kr" />
                <HeaderLinkButton icon={<Tag size={16} color="var(--ci-primary)" />} text="제품등록센터" url="https://xtroncare.kr" />
                <HeaderLinkButton icon={<Youtube size={16} color="#dc2626" />} text="엑스트론 공식 유튜브" url="https://www.youtube.com/@xtron.official" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}

// 사이드바 gemini-tooltip과 동일한 디자인의 헤더 전용 툴팁 컴포넌트
function HeaderTooltip({ text, visible, position = 'bottom' }) {
  const isRightAligned = position === 'bottom-right';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4, x: isRightAligned ? 0 : '-50%' }}
          animate={{ opacity: 1, y: 0, x: isRightAligned ? 0 : '-50%' }}
          exit={{ opacity: 0, y: -4, x: isRightAligned ? 0 : '-50%' }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: isRightAligned ? 'auto' : '50%',
            right: isRightAligned ? 0 : 'auto',
            transform: isRightAligned ? 'none' : 'translateX(-50%)',
            background: '#1f2937',
            color: '#ffffff',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md, 12px)',
            fontSize: '0.8rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))'
          }}
        >
          {/* 화살표 핀 */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              left: isRightAligned ? 'auto' : '50%',
              right: isRightAligned ? '12px' : 'auto',
              marginLeft: isRightAligned ? 0 : '-4px',
              width: '10px',
              height: '10px',
              background: 'inherit',
              transform: 'rotate(45deg)',
              borderRadius: '1px'
            }}
          />
          <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeaderLinkButton({ icon, text, url }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noreferrer" 
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.75rem 1rem', borderRadius: '12px',
        background: 'transparent', color: 'var(--text-primary)',
        textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
        transition: 'background 0.2s'
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}
