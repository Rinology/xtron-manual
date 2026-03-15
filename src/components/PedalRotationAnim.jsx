import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, RotateCw } from 'lucide-react';

export default function PedalRotationAnim({ isLeft }) {
  const title = isLeft ? '좌측 페달(L) 결합' : '우측 페달(R) 결합';
  const desc1 = isLeft ? '풀림 방지를 위해 역방향 나사산 적용.' : '정상 나사산 적용.';
  const desc2 = isLeft ? '시계 반대 방향' : '시계 방향';
  const color = '#10b981'; // Green color from user's sample image
  
  return (
    <div style={{ flex: '1 1 250px', background: 'var(--bg-color)', padding: '2rem 1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {title} 
        {isLeft && (
            <span style={{ fontSize: '0.75rem', background: '#fef2f2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', verticalAlign: 'middle', fontWeight: 'normal' }}>
                많이 실수하는 곳
            </span>
        )}
      </h3>
      
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '1.5rem' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          {/* Dashed background circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="#9ca3af" 
            strokeWidth="4" 
            strokeDasharray="8 6" 
          />
        </svg>

        {/* Moving arc */}
        <motion.div
          animate={{ rotate: isLeft ? -360 : 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: isLeft ? 'scaleX(-1)' : 'none' }}>
            {/* The Green Arc */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke={color} 
              strokeWidth="5" 
              strokeDasharray="70 300" /* Length of arc */
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Center Icon */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-primary)' }}>
           {isLeft ? (
             <RotateCcw size={32} strokeWidth={1.5} />
           ) : (
             <RotateCw size={32} strokeWidth={1.5} />
           )}
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        <div style={{ marginBottom: '0.2rem' }}>{desc1}</div>
        <div>
          <strong style={{ color, fontSize: '1rem' }}>{desc2}</strong>으로 회전.
        </div>
      </div>
    </div>
  );
}
