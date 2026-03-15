import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

const WIZARD_FLOW = {
  start: {
    question: "어떤 종류의 문제를 겪고 계신가요?",
    options: [
      { label: "전원이 안 켜지거나 배터리 문제", next: "power_sub_1" },
      { label: "주행 시 소음이나 소리가 남", next: "noise_sub_1" },
      { label: "자전거가 잘 안 나감 (주행감 저하)", result: "error-tire" }
    ]
  },
  power_sub_1: {
    question: "충전기를 연결했을 때 어댑터(충전기)의 LED 색상은 무엇인가요?",
    options: [
      { label: "빨간색 (충전 중 표시)", next: "power_sub_2" },
      { label: "초록색 (완충 표시) 이지만 전원이 안 켜짐", result: "error-power" },
      { label: "불이 아예 안 들어옴", result: "error-power" } // 단순화: error-power로 유도
    ]
  },
  power_sub_2: {
    question: "충전 후에도 모니터가 켜지지 않나요?",
    options: [
      { label: "네, 아무 반응이 없습니다.", result: "error-power" },
      { label: "켜지지만 금방 꺼집니다.", result: "error-power" }
    ]
  },
  noise_sub_1: {
    question: "소음이 발생하는 부위가 어디인가요?",
    options: [
      { label: "바퀴 쪽 (브레이크 잡을 때 삐-익 소리)", result: "error-brake" },
      { label: "기타 부위 (기어, 모터 등)", result: "error-brake" } // 포괄적 안내
    ]
  }
};

export default function TroubleshootingWizard({ isOpen, onClose, onResult }) {
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

  const currentData = WIZARD_FLOW[currentNode];

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
