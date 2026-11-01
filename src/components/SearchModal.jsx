import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, FileText, HelpCircle, Sparkles, Lightbulb } from 'lucide-react';
import { useGuides } from '../context/GuideContext';

export default function SearchModal({ isOpen, onClose, onSelect }) {
  const { allGuideItems, faqItems, wizardFlow } = useGuides();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const hasWizard = Boolean(
    wizardFlow &&
    wizardFlow.start &&
    wizardFlow.start.options &&
    wizardFlow.start.options.length > 0
  );

  // 롤링 추천 항목: Pinned 순서가 지정된 항목을 우선 노출하고, 빈칸(미지정) 항목은 뒤이어 랜덤 노출
  const suggestions = useMemo(() => {
    const pGuides = (allGuideItems || [])
      .filter(item => item.pinned && item.id && item.title)
      .map((item, index) => ({
        title: item.title.replace(/^ㄴ\s*/, ''),
        id: item.id,
        pinnedOrder: Number(item.pinned) || 99,
        sourcePriority: 1,
        rowIndex: index,
        isFaq: false,
        category: '매뉴얼'
      }));

    const pFaqs = (faqItems || [])
      .filter(faq => faq.pinned && faq.id && faq.question)
      .map((faq, index) => ({
        title: faq.question,
        id: faq.id,
        pinnedOrder: Number(faq.pinned) || 99,
        sourcePriority: 2,
        rowIndex: index,
        isFaq: true,
        category: faq.category || 'FAQ'
      }));

    const sortedPinned = [...pGuides, ...pFaqs].sort((a, b) => {
      if (a.pinnedOrder !== b.pinnedOrder) return a.pinnedOrder - b.pinnedOrder;
      if (a.sourcePriority !== b.sourcePriority) return a.sourcePriority - b.sourcePriority;
      return a.rowIndex - b.rowIndex;
    });

    const uGuides = (allGuideItems || [])
      .filter(item => !item.pinned && item.id && !String(item.id).startsWith('unlinked-') && item.title && item.id !== 'admin')
      .map(item => ({
        title: item.title.replace(/^ㄴ\s*/, ''),
        id: item.id,
        isFaq: false,
        category: '매뉴얼'
      }));

    const uFaqs = (faqItems || [])
      .filter(faq => !faq.pinned && faq.id && faq.question)
      .map(faq => ({
        title: faq.question,
        id: faq.id,
        isFaq: true,
        category: faq.category || 'FAQ'
      }));

    const unpinnedPool = [...uGuides, ...uFaqs];
    for (let i = unpinnedPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unpinnedPool[i], unpinnedPool[j]] = [unpinnedPool[j], unpinnedPool[i]];
    }

    return [...sortedPinned, ...unpinnedPool];
  }, [allGuideItems, faqItems]);

  // 모달 내부 롤링 상태 (라벨 및 카운터 없는 순수 질문 롤링)
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerHovered, setIsTickerHovered] = useState(false);

  useEffect(() => {
    if (!isOpen || suggestions.length <= 1 || isTickerHovered) return;
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % suggestions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, suggestions.length, isTickerHovered]);

  const currentSuggestion = suggestions[tickerIndex] || suggestions[0];

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
    const filteredGuides = (allGuideItems || []).filter(item => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchKeywords = item.keywords && item.keywords.toLowerCase().includes(lowerQuery);
      const matchSummary = item.summary && (Array.isArray(item.summary) ? item.summary.some(s => s.toLowerCase().includes(lowerQuery)) : item.summary.toLowerCase().includes(lowerQuery));
      return matchTitle || matchKeywords || matchSummary;
    });

    const filteredFaqs = (faqItems || []).filter(faq => {
      const matchQuestion = faq.question.toLowerCase().includes(lowerQuery);
      const matchAnswer = faq.answer.toLowerCase().includes(lowerQuery);
      const matchKeywords = faq.keywords && faq.keywords.toLowerCase().includes(lowerQuery);
      const matchCategory = faq.category && faq.category.toLowerCase().includes(lowerQuery);
      return matchQuestion || matchAnswer || matchKeywords || matchCategory;
    }).map(faq => ({
      id: faq.id,
      title: `[FAQ] ${faq.question}`,
      icon: <HelpCircle size={16} />,
      summary: [faq.category ? `분류: ${faq.category}` : '자주 묻는 질문'],
      isFaq: true
    }));

    setResults([...filteredGuides, ...filteredFaqs]);
    setSelectedIndex(0);
  }, [query, allGuideItems, faqItems]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
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
              background: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(5px)',
              zIndex: 9999
            }}
          />

          {/* Modal Container (세로 확장 및 시원한 크기 확보) */}
          <div 
            className="search-modal-container"
            style={{
              position: 'fixed', inset: 0,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: '6vh', pointerEvents: 'none', zIndex: 10000
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.22 }}
              style={{
                width: '100%', maxWidth: '680px', margin: '0 1rem',
                background: 'var(--surface-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35), var(--shadow-lg)',
                overflow: 'hidden', pointerEvents: 'auto',
                border: '1px solid var(--surface-border)',
                maxHeight: '84vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Search Input Area */}
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: '1.1rem 1.35rem', borderBottom: '1px solid var(--surface-border)',
                background: 'var(--surface-color)'
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
                    padding: '0.3rem', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)'
                  }}
                  title="닫기 (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Main Content Area (Results or Launchpad) */}
              <div style={{ flex: 1, overflowY: 'auto', minHeight: '340px' }} ref={resultsRef}>
                {query.trim() === '' ? (
                  /* 1. 검색어 입력 전 (빈 상태): 풍부한 런치패드 탐색 허브 */
                  <div style={{ padding: '1.25rem' }}>
                    
                    {/* 상단 1: 증상별 자가진단 마법사 카드 */}
                    {hasWizard && (
                      <div
                        onClick={() => {
                          onSelect('troubleshooting-wizard');
                          onClose();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.9rem 1.15rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(47, 98, 134, 0.05)',
                          border: '1px solid rgba(47, 98, 134, 0.14)',
                          cursor: 'pointer',
                          marginBottom: '0.75rem',
                          transition: 'all 0.18s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--ci-primary-light)';
                          e.currentTarget.style.borderColor = 'var(--ci-primary)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(47, 98, 134, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(47, 98, 134, 0.14)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                          <div style={{
                            width: '34px', height: '34px', borderRadius: '8px',
                            background: 'var(--ci-primary)', color: 'var(--ci-white)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <Sparkles size={18} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--ci-primary)' }}>
                              <span style={{ fontWeight: 800 }}>
                                <span style={{ color: 'var(--ci-secondary)' }}>X</span>
                                <span style={{ color: 'var(--ci-primary)' }}>enie</span>
                              </span> (자가진단 마법사)
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                              어떤 키워드로 검색해야 할지 애매할 때 단계별 질문으로 즉시 해결
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={18} color="var(--ci-primary)" style={{ flexShrink: 0 }} />
                      </div>
                    )}

                    {/* 상단 2: 라벨과 카운터가 없는 순수 질문 롤링 티커 */}
                    {suggestions.length > 0 && currentSuggestion && (
                      <div
                        onMouseEnter={() => setIsTickerHovered(true)}
                        onMouseLeave={() => setIsTickerHovered(false)}
                        onClick={() => {
                          onSelect(currentSuggestion.id);
                          onClose();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1.1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--surface-color)',
                          border: '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          marginBottom: '1.25rem',
                          transition: 'all 0.18s',
                          userSelect: 'none'
                        }}
                        onMouseEnterCapture={(e) => {
                          e.currentTarget.style.background = 'var(--ci-primary-light)';
                          e.currentTarget.style.borderColor = 'rgba(47, 98, 134, 0.3)';
                        }}
                        onMouseLeaveCapture={(e) => {
                          e.currentTarget.style.background = 'var(--surface-color)';
                          e.currentTarget.style.borderColor = 'var(--surface-border)';
                        }}
                      >
                        <Lightbulb size={18} color="var(--ci-secondary)" style={{ flexShrink: 0 }} />
                        
                        <div style={{ flex: 1, minWidth: 0, height: '1.4rem', position: 'relative', overflow: 'hidden' }}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${currentSuggestion.id}-${tickerIndex}`}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.28, ease: 'easeOut' }}
                              style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <span style={{
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%'
                              }}>
                                {currentSuggestion.title}
                              </span>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <ChevronRight size={16} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                      </div>
                    )}

                    {/* 하단 심플 검색 안내 힌트 */}
                    <div style={{
                      marginTop: '2.5rem',
                      padding: '1.5rem 1rem',
                      textAlign: 'center',
                      color: '#94a3b8',
                      fontSize: '0.86rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.45rem'
                    }}>
                      <span>찾으시는 매뉴얼 항목이나 증상의 키워드를 검색창에 입력해 보세요.</span>
                      <span style={{ fontSize: '0.78rem', color: '#a0aec0' }}>예: 전원, 페달, 케이블, 소음</span>
                    </div>

                  </div>
                ) : results.length === 0 ? (
                  /* 검색 결과 없음 */
                  <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p style={{ fontWeight: 600, fontSize: '1rem' }}>검색 결과가 없습니다.</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>
                      단어의 철자를 확인하시거나 다른 키워드로 검색해보세요.
                    </p>
                  </div>
                ) : (
                  /* 2. 검색 결과 리스트 */
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
                            padding: '0.9rem 1rem', cursor: 'pointer',
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
                            <div style={{
                              fontWeight: 600, fontSize: '0.95rem',
                              color: isSelected ? 'var(--ci-primary)' : 'var(--text-primary)',
                              marginBottom: '0.15rem',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}>
                              {item.title}
                            </div>
                            {item.summary && (
                              <div style={{
                                fontSize: '0.8rem', color: 'var(--text-secondary)',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                              }}>
                                {(Array.isArray(item.summary) ? item.summary.join(', ') : item.summary)}
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
