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

        {/* 우측 상단 퀵링크 버튼 (PC / 모바일 공통 접근성 강화) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={quickLinksRef}>
          <button
            onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
            title="퀵메뉴 (주요 서비스 바로가기)"
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
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-border)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isQuickLinksOpen ? 'var(--surface-border)' : 'transparent'; }}
          >
            <LayoutGrid size={19} />
          </button>

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
