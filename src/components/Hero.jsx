import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, X } from 'lucide-react';
import { allGuideItems } from '../data/guides';

export default function Hero({ setActivePage }) {
  const [localSearch, setLocalSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const matchedItems = allGuideItems.filter(item => 
    item.title.includes(localSearch) || item.summary.some(text => text.includes(localSearch))
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(localSearch.trim() && matchedItems.length > 0) {
      setActivePage(matchedItems[0].id); // Go to first result
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
      style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '600px' }}>
        
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--ci-primary)' }}>
          무엇을 <span className="text-gradient">도와</span>드릴까요?
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          전기자전거 조립부터 주행 중 발생한 문제 해결까지 <br/>
          궁금한 점을 검색해 보세요.
        </p>
        
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '2rem' }}>
          <Search size={24} color="var(--ci-primary)" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="상황이나 키워드를 검색하세요..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1.05rem 3.5rem 1.05rem 3.5rem',
              borderRadius: 'var(--radius-lg)',
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
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
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
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <X size={20} />
            </button>
          )}
          
          {/* Dropdown Results */}
          <AnimatePresence>
            {isFocused && localSearch.trim() && (
              <motion.div
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
                  textAlign: 'left'
                }}
              >
                {matchedItems.length > 0 ? (
                  matchedItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
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
                      <Sparkles size={16} color="var(--ci-primary)" style={{ pointerEvents: 'none' }}/>
                      <span style={{ pointerEvents: 'none' }}>{item.title}</span>
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', alignSelf: 'center', marginRight: '0.5rem' }}>추천 퀵 가이드:</span>
          {suggestions.map(s => (
            <button
              key={s.id}
              onClick={() => setActivePage(s.id)}
              style={{
                background: 'var(--bg-color)',
                border: '1px solid var(--surface-border)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--ci-primary)';
                e.target.style.color = 'var(--ci-white)';
                e.target.style.borderColor = 'var(--ci-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--bg-color)';
                e.target.style.color = 'var(--text-primary)';
                e.target.style.borderColor = 'var(--surface-border)';
              }}
            >
              #{s.title}
            </button>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
