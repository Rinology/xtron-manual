import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, X, HelpCircle } from 'lucide-react';
import { allGuideItems } from '../data/guides';

export default function Hero({ setActivePage, onOpenSearch }) {
  const [localSearch, setLocalSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const matchedItems = allGuideItems.filter(item => 
    item.title.toLowerCase().includes(localSearch.toLowerCase()) || 
    (item.summary && item.summary.some(text => text.toLowerCase().includes(localSearch.toLowerCase())))
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(localSearch.trim() && matchedItems.length > 0) {
      setActivePage(matchedItems[0].id);
    }
  };

  const handleClearSearch = () => {
    setLocalSearch('');
  };

  const suggestions = [
    { title: "페달 장착", id: "pedal" },
    { title: "Error 01", id: "error-power" },
    { title: "브레이크 소음", id: "error-brake" },
    { title: "배터리 충전", id: "charging" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="hero-section"
      style={{
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
      }}
    >
      {/* Subtle Blue Glow Background (Gemini Style) */}
      <div 
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120vw',
          height: '120vh',
          background: 'radial-gradient(ellipse at center, rgba(47, 98, 134, 0.06) 0%, rgba(47, 98, 134, 0.02) 40%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="hero-content-wrapper" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
        
        <h2 className="hero-title" style={{ marginBottom: '3rem', letterSpacing: '-0.02em', color: 'var(--ci-primary)' }}>
          무엇을 <span style={{ color: 'var(--ci-secondary)' }}>도와드릴까요?</span>
        </h2>
        
        <form className="hero-search-form" onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '1.5rem', width: '100%' }}>
          <Search size={24} color="var(--ci-primary)" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="상황이나 키워드를 검색하세요."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1.05rem 3.5rem 1.05rem 3.5rem',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--ci-primary-light)',
              background: 'var(--ci-white)',
              fontFamily: 'inherit',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              outline: 'none',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.style.borderColor = 'var(--ci-primary)';
              e.target.style.boxShadow = '0 0 0 4px rgba(47, 98, 134, 0.15), var(--shadow-lg)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--ci-primary-light)';
              e.target.style.boxShadow = 'var(--shadow-md)';
              // Delay hiding to allow click on results
              setTimeout(() => setIsFocused(false), 200);
            }}
          />
          
          {localSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '1.2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--surface-border)',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-border)'}
            >
              <X size={16} />
            </button>
          )}
          
          {/* Dropdown Results */}
          <AnimatePresence>
            {isFocused && localSearch.trim() && (
              <motion.div
                className="hero-search-dropdown"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '0.5rem',
                  background: 'var(--ci-white)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--surface-border)',
                  overflow: 'hidden',
                  zIndex: 10,
                  textAlign: 'left',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                {matchedItems.length > 0 ? (
                  matchedItems.map(item => (
                    <div 
                      key={item.id}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent input blur
                        setActivePage(item.id);
                        setLocalSearch(''); // Clear search on selection
                        setIsFocused(false);
                      }}
                      style={{
                        padding: '1rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--surface-border)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'var(--ci-primary-light)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <Sparkles size={16} color="var(--ci-primary)" style={{ flexShrink: 0, pointerEvents: 'none' }}/>
                      <div style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                        <span style={{ fontWeight: 600 }}>{item.title}</span>
                        {item.summary && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.summary[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    검색 결과가 없습니다.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" style={{ display: 'none' }}>검색</button>
        </form>

        {/* 자가진단 마법사 배너 (Premium Sleek Design) */}
        <div className="hero-wizard-banner" style={{ marginBottom: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setActivePage('not-found')}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--ci-primary-light)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Sparkles size={18} color="var(--ci-primary)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>증상으로 문제 찾기 👉</span>
            <span className="text-gradient" style={{ fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap' }}>자가진단 마법사 시작</span>
          </button>
        </div>

        {/* 추천 퀵 가이드 리뉴얼 */}
        <div className="hero-faq-tags" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginRight: '0.2rem' }}>자주 찾는 질문:</span>
          {suggestions.map(s => (
            <button
              key={s.id}
              onClick={() => setActivePage(s.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(47, 98, 134, 0.15)',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                color: 'var(--ci-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--ci-white)';
                e.target.style.borderColor = 'rgba(47, 98, 134, 0.3)';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                e.target.style.borderColor = 'rgba(47, 98, 134, 0.15)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
