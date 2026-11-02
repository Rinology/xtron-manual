import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * 최초 진입 시 좌측 상단 로고 파비콘 옆에 1회 등장하는 안내 팝업
 * - 다크 제미나이 툴팁(.gemini-tooltip) 스타일로 일원화
 * - 손가락 이모지 제거 및 깔끔한 타이포그래피
 * - 세션당 1회만 표시 (sessionStorage 기반)
 * - 8.5초 후 자동 닫힘
 * - 사이드바가 열리거나 사용자가 닫기(✕)/본체 클릭 시 즉시 사라지고 기록
 */
export default function FirstVisitHintPopup({ isOpen, onOpen, position = 'desktop' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 이미 확인했거나 사이드바가 열려 있으면 노출하지 않음
    const dismissed = sessionStorage.getItem('xtron_menu_hint_seen');
    if (dismissed || isOpen) return;

    // 화면 진입 후 자연스럽게 700ms 뒤 등장
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('xtron_menu_hint_seen')) {
        setVisible(true);
      }
    }, 700);

    // 8.5초 후 자동 사라짐
    const autoDismiss = setTimeout(() => {
      handleDismiss();
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoDismiss);
    };
  }, []);

  // 사이드바가 열리면 힌트 즉시 해제 및 기록
  useEffect(() => {
    if (isOpen && visible) {
      handleDismiss();
    }
  }, [isOpen, visible]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('xtron_menu_hint_seen', 'true');
  };

  const handleClick = (e) => {
    e.stopPropagation();
    handleDismiss();
    if (onOpen) onOpen();
  };

  const isDesktop = position === 'desktop';

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          initial={{ opacity: 0, x: isDesktop ? -8 : 0, y: isDesktop ? '-50%' : -6, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, y: isDesktop ? '-50%' : 0, scale: 1 }}
          exit={{ opacity: 0, x: isDesktop ? -8 : 0, scale: 0.95 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={handleClick}
          className="first-visit-hint"
          style={isDesktop ? {
            left: 'calc(100% + 12px)',
            top: '50%',
            transform: 'translateY(-50%)'
          } : {
            left: '52px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          {/* 제미나이 툴팁 스타일 말풍선 꼬리표 (Arrow) */}
          <div className="first-visit-hint-arrow" />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.12rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#ffffff', whiteSpace: 'nowrap' }}>
                좌측 메뉴를 열어보세요
              </span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                전체 가이드와 빠른 답변을 확인할 수 있어요
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              title="닫기"
              aria-label="안내 팝업 닫기"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                marginLeft: '0.2rem',
                transition: 'color 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
