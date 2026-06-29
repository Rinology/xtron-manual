import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

import { useGuides } from '../context/GuideContext';

export default function TroubleshootingWizard({ isOpen, onClose, onResult }) {
  const { wizardFlow } = useGuides();
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);

  if (!isOpen) return null;


  const handleOptionClick = (option) => {
    if (option.result) {
      // 결과 페이지로 안내
      onResult(option.result);
      onClose();
      // 닫히는 애니메이션 후 상태 초기화를 위해 약간의 딜레이
      setTimeout(() => {
        setCurrentNode('start');
        setHistory([]);
      }, 300);
    } else if (option.next) {
      setHistory([...history, currentNode]);
      setCurrentNode(option.next);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setCurrentNode(prev);
      setHistory(history.slice(0, -1));
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
                  <p>로딩 중이거나 데이터를 불러올 수 없습니다...</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>스프레드시트 연결 상태를 확인해 주세요.</p>
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    );
  }

  const currentData = wizardFlow[currentNode];

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
              <div style={{ padding: '2rem 1.5rem', minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                      {currentData.question}
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                      {currentData.options.map((option, idx) => (
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
                      ))}
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
