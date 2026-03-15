import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, FileText } from 'lucide-react';
import { allGuideItems } from '../data/guides';

export default function SearchModal({ isOpen, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = allGuideItems.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchSummary = item.summary && item.summary.some(s => s.toLowerCase().includes(lowerQuery));
      return matchTitle || matchSummary;
    });

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          onSelect(results[selectedIndex].id);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelect]);

  // 스크롤 동기화 연출 (선택된 아이템이 뷰포트에 보이도록)
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const activeElement = resultsRef.current.children[selectedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, results.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: '10vh', pointerEvents: 'none', zIndex: 10000
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '100%', maxWidth: '600px', margin: '0 1rem',
                background: 'var(--surface-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden', pointerEvents: 'auto',
                border: '1px solid var(--surface-border)'
              }}
            >
              {/* Search Input Area */}
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: '1rem 1.25rem', borderBottom: '1px solid var(--surface-border)'
              }}>
                <Search size={22} color="var(--ci-primary)" style={{ flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="매뉴얼 본문 및 제목 검색... (예: 전원, 페달)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    background: 'transparent', padding: '0 1rem',
                    fontSize: '1.1rem', color: 'var(--text-primary)',
                    fontFamily: 'inherit'
                  }}
                />
                <button
                  onClick={onClose}
                  style={{
                    background: 'var(--surface-border)', border: 'none',
                    padding: '0.25rem', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                  title="닫기 (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results Area */}
              <div style={{ maxHeight: '60vh', overflowY: 'auto' }} ref={resultsRef}>
                {query.trim() === '' ? (
                  <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <Search size={32} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                    <p style={{ fontSize: '0.9rem' }}>어떤 지침을 찾으시나요?<br />검색어를 입력하시면 전체 가이드에서 찾아드립니다.</p>
                  </div>
                ) : results.length === 0 ? (
                  <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p>검색 결과가 없습니다.</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>다른 키워드로 시도해보세요.</p>
                  </div>
                ) : (
                  <div style={{ padding: '0.5rem' }}>
                    {results.map((item, index) => {
                       const isSelected = index === selectedIndex;
                       return (
                        <div
                          key={item.id}
                          onMouseEnter={() => setSelectedIndex(index)}
                          onClick={() => {
                            onSelect(item.id);
                            onClose();
                          }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem', cursor: 'pointer',
                            borderRadius: 'var(--radius-md)',
                            background: isSelected ? 'var(--ci-primary-light)' : 'transparent',
                            transition: 'background 0.1s'
                          }}
                        >
                          <div style={{
                             width: '32px', height: '32px', borderRadius: '8px',
                             background: isSelected ? 'var(--ci-primary)' : 'var(--surface-border)',
                             color: isSelected ? 'var(--ci-white)' : 'var(--text-secondary)',
                             display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            {item.icon || <FileText size={16} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, color: isSelected ? 'var(--ci-primary)' : 'var(--text-primary)', marginBottom: '0.15rem' }}>
                              {item.title}
                            </div>
                            {item.summary && Array.isArray(item.summary) && (
                              <div style={{
                                fontSize: '0.8rem', color: 'var(--text-secondary)',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                              }}>
                                {item.summary[0]} 
                              </div>
                            )}
                          </div>
                          {isSelected && <ChevronRight size={18} color="var(--ci-primary)" />}
                        </div>
                       );
                    })}
                  </div>
                )}
              </div>

              {/* Footer Guide */}
              <div style={{
                padding: '0.75rem 1.25rem', borderTop: '1px solid var(--surface-border)',
                background: 'rgba(248, 250, 252, 0.5)', display: 'flex', gap: '1.5rem',
                fontSize: '0.75rem', color: 'var(--text-secondary)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <kbd style={{ background: 'var(--surface-border)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontFamily: 'inherit' }}>↓</kbd>
                  <kbd style={{ background: 'var(--surface-border)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontFamily: 'inherit' }}>↑</kbd> 이동
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <kbd style={{ background: 'var(--surface-border)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontFamily: 'inherit' }}>Enter</kbd> 선택
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <kbd style={{ background: 'var(--surface-border)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontFamily: 'inherit' }}>Esc</kbd> 닫기
                </span>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
