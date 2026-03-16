import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { guidesData, allGuideItems } from '../data/guides';
import { ChevronDown, ChevronRight, Search, Menu, MessageCircle, ShoppingBag, MapPin, Tag, Plus, Youtube } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen, onOpenSearch }) {
  const [openCategories, setOpenCategories] = useState({
    "basic": true,
    "battery-guide": true,
    "troubleshooting": true
  });
  const [openSubCategories, setOpenSubCategories] = useState({}); // 중분류 상태 추가
  const [isMobile, setIsMobile] = useState(false);
  const [isExternalOpen, setIsExternalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCategory = (id) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubCategory = (id) => {
    setOpenSubCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to render guide buttons
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
        paddingLeft: `${1 + (level * 0.5)}rem`, // 단계별 인덴트
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
      <span style={{ color: activePage === item.id ? 'var(--ci-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {item.icon}
      </span>
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
            : { width: isOpen ? 320 : 68, x: 0 }
        }
        transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
        style={{
          height: '100dvh',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          background: 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRight: '1px solid rgba(226, 232, 240, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        zIndex: 100
      }}
    >
      <div style={{ position: 'relative', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>
        
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

        {/* Sidebar Search or Search icon when closed */}
        <div style={{ padding: '0 1rem', display: 'flex', justifyContent: 'center' }}>
           {isOpen ? (
              <div 
                onClick={onOpenSearch}
                style={{ position: 'relative', width: '100%', cursor: 'pointer' }}
                title="통합 검색 열기 (Ctrl + K)"
              >
                <Search size={16} color="var(--ci-primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <div 
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--surface-border)',
                    background: 'var(--ci-white)',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ci-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--surface-border)'}
                >
                  <span>가이드 검색</span>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    <kbd style={{ fontSize: '0.7rem', padding: '0.1rem 0.3rem', background: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '4px', fontFamily: 'inherit' }}>Ctrl</kbd>
                    <kbd style={{ fontSize: '0.7rem', padding: '0.1rem 0.3rem', background: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '4px', fontFamily: 'inherit' }}>K</kbd>
                  </div>
                </div>
              </div>
           ) : (
              <button 
                onClick={onOpenSearch}
                title="통합 검색 (Ctrl + K)"
                style={{
                   width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                   background: 'var(--ci-white)', color: 'var(--text-secondary)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   cursor: 'pointer', margin: '0 auto', boxShadow: 'var(--shadow-sm)',
                   transition: 'all 0.2s'
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
                 <Search size={20} />
              </button>
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
                      {/* Level 1: Category Header */}
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
                            {/* Render Direct Items (Level 2 items if no middle subcategory) */}
                            {displayItems.map(item => renderGuideItem(item, 1))}

                            {/* Render SubCategories (Level 2 headers) */}
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
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-color)'}
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
                                        {/* Render Level 3 Items */}
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
        
        {/* Glossy Fade Effect at Bottom of Scroll Area */}
        <div style={{
           position: 'absolute',
           bottom: '0',
           left: 0,
           right: 0,
           height: '40px',
           background: 'linear-gradient(to top, rgba(248, 250, 252, 1) 0%, rgba(248, 250, 252, 0) 100%)',
           pointerEvents: 'none',
           zIndex: 10
        }} />
      </div>

      {/* Footer External Links in Sidebar (Pinned) */}
      <div style={{ 
         padding: isOpen ? '1rem 1.5rem' : '1rem 0', 
         display: 'flex', 
         flexDirection: 'column', 
         gap: '0.25rem', 
         width: isMobile ? '100%' : (isOpen ? '320px' : '68px'),
         background: 'transparent',
         borderTop: '1px solid rgba(226, 232, 240, 0.6)',
         paddingBottom: '1.5rem',
         transition: 'width 0.35s cubic-bezier(0.2, 0, 0, 1)'
      }}>
        {isOpen && (
          <div 
            onClick={() => setIsExternalOpen(!isExternalOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '0.5rem 0.5rem 0.5rem 1rem', 
              cursor: 'pointer',
              marginBottom: '0.25rem'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.02em' }}>
              QUICK LINKS
            </span>
            {isExternalOpen ? <ChevronDown size={14} color="var(--text-secondary)" /> : <ChevronRight size={14} color="var(--text-secondary)" />}
          </div>
        )}

        <AnimatePresence>
          {(!isOpen || isExternalOpen) && (
            <motion.div
              initial={isOpen ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}
            >
              <motion.div initial={isOpen ? { x: -30, opacity: 0 } : false} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.05 }} style={{ width: '100%' }}>
                <ExternalLinkButton isOpen={isOpen} icon={<MessageCircle size={18} color="#eab308" />} text="카카오톡 채널 상담하기" url="https://pf.kakao.com/_xhxhRZxl" />
              </motion.div>
              <motion.div initial={isOpen ? { x: -30, opacity: 0 } : false} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }} style={{ width: '100%' }}>
                <ExternalLinkButton isOpen={isOpen} icon={<ShoppingBag size={18} color="#03C75A" />} text="브랜드스토어" url="https://brand.naver.com/qualisports" />
              </motion.div>
              <motion.div initial={isOpen ? { x: -30, opacity: 0 } : false} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }} style={{ width: '100%' }}>
                <ExternalLinkButton isOpen={isOpen} icon={<MapPin size={18} color="var(--ci-primary)" />} text="전국 대리점안내" url="https://xtronmap.kr" />
              </motion.div>
              <motion.div initial={isOpen ? { x: -30, opacity: 0 } : false} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }} style={{ width: '100%' }}>
                <ExternalLinkButton isOpen={isOpen} icon={<Tag size={18} color="var(--ci-primary)" />} text="제품등록센터" url="https://xtroncare.kr" />
              </motion.div>
              <motion.div initial={isOpen ? { x: -30, opacity: 0 } : false} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.25 }} style={{ width: '100%' }}>
                <ExternalLinkButton isOpen={isOpen} icon={<Youtube size={18} color="#dc2626" />} text="엑스트론 공식 유튜브" url="https://www.youtube.com/@xtron.official" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>

    </>
  );
}

function ExternalLinkButton({ isOpen, icon, text, url }) {
   return (
      <a 
         href={url} 
         target="_blank" 
         rel="noreferrer" 
         title={!isOpen ? text : ''}
         className="external-link-btn"
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: isOpen ? '0.75rem' : '0',
            padding: isOpen ? '0.75rem 1rem' : '0',
            width: isOpen ? '100%' : '40px',
            height: isOpen ? 'auto' : '40px',
            borderRadius: isOpen ? 'var(--radius-md)' : '50%',
            background: 'transparent',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'all 0.2s',
            flexShrink: 0
         }}
         onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--surface-border)';
         }}
         onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
         }}
      >
         <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
         </span>
         {isOpen && <span style={{ whiteSpace: 'nowrap' }}>{text}</span>}
      </a>
   );
}
