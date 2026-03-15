import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ isVisible }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = (e) => {
      const { scrollTop } = e.detail;
      const target = document.querySelector('.page-container');
      if (target) {
        // scrollHeight: 전체 콘텐츠 높이, clientHeight: 화면에 보이는 높이
        const totalScrollableDistance = target.scrollHeight - target.clientHeight;
        if (totalScrollableDistance > 0) {
          const progress = (scrollTop / totalScrollableDistance) * 100;
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener('main-scroll', handleScroll);
    return () => window.removeEventListener('main-scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'transparent',
      zIndex: 10000, // 헤더보다 위에 위치
      pointerEvents: 'none'
    }}>
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--ci-primary) 0%, var(--ci-secondary) 100%)',
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(114, 191, 68, 0.5)'
        }}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      />
    </div>
  );
}
