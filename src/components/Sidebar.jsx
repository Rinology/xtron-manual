import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuides } from '../context/GuideContext';
import { ChevronDown, ChevronRight, Search, Menu, MessageCircle, ShoppingBag, MapPin, Tag, Youtube, Sparkles, Settings } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen, onOpenSearch }) {
  const { guidesData } = useGuides();
  const [openCategories, setOpenCategories] = useState({
    "basic": true,
    "battery-guide": true,
    "troubleshooting": true
  });
  const [openSubCategories, setOpenSubCategories] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  
  // 퀵링크 팝업 상태
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const quickLinksRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 외부 클릭 시 퀵링크 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickLinksRef.current && !quickLinksRef.current.contains(event.target)) {
        setIsQuickLinksOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (id) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubCategory = (id) => {
    setOpenSubCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderGuideItem = (item, level = 0) => (
    <button 
      key={item.id}
      onClick={() => {
        setActivePage(item.id);
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (isMobile) setIsOpen(false);
      }}
      style={{
        display: 'flex', alignItems: 'center',
        gap: '0.75rem', padding: '0.65rem 1rem', 
        paddingLeft: `${1 + (level * 0.5)}rem`,
        borderRadius: 'var(--radius-full)',
        color: activePage === item.id ? 'var(--ci-primary)' : 'var(--text-primary)',
        background: activePage === item.id ? 'var(--ci-primary-light)' : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left', 
        width: '100%', fontFamily: 'inherit', fontSize: '0.9rem',
        whiteSpace: 'nowrap', transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
         if(activePage !== item.id) e.currentTarget.style.background = 'var(--surface-border)';
      }}
      onMouseLeave={e => {
         if(activePage !== item.id) e.currentTarget.style.background = 'transparent';
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</span>
    </button>
  );

  return (
    <>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90
            }}
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={
          isMobile 
            ? { width: 300, x: isOpen ? 0 : -300 }
            : { width: isOpen ? 300 : 68, x: 0 }
        }
        transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
        style={{
          height: '100dvh',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          background: 'var(--bg-color)', // Gemini 스타일: 배경색으로만 구분
          borderRight: 'none', // 선 제거
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible', // 팝업 메뉴를 위해 visible 유지
          flexShrink: 0,
          zIndex: 100
        }}
      >
        <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          
          {/* Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 1rem' }}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{ 
                 background: 'transparent', border: 'none', cursor: 'pointer', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: 'var(--text-primary)', padding: '0.4rem', borderRadius: '50%',
                 transition: 'background 0.2s', flexShrink: 0
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Top Actions: Wizard & Search */}
          <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {isOpen ? (
              <>
                <button
                  onClick={() => {
                    setActivePage('troubleshooting-wizard');
                    if (isMobile) setIsOpen(false);
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                    background: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary-light)' : 'transparent',
                    color: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary)' : 'var(--text-primary)',
                    fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                    transition: 'all 0.2s', marginBottom: '0.25rem'
                  }}
                  onMouseEnter={e => {
                    if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'var(--surface-border)';
                  }}
                  onMouseLeave={e => {
                    if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Sparkles size={18} color={activePage === 'troubleshooting-wizard' ? 'var(--ci-primary)' : 'var(--text-secondary)'} />
                  자가진단 마법사
                </button>
                <button
                  onClick={onOpenSearch}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                    background: 'transparent', color: 'var(--text-primary)',
                    fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Search size={18} color="var(--text-secondary)" />
                  가이드 검색
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => {
                    setActivePage('troubleshooting-wizard');
                    if (isMobile) setIsOpen(false);
                  }}
                  title="자가진단 마법사"
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                    background: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary-light)' : 'transparent',
                    color: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary)' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'var(--surface-border)';
                  }}
                  onMouseLeave={e => {
                    if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Sparkles size={18} />
                </button>
                <button 
                  onClick={onOpenSearch}
                  title="통합 검색"
                  style={{
                     width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                     background: 'transparent', color: 'var(--text-secondary)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                     e.currentTarget.style.background = 'var(--surface-border)';
                  }}
                  onMouseLeave={e => {
                     e.currentTarget.style.background = 'transparent';
                  }}
                >
                   <Search size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Categories */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: isOpen ? '1rem' : '0.5rem', flex: 1, padding: '0 1rem', overflowX: 'hidden' }}>
            <AnimatePresence mode="popLayout">
              {isOpen && (
                <motion.div
                  key="nav-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  {guidesData.categories.map(category => {
                    let displayItems = [];
                    let displaySubCats = [];

                    if (category.items) {
                      displayItems = [...category.items];
                    }

                    if (category.subCategories) {
                      displaySubCats = category.subCategories.map(sub => ({
                        ...sub,
                        items: [...sub.items]
                      }));
                    }

                    const isOpened = openCategories[category.id];

                    return (
                      <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div 
                          onClick={() => toggleCategory(category.id)} 
                          style={{ 
                             display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                             cursor: 'pointer', padding: '0.5rem'
                          }}
                        >
                          <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
                            {category.title}
                          </h3>
                          {isOpened ? <ChevronDown size={14} color="var(--text-secondary)" /> : <ChevronRight size={14} color="var(--text-secondary)" />}
                        </div>
                        
                        <AnimatePresence initial={false}>
                          {isOpened && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}
                            >
                              {displayItems.map(item => renderGuideItem(item, 1))}

                              {displaySubCats.map(subCat => {
                                const isSubOpened = openSubCategories[subCat.id];
                                return (
                                  <div key={subCat.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', marginTop: '0.25rem' }}>
                                    <div 
                                      onClick={() => toggleSubCategory(subCat.id)}
                                      style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.6rem 0.5rem 0.6rem 1.25rem', cursor: 'pointer',
                                        borderRadius: 'var(--radius-md)', transition: 'background 0.2s'
                                      }}
                                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
                                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                      {isSubOpened ? <ChevronDown size={14} color="var(--ci-primary)" /> : <ChevronRight size={14} color="var(--text-secondary)" />}
                                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isSubOpened ? 'var(--ci-primary)' : 'var(--text-primary)' }}>
                                        {subCat.title}
                                      </span>
                                    </div>
                                    
                                    <AnimatePresence initial={false}>
                                      {isSubOpened && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.2 }}
                                          style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}
                                        >
                                          {subCat.items.map(item => renderGuideItem(item, 2))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>

        {/* Footer Quick Links (Gemini Profile/Settings Icon Popup Style) */}
        <div style={{ position: 'relative', padding: '1rem', display: 'flex', justifyContent: isOpen ? 'flex-start' : 'center' }} ref={quickLinksRef}>
          <button
            onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: isQuickLinksOpen ? 'var(--surface-border)' : 'transparent',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
            onMouseLeave={e => e.currentTarget.style.background = isQuickLinksOpen ? 'var(--surface-border)' : 'transparent'}
            title="QUICK LINKS"
          >
            <Settings size={22} />
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
                  bottom: 'calc(100% + 10px)',
                  left: isOpen ? '1rem' : '10px',
                  background: 'var(--ci-white)',
                  padding: '0.5rem',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex', flexDirection: 'column', gap: '0.2rem',
                  width: '260px',
                  zIndex: 1000,
                  border: '1px solid var(--surface-border)'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 1rem', fontWeight: 600 }}>QUICK LINKS</span>
                <PopupLinkButton icon={<MessageCircle size={16} color="#eab308" />} text="카카오톡 채널 상담하기" url="https://pf.kakao.com/_xhxhRZxl" />
                <PopupLinkButton icon={<ShoppingBag size={16} color="#03C75A" />} text="브랜드스토어" url="https://brand.naver.com/qualisports" />
                <PopupLinkButton icon={<MapPin size={16} color="var(--ci-primary)" />} text="전국 대리점안내" url="https://xtronmap.kr" />
                <PopupLinkButton icon={<Tag size={16} color="var(--ci-primary)" />} text="제품등록센터" url="https://xtroncare.kr" />
                <PopupLinkButton icon={<Youtube size={16} color="#dc2626" />} text="엑스트론 공식 유튜브" url="https://www.youtube.com/@xtron.official" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.aside>
    </>
  );
}

function PopupLinkButton({ icon, text, url }) {
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
