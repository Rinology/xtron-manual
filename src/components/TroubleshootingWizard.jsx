import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Home, Sparkles, MessageCircle } from 'lucide-react';
import { useGuides } from '../context/GuideContext';

export default function TroubleshootingWizard({ setActivePage }) {
  const { wizardFlow, isWizardLoading } = useGuides();
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCurrentNode('start');
    setHistory([]);
    setSearchQuery('');
  }, []);

  const resetWizard = () => {
    setCurrentNode('start');
    setHistory([]);
    setSearchQuery('');
  };

  const handleOptionClick = (option) => {
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

  if (!wizardFlow || !wizardFlow[currentNode]) {
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
            <p>자가진단 마법사를 불러오고 있습니다...</p>
          </>
        ) : (
          <p>데이터를 불러올 수 없습니다...</p>
        )}
      </div>
    );
  }

  const currentData = wizardFlow[currentNode];
  
  let displayOptions = currentData.options;
  if (currentNode === 'start' && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    displayOptions = displayOptions.filter(opt => 
      opt.label.toLowerCase().includes(query) || 
      (opt.keywords && opt.keywords.toLowerCase().includes(query))
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      style={{ paddingBottom: '4rem', paddingTop: '1rem' }}
    >
      <div className="glass-panel guide-panel">
        
        {/* Header - GuideContent와 동일한 형태 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem' }}>
          <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px' }}>
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--ci-primary)', margin: 0, fontWeight: 700 }}>
            {currentNode === 'start' ? '어떤 종류의 문제를 겪고 계신가요?' : '자가진단 마법사'}
          </h2>
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
                <div style={{ marginBottom: '2rem' }}>
                  <input 
                    type="text"
                    placeholder="어떤 문제가 발생했나요? (예: 충전불가, 소음)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                      width: '100%', padding: '1.15rem 1.25rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--ci-primary)', 
                      fontSize: '1.05rem', outline: 'none',
                      boxShadow: '0 0 0 3px rgba(47, 98, 134, 0.1)',
                      background: 'var(--bg-color)',
                      transition: 'box-shadow 0.2s',
                      marginBottom: '1.5rem'
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '4px', height: '16px', background: 'var(--ci-secondary)', borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>자주 찾는 증상 예시</span>
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {displayOptions.length > 0 ? displayOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--surface-border)',
                      background: 'var(--bg-color)', cursor: 'pointer',
                      textAlign: 'left', fontSize: '1.05rem', color: 'var(--text-secondary)',
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
                    <ChevronRight size={20} style={{ flexShrink: 0, marginLeft: '0.5rem' }} />
                  </button>
                )) : (
                  <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--surface-border)' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>해당하는 마법재료가 없습니다 😢</p>
                    <p>다른 키워드로 검색하시거나 우측 하단의 퀵 메뉴를 통해 문의해 주세요.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="nav-buttons-container" style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            {history.length > 0 && (
              <>
                <button 
                  onClick={handleBack}
                  className="nav-btn nav-btn-left"
                  style={{ flex: 1, background: 'var(--bg-color)', border: '1px solid var(--surface-border)', padding: '0.8rem', borderRadius: 'var(--radius-md)', justifyContent: 'center' }}
                >
                  <RotateCcw size={18} /> 이전
                </button>
                <button 
                  onClick={resetWizard}
                  className="nav-btn nav-btn-left"
                  style={{ flex: 1, background: 'var(--ci-primary-light)', border: '1px solid var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.8rem', borderRadius: 'var(--radius-md)', justifyContent: 'center' }}
                >
                  다시 시작
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => setActivePage(null)}
            className="nav-btn nav-btn-right"
            style={{ flex: 1, maxWidth: '200px', background: 'var(--ci-primary)', border: '1px solid var(--ci-primary)', color: 'var(--ci-white)', padding: '0.8rem', borderRadius: 'var(--radius-md)', justifyContent: 'center' }}
          >
            <Home size={18} /> 홈으로
          </button>
        </div>

      </div>
    </motion.div>
  );
}
