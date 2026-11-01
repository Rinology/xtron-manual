import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Home, Sparkles, MessageCircle, Lightbulb, Search } from 'lucide-react';
import { useGuides } from '../context/GuideContext';

export default function TroubleshootingWizard({ setActivePage }) {
  const { wizardFlow, isWizardLoading } = useGuides();
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerHovered, setIsTickerHovered] = useState(false);

  useEffect(() => {
    setCurrentNode('start');
    setHistory([]);
    setSearchQuery('');
    setTickerIndex(0);
  }, []);

  const resetWizard = () => {
    setCurrentNode('start');
    setHistory([]);
    setSearchQuery('');
    setTickerIndex(0);
  };

  const handleOptionClick = (option) => {
    if (!option) return;
    if (option.result) {
      setActivePage(option.result);
    } else if (option.next) {
      setHistory([...history, currentNode]);
      setCurrentNode(option.next);
      setSearchQuery('');
    } else {
      // 메뉴얼이 준비되지 않은 경우 예외처리 페이지로 이동
      setActivePage('not-found');
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setCurrentNode(prev);
      setHistory(history.slice(0, -1));
      setSearchQuery('');
    }
  };

  const currentData = wizardFlow ? wizardFlow[currentNode] : null;

  // start 단계에서 자주 찾는 증상 롤링 타이머 (3.5초 주기)
  useEffect(() => {
    if (currentNode !== 'start' || !currentData?.options || currentData.options.length <= 1 || isTickerHovered) {
      return;
    }
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % currentData.options.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentNode, currentData?.options, isTickerHovered]);

  if (!wizardFlow || !currentData) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        {isWizardLoading ? (
          <>
            <div style={{
              display: 'inline-block', width: '30px', height: '30px',
              border: '3px solid var(--surface-border)', borderTop: '3px solid var(--ci-primary)',
              borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p>Xenie(자가진단 마법사)를 불러오고 있습니다...</p>
          </>
        ) : (
          <p>데이터를 불러올 수 없습니다...</p>
        )}
      </div>
    );
  }
  
  let displayOptions = currentData.options || [];
  if (currentNode === 'start' && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    displayOptions = displayOptions.filter(opt => 
      opt.label.toLowerCase().includes(query) || 
      (opt.keywords && opt.keywords.toLowerCase().includes(query))
    );
  }

  const currentRollingOption = currentData.options && currentData.options.length > 0 
    ? currentData.options[tickerIndex % currentData.options.length] 
    : null;

  return (
    <div style={{ paddingBottom: '4rem', paddingTop: '1rem' }}>
      <div className="glass-panel guide-panel">
        
        {/* 상단 타이틀 헤더 (FAQ 보드와 통일된 규격 및 설명 문구) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800 }}>
                  <span style={{ color: 'var(--ci-secondary)' }}>X</span>
                  <span style={{ color: 'var(--ci-primary)' }}>enie</span>
                </span>
                <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ci-primary)' }}>(자가진단 마법사)</span>
              </h2>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                어떤 키워드로 검색할지 고민될 때, Xenie의 간단한 단계별 문답으로 증상에 꼭 맞는 해결책을 찾아보세요.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1rem 0', minHeight: '45vh', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {currentNode !== 'start' && (
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                  {currentData.question}
                </h3>
              )}
              
              {currentNode === 'start' && (
                <div style={{ marginBottom: '1.75rem' }}>
                  {/* 검색창 */}
                  <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                    <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.15rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input 
                      type="text"
                      placeholder="증상이나 키워드를 입력하세요."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '0.95rem 1.15rem 0.95rem 2.85rem', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1px solid #cbd5e1', 
                        fontSize: '0.96rem', 
                        outline: 'none',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        background: 'var(--bg-color)',
                        transition: 'all 0.2s',
                        color: 'var(--text-primary)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(47, 98, 134, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(47, 98, 134, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#cbd5e1';
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                      }}
                    />
                  </div>

                  {/* 자주 찾는 증상 타이틀 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '4px', height: '15px', background: 'var(--ci-secondary)', borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      자주 찾는 증상 예시
                    </span>
                  </div>

                  {/* 검색어 없을 때: 1줄 롤링 증상 티커 */}
                  {!searchQuery.trim() && currentRollingOption && (
                    <div>
                      <div
                        onMouseEnter={() => setIsTickerHovered(true)}
                        onMouseLeave={() => setIsTickerHovered(false)}
                        onClick={() => handleOptionClick(currentRollingOption)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem 1.25rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--surface-color)',
                          border: '1px solid var(--surface-border)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                          userSelect: 'none'
                        }}
                        onMouseEnterCapture={(e) => {
                          e.currentTarget.style.background = 'var(--ci-primary-light)';
                          e.currentTarget.style.borderColor = 'rgba(47, 98, 134, 0.3)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }}
                        onMouseLeaveCapture={(e) => {
                          e.currentTarget.style.background = 'var(--surface-color)';
                          e.currentTarget.style.borderColor = 'var(--surface-border)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                        }}
                      >
                        <Lightbulb size={18} color="var(--ci-secondary)" style={{ flexShrink: 0 }} />
                        
                        <div style={{ flex: 1, minWidth: 0, height: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${currentRollingOption.label}-${tickerIndex}`}
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
                                fontSize: '0.98rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%'
                              }}>
                                {currentRollingOption.label}
                              </span>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--ci-primary)', fontSize: '0.85rem', fontWeight: 600, flexShrink: 0 }}>
                          <span>진단 시작</span>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* start 단계에서 검색어가 있거나, start 단계가 아닌 경우 옵션 리스트 표시 */}
              {(currentNode !== 'start' || searchQuery.trim() !== '') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {displayOptions.length > 0 ? displayOptions.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1.15rem 1.4rem', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--surface-border)',
                        background: 'var(--bg-color)', cursor: 'pointer',
                        textAlign: 'left', fontSize: '1rem', color: 'var(--text-secondary)',
                        transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--ci-primary)';
                        e.currentTarget.style.color = 'var(--ci-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        e.currentTarget.style.background = 'var(--ci-primary-light)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--surface-border)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        e.currentTarget.style.background = 'var(--bg-color)';
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{option.label}</span>
                      <ChevronRight size={18} style={{ flexShrink: 0, marginLeft: '0.5rem' }} />
                    </button>
                  )) : (
                    <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--surface-border)' }}>
                      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>일치하는 증상이 없습니다 😢</p>
                      <p style={{ fontSize: '0.88rem' }}>다른 키워드로 검색하시거나 우측 하단의 퀵 메뉴를 통해 문의해 주세요.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {history.length > 0 && (
          <div className="nav-buttons-container" style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', justifyContent: 'flex-start' }}>
            <button 
              onClick={handleBack}
              className="nav-btn nav-btn-left"
              style={{ flex: 1, maxWidth: '200px', background: 'var(--bg-color)', border: '1px solid var(--surface-border)', padding: '0.8rem', borderRadius: 'var(--radius-md)', justifyContent: 'center' }}
            >
              <RotateCcw size={18} /> 이전
            </button>
            <button 
              onClick={resetWizard}
              className="nav-btn nav-btn-left"
              style={{ flex: 1, maxWidth: '200px', background: 'var(--ci-primary-light)', border: '1px solid var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.8rem', borderRadius: 'var(--radius-md)', justifyContent: 'center' }}
            >
              다시 시작
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
