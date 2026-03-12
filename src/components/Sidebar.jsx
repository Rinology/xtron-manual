import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { guidesData, allGuideItems } from '../data/guides';
import { ChevronDown, ChevronRight, Search, Menu, MessageCircle, ShoppingBag, MapPin, Tag, Plus } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const [openCategories, setOpenCategories] = useState({
    "basic": true,
    "battery-guide": true,
    "troubleshooting": true
  });
  const [localSearch, setLocalSearch] = useState('');

  const toggleCategory = (id) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 320 : 68 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: 'var(--bg-color)',
        borderRight: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        zIndex: 100
      }}
    >
      <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>
        
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
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} color="var(--ci-primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text"
                  placeholder="메뉴 빠른 검색..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--surface-border)',
                    background: 'var(--ci-white)',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
              </div>
           ) : (
              <button 
                onClick={() => { setActivePage(null); }}
                title="검색"
                style={{
                   width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                   background: 'var(--ci-white)', color: 'var(--text-secondary)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   cursor: 'pointer', margin: '0 auto', boxShadow: 'var(--shadow-sm)'
                }}
              >
                 <Search size={20} />
              </button>
           )}
        </div>

        {/* Navigation Categories */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: isOpen ? '1.5rem' : '0.5rem', flex: 1, padding: '0 1rem' }}>
          {isOpen && guidesData.categories.map(category => {
            const filteredItems = category.items.filter(item => item.title.includes(localSearch));
            if (localSearch && filteredItems.length === 0) return null;

            return (
              <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div 
                  onClick={() => toggleCategory(category.id)} 
                  style={{ 
                     display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                     cursor: 'pointer', padding: '0.5rem'
                  }}
                >
                  <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {category.title}
                  </h3>
                  {openCategories[category.id] || localSearch ? <ChevronDown size={16} color="var(--text-secondary)" /> : <ChevronRight size={16} color="var(--text-secondary)" />}
                </div>
                
                <AnimatePresence>
                  {(openCategories[category.id] || localSearch) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}
                    >
                      {(localSearch ? filteredItems : category.items).map(item => (
                        <button 
                          key={item.id}
                          onClick={() => setActivePage(item.id)}
                          style={{
                            display: 'flex', alignItems: 'center',
                            gap: '0.75rem', padding: '0.75rem 1rem', 
                            borderRadius: 'var(--radius-full)',
                            color: activePage === item.id ? 'var(--ci-primary)' : 'var(--text-primary)',
                            background: activePage === item.id ? 'var(--ci-primary-light)' : 'transparent',
                            border: 'none', cursor: 'pointer', textAlign: 'left', 
                            width: '100%', fontFamily: 'inherit', fontSize: '0.95rem',
                            whiteSpace: 'nowrap', transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                             if(activePage !== item.id) e.currentTarget.style.background = 'var(--surface-border)';
                          }}
                          onMouseLeave={e => {
                             if(activePage !== item.id) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <span style={{ color: activePage === item.id ? 'var(--ci-primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {item.icon}
                          </span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer External Links in Sidebar (Pinned) */}
      <div style={{ 
         padding: isOpen ? '1rem' : '1rem 0', 
         display: 'flex', 
         flexDirection: isOpen ? 'row' : 'column', 
         flexWrap: isOpen ? 'wrap' : 'nowrap',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '0.5rem', 
         width: isOpen ? '320px' : '68px',
         background: 'var(--bg-color)',
         borderTop: '1px solid var(--surface-border)',
         paddingBottom: '1.5rem'
      }}>
        <ExternalLinkButton isOpen={isOpen} icon={<MessageCircle size={18} />} text="카카오톡" url="https://pf.kakao.com" color="#371d1e" bg="#fee500" />
        <ExternalLinkButton isOpen={isOpen} icon={<ShoppingBag size={18} />} text="스토어" url="https://brand.naver.com" color="#ffffff" bg="#03c75a" />
        <ExternalLinkButton isOpen={isOpen} icon={<MapPin size={18} />} text="대리점" url="https://qualisports.com/stores" color="var(--text-primary)" bg="var(--ci-white)" />
        <ExternalLinkButton isOpen={isOpen} icon={<Tag size={18} />} text="제품등록" url="https://registration.qualisports.com" color="var(--text-primary)" bg="var(--ci-white)" />
      </div>
    </motion.aside>
  );
}

function ExternalLinkButton({ isOpen, icon, text, url, color, bg }) {
   return (
      <a 
         href={url} 
         target="_blank" 
         rel="noreferrer" 
         title={!isOpen ? text : ''}
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isOpen ? 'flex-start' : 'center',
            gap: isOpen ? '0.5rem' : '0',
            padding: isOpen ? '0.75rem 1rem' : '0',
            width: isOpen ? 'calc(50% - 0.25rem)' : '40px',
            height: isOpen ? 'auto' : '40px',
            borderRadius: isOpen ? 'var(--radius-md)' : '50%',
            background: bg,
            color: color,
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            border: isOpen ? '1px solid var(--surface-border)' : 'none',
            boxShadow: isOpen ? 'none' : 'var(--shadow-sm)',
            transition: 'all 0.2s',
            flexShrink: 0
         }}
      >
         {icon}
         {isOpen && <span>{text}</span>}
      </a>
   );
}
