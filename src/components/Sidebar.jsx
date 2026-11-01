import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuides } from '../context/GuideContext';
import { ChevronDown, ChevronRight, Search, MessageCircle, ShoppingBag, MapPin, Tag, Youtube, Sparkles, LayoutGrid, PanelLeftClose, HelpCircle } from 'lucide-react';

function SidebarTooltip({ text, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -5, y: '-50%' }}
          animate={{ opacity: 1, x: 0, y: '-50%' }}
          exit={{ opacity: 0, x: -5, y: '-50%' }}
          transition={{ duration: 0.15 }}
          className="gemini-tooltip"
        >
          <div className="gemini-tooltip-arrow" />
          <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Sidebar({ activePage, setActivePage, isOpen, setIsOpen, onOpenSearch }) {
  const { guidesData, wizardFlow, faqItems } = useGuides();
  const hasWizard = Boolean(
    wizardFlow &&
    wizardFlow.start &&
    wizardFlow.start.options &&
    wizardFlow.start.options.length > 0
  );
  const hasFaq = Boolean(faqItems && faqItems.length > 0);
  const isFaqActive = activePage === 'faq' || Boolean(activePage && faqItems && faqItems.some(f => f.id.toLowerCase() === activePage.toLowerCase()));
  const [openCategories, setOpenCategories] = useState({
    "basic": true,
    "battery-guide": true,
    "troubleshooting": true
  });
  const [openSubCategories, setOpenSubCategories] = useState({});
  const [openChildCategories, setOpenChildCategories] = useState({});
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  
  // 퀵링크 팝업 상태
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const quickLinksRef = useRef(null);
  
  // 툴팁 상태
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 사이드바 열림/닫힘 상태 변경 시 잔여 호버 툴팁 즉시 초기화
  useEffect(() => {
    setHoveredButton(null);
  }, [isOpen]);

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

  const toggleChildCategory = (id) => {
    setOpenChildCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderGuideItem = (item) => (
    <button 
      key={item.id}
      title={item.title}
      onClick={() => {
        setActivePage(item.id);
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (isMobile) setIsOpen(false);
      }}
      style={{
        display: 'flex', alignItems: 'center',
        gap: '0.75rem', padding: '0.6rem 0.75rem', 
        borderRadius: 'var(--radius-md)',
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

  const cdnUrl = import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr';

  return (
    <>
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90
          }}
        />
      )}

      <aside 
        style={{
          width: isMobile ? '300px' : (isOpen ? '300px' : '68px'),
          transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-300px)') : 'none',
          transition: 'width 0.28s cubic-bezier(0.2, 0, 0, 1), transform 0.28s cubic-bezier(0.2, 0, 0, 1)',
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
          zIndex: 100,
          cursor: (!isMobile && !isOpen) ? 'ew-resize' : 'default'
        }}
        onClick={() => {
          if (!isMobile && !isOpen) {
            setIsOpen(true);
          }
        }}
      >
        <div style={{ padding: '1rem 0 0.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, minHeight: 0, overflow: 'visible' }}>
          
          {/* Hamburger / Brand Area - 두 로고 이미지를 DOM에 상시 유지하여 열림/닫힘 시 이미지 재디코딩 깜빡임 방지 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isOpen ? 'space-between' : 'center', 
            height: '40px', 
            padding: '0 1rem',
            width: '100%',
            boxSizing: 'border-box',
            flexShrink: 0
          }}>
            <div style={{ display: isOpen ? 'flex' : 'none', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {/* Full Brand Logo */}
              <img 
                src={`${cdnUrl}/Common-logo/Xtron_x_Qualisports_Logo_Black.webp`} 
                alt="Qualisports Logo" 
                style={{ height: '20px', objectFit: 'contain', cursor: 'pointer' }} 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePage(null);
                  if (isMobile) setIsOpen(false);
                }}
              />
              {/* Sidebar Collapse/Close Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                style={{ 
                   background: 'transparent', border: 'none', cursor: 'pointer', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   color: 'var(--text-primary)', padding: '0.4rem', borderRadius: '50%',
                   transition: 'background 0.2s', flexShrink: 0
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <PanelLeftClose size={20} />
              </button>
            </div>

            {/* Sidebar Expand Button (X Logo) when collapsed */}
            <div style={{ position: 'relative', display: isOpen ? 'none' : 'block' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredButton(null);
                  setIsOpen(true);
                }}
                style={{ 
                   background: 'transparent', border: 'none', cursor: 'pointer', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   padding: '0.4rem', borderRadius: '50%',
                   transition: 'background 0.2s', flexShrink: 0
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--surface-border)';
                  setHoveredButton('expand');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  setHoveredButton(null);
                }}
              >
                <img 
                  src={`${cdnUrl}/Common-logo/X_logo_black_v2.webp`} 
                  alt="Menu" 
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                />
              </button>
              <SidebarTooltip text="사이드바 열기" visible={!isOpen && !activePage && hoveredButton === 'expand'} />
            </div>
          </div>

          {/* Top Actions: Wizard & Search */}
          <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', flexShrink: 0 }}>
            <div style={{ display: isOpen ? 'flex' : 'none', flexDirection: 'column', gap: '0.2rem' }}>
              {hasWizard && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePage('troubleshooting-wizard');
                    if (isMobile) setIsOpen(false);
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                    background: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary-light)' : 'transparent',
                    color: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary)' : 'var(--text-primary)',
                    fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                    transition: 'all 0.2s', marginBottom: '0.25rem', whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'var(--surface-border)';
                  }}
                  onMouseLeave={e => {
                    if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Sparkles size={18} color={activePage === 'troubleshooting-wizard' ? 'var(--ci-primary)' : 'var(--text-secondary)'} style={{ flexShrink: 0 }} />
                  <span><strong style={{ fontWeight: 700 }}><span style={{ color: 'var(--ci-secondary)' }}>X</span><span style={{ color: 'var(--ci-primary)' }}>enie</span></strong> (자가진단 마법사)</span>
                </button>
              )}
              {hasFaq && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePage('faq');
                    if (isMobile) setIsOpen(false);
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                    background: isFaqActive ? 'var(--ci-primary-light)' : 'transparent',
                    color: isFaqActive ? 'var(--ci-primary)' : 'var(--text-primary)',
                    fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                    transition: 'all 0.2s', marginBottom: '0.25rem', whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    if (!isFaqActive) e.currentTarget.style.background = 'var(--surface-border)';
                  }}
                  onMouseLeave={e => {
                    if (!isFaqActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <HelpCircle size={18} color={isFaqActive ? 'var(--ci-primary)' : 'var(--text-secondary)'} style={{ flexShrink: 0 }} />
                  <span>자주 묻는 질문 <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', opacity: 0.65, fontWeight: 400 }}>(FAQ)</span></span>
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSearch();
                }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.65rem 1rem', borderRadius: 'var(--radius-full)',
                  background: 'transparent', color: 'var(--text-primary)',
                  fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                  transition: 'background 0.2s', whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Search size={18} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                <span>검색 <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', opacity: 0.65, fontWeight: 400 }}>(Ctrl + K)</span></span>
              </button>
            </div>

            <div style={{ display: isOpen ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              {hasWizard && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredButton(null);
                      setActivePage('troubleshooting-wizard');
                      if (isMobile) setIsOpen(false);
                    }}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                      background: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary-light)' : 'transparent',
                      color: activePage === 'troubleshooting-wizard' ? 'var(--ci-primary)' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'var(--surface-border)';
                      setHoveredButton('wizard');
                    }}
                    onMouseLeave={e => {
                      if (activePage !== 'troubleshooting-wizard') e.currentTarget.style.background = 'transparent';
                      setHoveredButton(null);
                    }}
                  >
                    <Sparkles size={18} />
                  </button>
                  <SidebarTooltip text="Xenie (자가진단 마법사)" visible={!isOpen && hoveredButton === 'wizard'} />
                </div>
              )}

              {hasFaq && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredButton(null);
                      setActivePage('faq');
                      if (isMobile) setIsOpen(false);
                    }}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                      background: isFaqActive ? 'var(--ci-primary-light)' : 'transparent',
                      color: isFaqActive ? 'var(--ci-primary)' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      if (!isFaqActive) e.currentTarget.style.background = 'var(--surface-border)';
                      setHoveredButton('faq');
                    }}
                    onMouseLeave={e => {
                      if (!isFaqActive) e.currentTarget.style.background = 'transparent';
                      setHoveredButton(null);
                    }}
                  >
                    <HelpCircle size={18} />
                  </button>
                  <SidebarTooltip text="자주 묻는 질문 (FAQ)" visible={!isOpen && hoveredButton === 'faq'} />
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoveredButton(null);
                    onOpenSearch();
                  }}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                    background: 'transparent', color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--surface-border)';
                    setHoveredButton('search');
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    setHoveredButton(null);
                  }}
                >
                  <Search size={18} />
                </button>
                <SidebarTooltip text="검색 Ctrl + K" visible={!isOpen && hoveredButton === 'search'} />
              </div>
            </div>
          </div>

          {/* Navigation Categories - DOM 상시 유지하여 사이드바 열림 시 레이아웃 재계산/깜빡임 원천 차단 */}
          <nav className="custom-scrollbar" style={{ display: isOpen ? 'flex' : 'none', flexDirection: 'column', gap: '1.25rem', flex: 1, padding: '0 1rem', overflowY: 'auto', overflowX: 'hidden' }}>
            {guidesData.categories.map(category => {
              let displayItems = [];
              let displaySubCats = [];

              if (category.items) {
                displayItems = [...category.items];
              }

              if (category.subCategories) {
                displaySubCats = category.subCategories.map(sub => ({
                  ...sub,
                  items: sub.items ? [...sub.items] : [],
                  childCategories: sub.childCategories ? [...sub.childCategories] : []
                }));
              }

              const isOpened = openCategories[category.id];

              // 서브카테고리가 없고 직속 아이템이 딱 1개인 경우: 아코디언 폴더 대신 바로 클릭 가능한 본문 링크로 렌더링
              if (displaySubCats.length === 0 && displayItems.length === 1) {
                const item = displayItems[0];
                return (
                  <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button 
                      onClick={() => {
                        setActivePage(item.id);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        if (isMobile) setIsOpen(false);
                      }}
                      style={{ 
                         display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                         cursor: 'pointer', padding: '0.5rem',
                         background: activePage === item.id ? 'var(--ci-primary-light)' : 'transparent',
                         border: 'none', borderRadius: 'var(--radius-md)',
                         width: '100%', textAlign: 'left', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => {
                         if(activePage !== item.id) e.currentTarget.style.background = 'var(--surface-border)';
                      }}
                      onMouseLeave={e => {
                         if(activePage !== item.id) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <h3 style={{ fontSize: '0.8rem', color: activePage === item.id ? 'var(--ci-primary)' : 'var(--text-secondary)', margin: 0, fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
                        {category.title}
                      </h3>
                    </button>
                  </div>
                );
              }

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
                  
                  {isOpened && (
                    <div
                      style={{ 
                        overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.2rem',
                        marginLeft: '0.85rem', paddingLeft: '0.85rem', borderLeft: '1px solid #dde3ea'
                      }}
                    >
                      {displayItems.map(item => renderGuideItem(item))}

                      {displaySubCats.map(subCat => {
                        const isSubOpened = openSubCategories[subCat.id];
                        return (
                          <div key={subCat.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', marginTop: '0.25rem' }}>
                            <div 
                              onClick={() => toggleSubCategory(subCat.id)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.6rem 0.5rem', cursor: 'pointer',
                                borderRadius: 'var(--radius-md)', transition: 'background 0.2s'
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              {isSubOpened ? <ChevronDown size={14} color="var(--ci-primary)" /> : <ChevronRight size={14} color="var(--text-secondary)" />}
                              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isSubOpened ? 'var(--ci-primary)' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                {subCat.title}
                              </span>
                            </div>
                            
                            {isSubOpened && (
                              <div
                                style={{ 
                                  overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.1rem',
                                  marginLeft: '0.85rem', paddingLeft: '0.85rem', borderLeft: '1px solid #dde3ea'
                                }}
                              >
                                {subCat.childCategories && subCat.childCategories.map(childCat => {
                                  const isChildOpened = openChildCategories[childCat.id];
                                  return (
                                    <div key={childCat.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                                      <div 
                                        onClick={() => toggleChildCategory(childCat.id)}
                                        style={{
                                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                                          padding: '0.6rem 0.5rem', cursor: 'pointer',
                                          borderRadius: 'var(--radius-md)', transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-border)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                      >
                                        {isChildOpened ? <ChevronDown size={14} color="var(--ci-primary)" /> : <ChevronRight size={14} color="var(--text-secondary)" />}
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isChildOpened ? 'var(--ci-primary)' : 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                          {childCat.title}
                                        </span>
                                      </div>
                                      
                                      {isChildOpened && (
                                        <div
                                          style={{ 
                                            overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.1rem',
                                            marginLeft: '0.85rem', paddingLeft: '0.85rem', borderLeft: '1px solid #dde3ea'
                                          }}
                                        >
                                          {childCat.items.map(item => renderGuideItem(item))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                {subCat.items && subCat.items.map(item => renderGuideItem(item))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Quick Links (Gemini Profile/Settings Icon Popup Style) */}
        <div style={{ position: 'relative', padding: '1rem', display: 'flex', justifyContent: isOpen ? 'flex-start' : 'center' }} ref={quickLinksRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHoveredButton(null);
              setIsQuickLinksOpen(!isQuickLinksOpen);
            }}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: isQuickLinksOpen ? 'var(--surface-border)' : 'transparent',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', transition: 'background 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--surface-border)';
              if (!isOpen) setHoveredButton('quicklinks');
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isQuickLinksOpen ? 'var(--surface-border)' : 'transparent';
              setHoveredButton(null);
            }}
          >
            <LayoutGrid size={22} />
          </button>
          {!isOpen && <SidebarTooltip text="QUICK LINKS" visible={hoveredButton === 'quicklinks'} />}

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
                <PopupLinkButton icon={<MessageCircle size={16} color="#eab308" />} text="카카오톡 채널 상담하기" url="https://pf.kakao.com/_xhxhRZxl/chat" />
                <PopupLinkButton icon={<ShoppingBag size={16} color="#03C75A" />} text="브랜드스토어" url="https://brand.naver.com/qualisports" />
                <PopupLinkButton icon={<MapPin size={16} color="var(--ci-primary)" />} text="전국 대리점안내" url="https://xtronmap.kr" />
                <PopupLinkButton icon={<Tag size={16} color="var(--ci-primary)" />} text="제품등록센터" url="https://xtroncare.kr" />
                <PopupLinkButton icon={<Youtube size={16} color="#dc2626" />} text="엑스트론 공식 유튜브" url="https://www.youtube.com/@xtron.official" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </aside>
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

export default React.memo(Sidebar);
