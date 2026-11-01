import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, X, ChevronRight, Lightbulb, FileText, HelpCircle } from 'lucide-react';
import { allGuideItems } from '../data/guides';
import { useGuides } from '../context/GuideContext';

export default function Hero({ setActivePage }) {
  const { wizardFlow, allGuideItems: dynamicGuideItems, faqItems } = useGuides();
  const guideItems = dynamicGuideItems && dynamicGuideItems.length > 0 ? dynamicGuideItems : allGuideItems;
  const hasWizard = Boolean(
    wizardFlow &&
    wizardFlow.start &&
    wizardFlow.start.options &&
    wizardFlow.start.options.length > 0
  );

  // 인라인 검색 상태
  const [localSearch, setLocalSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // 실시간 검색 매칭 로직
  const query = localSearch.toLowerCase();
  const matchedGuides = guideItems.filter(item => 
    item.title.toLowerCase().includes(query) || 
    (item.keywords && item.keywords.toLowerCase().includes(query)) ||
    (item.summary && (Array.isArray(item.summary) ? item.summary.some(text => text.toLowerCase().includes(query)) : item.summary.toLowerCase().includes(query)))
  );

  const matchedFaqs = (faqItems || []).filter(faq =>
    faq.question.toLowerCase().includes(query) ||
    faq.answer.toLowerCase().includes(query) ||
    (faq.keywords && faq.keywords.toLowerCase().includes(query)) ||
    (faq.category && faq.category.toLowerCase().includes(query))
  ).map(faq => ({
    id: faq.id,
    title: `[FAQ] ${faq.question}`,
    summary: [faq.category ? `${faq.category}` : '자주 묻는 질문'],
    isFaq: true
  }));

  const matchedItems = [...matchedGuides, ...matchedFaqs];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim() && matchedItems.length > 0) {
      setActivePage(matchedItems[0].id);
      setIsFocused(false);
    }
  };

  const handleClearSearch = () => {
    setLocalSearch('');
  };

  // 롤링 추천 항목: Pinned 순서가 지정된 항목을 우선 노출하고, 빈칸(미지정) 항목은 뒤이어 랜덤 노출
  const suggestions = useMemo(() => {
    const pGuides = (guideItems || [])
      .filter(item => item.pinned && item.id && item.title)
      .map((item, index) => ({
        title: item.title.replace(/^ㄴ\s*/, ''),
        id: item.id,
        pinnedOrder: Number(item.pinned) || 99,
        sourcePriority: 1,
        rowIndex: index,
        type: 'manual'
      }));

    const pFaqs = (faqItems || [])
      .filter(faq => faq.pinned && faq.id && faq.question)
      .map((faq, index) => ({
        title: faq.question,
        id: faq.id,
        pinnedOrder: Number(faq.pinned) || 99,
        sourcePriority: 2,
        rowIndex: index,
        type: 'faq'
      }));

    const sortedPinned = [...pGuides, ...pFaqs].sort((a, b) => {
      if (a.pinnedOrder !== b.pinnedOrder) return a.pinnedOrder - b.pinnedOrder;
      if (a.sourcePriority !== b.sourcePriority) return a.sourcePriority - b.sourcePriority;
      return a.rowIndex - b.rowIndex;
    });

    const uGuides = (guideItems || [])
      .filter(item => !item.pinned && item.id && item.title && item.id !== 'admin')
      .map(item => ({
        title: item.title.replace(/^ㄴ\s*/, ''),
        id: item.id,
        type: 'manual'
      }));

    const uFaqs = (faqItems || [])
      .filter(faq => !faq.pinned && faq.id && faq.question)
      .map(faq => ({
        title: faq.question,
        id: faq.id,
        type: 'faq'
      }));

    const unpinnedPool = [...uGuides, ...uFaqs];
    for (let i = unpinnedPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unpinnedPool[i], unpinnedPool[j]] = [unpinnedPool[j], unpinnedPool[i]];
    }

    return [...sortedPinned, ...unpinnedPool];
  }, [guideItems, faqItems]);

  // 롤링 상태 (라벨 및 1/3 카운터 없는 순수 질문 롤링)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (suggestions.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % suggestions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [suggestions.length, isHovered]);

  useEffect(() => {
    if (currentIndex >= suggestions.length) {
      setCurrentIndex(0);
    }
  }, [suggestions.length, currentIndex]);

  const currentSuggestion = suggestions[currentIndex] || suggestions[0];

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
      {/* Subtle Blue Glow Background */}
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

      <div className="hero-content-wrapper" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '620px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 헤드라인 타이틀 (단어 단위 줄바꿈 방지) */}
        <h2 className="hero-title" style={{ marginBottom: '2.5rem', letterSpacing: '-0.02em', color: 'var(--ci-primary)', fontWeight: 500, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          <span style={{ display: 'inline-block' }}>어떤 도움이</span>{' '}
          <span style={{ color: 'var(--ci-secondary)', display: 'inline-block' }}>필요하신가요?</span>
        </h2>
        
        {/* 메인 인라인 검색창 */}
        <form 
          className="hero-search-form" 
          onSubmit={handleSearchSubmit} 
          style={{ position: 'relative', width: '100%' }}
        >
          <Search 
            size={20} 
            color={isFocused ? "var(--ci-primary)" : "#94a3b8"} 
            style={{ 
              position: 'absolute', 
              left: '1.35rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              pointerEvents: 'none', 
              zIndex: 2,
              transition: 'color 0.2s'
            }} 
          />
          
          <input 
            type="text"
            className="hero-search-input"
            placeholder="상황이나 키워드를 검색하세요."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // 드롭다운 아이템 클릭 이벤트를 위해 250ms 지연
              setTimeout(() => setIsFocused(false), 250);
            }}
            style={{
              width: '100%',
              padding: '0.95rem 3.4rem 0.95rem 3.2rem',
              borderRadius: 'var(--radius-full)',
              border: isFocused ? '1px solid rgba(47, 98, 134, 0.45)' : '1px solid #e2e8f0',
              background: 'var(--ci-white)',
              fontFamily: 'inherit',
              fontSize: '0.98rem',
              color: 'var(--text-primary)',
              outline: 'none',
              boxShadow: isFocused 
                ? '0 4px 20px rgba(0, 0, 0, 0.07), 0 0 0 3px rgba(47, 98, 134, 0.08)' 
                : '0 2px 10px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
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
                transition: 'background 0.2s',
                zIndex: 2
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-border)'}
            >
              <X size={16} />
            </button>
          )}

          {/* 검색창 포커스 시 드롭다운 패널 (자가진단 마법사 + 라벨 없는 롤링 질문 + 검색 결과) */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="hero-search-dropdown"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '0.65rem',
                  background: 'var(--ci-white)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.1), 0 4px 12px rgba(0, 0, 0, 0.03)',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  zIndex: 20,
                  textAlign: 'left'
                }}
              >
                {/* 1. 검색어 입력 전 (빈 상태): 자가진단 마법사 + 군더더기 없는 1줄 롤링 질문 */}
                {!localSearch.trim() ? (
                  <div style={{ padding: '0.75rem' }}>
                    
                    {/* 자가진단 마법사 퀵 버튼 */}
                    {hasWizard && (
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setActivePage('troubleshooting-wizard');
                          setIsFocused(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(47, 98, 134, 0.05)',
                          border: '1px solid rgba(47, 98, 134, 0.12)',
                          cursor: 'pointer',
                          marginBottom: suggestions.length > 0 ? '0.5rem' : '0',
                          transition: 'all 0.18s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--ci-primary-light)';
                          e.currentTarget.style.borderColor = 'var(--ci-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(47, 98, 134, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(47, 98, 134, 0.12)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                          <Sparkles size={18} color="var(--ci-primary)" style={{ flexShrink: 0 }} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ci-primary)' }}>
                              <span style={{ fontWeight: 800 }}>
                                <span style={{ color: 'var(--ci-secondary)' }}>X</span>
                                <span style={{ color: 'var(--ci-primary)' }}>enie</span>
                              </span> (자가진단 마법사)
                            </span>
                            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                              어떤 키워드로 검색해야 할지 애매할 때 단계별 문답으로 해결
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={16} color="var(--ci-primary)" style={{ flexShrink: 0 }} />
                      </div>
                    )}

                    {/* 라벨과 카운터(1/3)를 완전히 뺀 순수 질문 롤링 티커 */}
                    {suggestions.length > 0 && currentSuggestion && (
                      <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setActivePage(currentSuggestion.id);
                          setIsFocused(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.7rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--surface-color)',
                          border: '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          transition: 'all 0.18s',
                          userSelect: 'none'
                        }}
                        onMouseEnterCapture={(e) => {
                          e.currentTarget.style.background = 'var(--ci-primary-light)';
                          e.currentTarget.style.borderColor = 'rgba(47, 98, 134, 0.25)';
                        }}
                        onMouseLeaveCapture={(e) => {
                          e.currentTarget.style.background = 'var(--surface-color)';
                          e.currentTarget.style.borderColor = 'var(--surface-border)';
                        }}
                      >
                        <Lightbulb size={17} color="var(--ci-secondary)" style={{ flexShrink: 0 }} />
                        
                        {/* 롤링 텍스트 영역 (가로 전체 폭 활용) */}
                        <div style={{ flex: 1, minWidth: 0, height: '1.35rem', position: 'relative', overflow: 'hidden' }}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${currentSuggestion.type}-${currentSuggestion.id}-${currentIndex}`}
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

                  </div>
                ) : (
                  /* 2. 검색어 입력 시: 실시간 검색 결과 리스트 */
                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {matchedItems.length > 0 ? (
                      matchedItems.map(item => (
                        <div 
                          key={item.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setActivePage(item.id);
                            setLocalSearch('');
                            setIsFocused(false);
                          }}
                          style={{
                            padding: '0.9rem 1.1rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid var(--surface-border)',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            transition: 'background var(--transition-fast)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ci-primary-light)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '6px',
                            background: 'var(--surface-border)', color: 'var(--ci-primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            {item.isFaq ? <HelpCircle size={15} /> : <FileText size={15} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.title}
                            </span>
                            {item.summary && (
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {(Array.isArray(item.summary) ? item.summary.join(', ') : item.summary)}
                              </div>
                            )}
                          </div>
                          <ChevronRight size={16} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '2rem 1rem', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
                        검색 결과가 없습니다.<br />
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>다른 단어로 검색해보세요.</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" style={{ display: 'none' }}>검색</button>
        </form>

      </div>
    </motion.section>
  );
}
