import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

import { useGuides } from '../context/GuideContext';

export default function TroubleshootingWizard({ isOpen, onClose, onResult }) {
  const { wizardFlow, isWizardLoading } = useGuides();
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const resetWizard = () => {
    setCurrentNode('start');
    setHistory([]);
    setSearchQuery('');
  };

  const handleOptionClick = (option) => {
    if (option.result) {
      onResult(option.result);
      onClose();
      setTimeout(() => resetWizard(), 300);
    } else if (option.next) {
      setHistory([...history, currentNode]);
      setCurrentNode(option.next);
      setSearchQuery('');
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

  // wizardFlow 데이터가 아직 로드되지 않았거나 현재 노드가 없는 경우 처리
  if (!wizardFlow || !wizardFlow[currentNode]) {
    return (
      <AnimatePresence>
        {isOpen && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999
              }}
            />
            <div style={{
              position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '1rem', pointerEvents: 'none'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                style={{
                  width: '100%', maxWidth: '500px',
                  background: 'var(--surface-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  overflow: 'hidden', pointerEvents: 'auto',
                  display: 'flex', flexDirection: 'column'
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--surface-border)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--ci-primary-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ci-primary)' }}>
                    <HelpCircle size={20} />
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>자가진단 마법사</h3>
                  </div>
                  <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ci-primary)' }}>
                    <X size={20} />
                  </button>
                </div>
                {/* Body */}
                <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  {isWizardLoading ? (
                    <>
                      <div style={{
                        display: 'inline-block',
                        width: '30px', height: '30px',
                        border: '3px solid var(--surface-border)',
                        borderTop: '3px solid var(--ci-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '1rem'
                      }} />
                      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                      <p>스프레드시트에서 데이터를 불러오는 중입니다...</p>
                      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>잠시만 기다려주세요.</p>
                    </>
                  ) : (
                    <>
                      <p>로딩 중이거나 데이터를 불러올 수 없습니다...</p>
                      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>자가진단마법사 연결상태를 확인해주세요.</p>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
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
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999
            }}
          />
          <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', zIndex: 10000, pointerEvents: 'none'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                width: '100%', maxWidth: '500px',
                background: 'var(--surface-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden', pointerEvents: 'auto',
                display: 'flex', flexDirection: 'column'
              }}
            >
              {/* Header */}
              <div style={{
                padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--surface-border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'var(--ci-primary-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ci-primary)' }}>
                  <HelpCircle size={20} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>자가진단 마법사</h3>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ci-primary)' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '2rem 1.5rem', minHeight: '250px', maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                      {currentData.question}
                    </h4>
                    
                    {currentNode === 'start' && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <input 
                          type="text"
                          placeholder="어떤 문제가 발생했나요? (예: 충전불가, 소음)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{ 
                            width: '100%', padding: '0.85rem 1rem', 
                            borderRadius: 'var(--radius-md)', 
                            border: '1px solid var(--ci-primary)', 
                            fontSize: '1rem', outline: 'none',
                            boxShadow: '0 0 0 2px rgba(47, 98, 134, 0.1)'
                          }}
                        />
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                      {displayOptions.length > 0 ? displayOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1rem', borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--ci-white)', cursor: 'pointer',
                            textAlign: 'left', fontSize: '1rem', color: 'var(--text-secondary)',
                            transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'var(--ci-primary)';
                            e.currentTarget.style.color = 'var(--ci-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--surface-border)';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                          }}
                        >
                          <span>{option.label}</span>
                          <ChevronRight size={18} />
                        </button>
                      )) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          검색 결과가 없습니다.<br/>다른 키워드로 검색해 보세요.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between' }}>
                {history.length > 0 ? (
                  <button
                    onClick={handleBack}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600
                    }}
                  >
                    <RotateCcw size={16} /> 이전 질문으로
                  </button>
                ) : <div />}
                
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                  XTRON 스마트 어시스턴트
                </span>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
