import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, RotateCw } from 'lucide-react';

export default function PedalRotationAnim({ isLeft, bgImage }) {
  const title = isLeft ? '좌측 페달(L) 결합' : '우측 페달(R) 결합';
  const desc1 = isLeft ? '풀림 방지를 위해 역방향 나사산 적용.' : '정상 나사산 적용.';
  const desc2 = isLeft ? '시계 반대 방향' : '시계 방향';
  const color = '#10b981'; // Green color from user's sample image

  
  return (
    <div style={{ flex: '1 1 250px', background: 'var(--bg-color)', padding: '2rem 1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {title} 
        {isLeft && (
            <span style={{ fontSize: '0.75rem', background: '#fef2f2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', verticalAlign: 'middle', fontWeight: 'normal' }}>
                많이 실수하는 곳
            </span>
        )}
      </h3>
      
      <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '1.5rem', borderRadius: '50%', border: '4px solid var(--surface-border)', overflow: 'hidden', backgroundColor: '#f1f5f9', boxShadow: 'var(--shadow-md)' }}>
        
        {/* Background Image (Real Photo) */}
        {bgImage ? (
          <>
            <img 
              src={bgImage} 
              alt="Crank area" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
            />
            {/* Shadow overlay to make green vector pop */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 100%)' }} />
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#fff' }} />
        )}

        {/* SVG Animation Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <marker id={`arrowhead-${isLeft ? 'l' : 'r'}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                <path d="M 0 0 L 6 3 L 0 6 z" fill={color} />
              </marker>
            </defs>
            {/* Dashed guide circle */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(156, 163, 175, 0.5)" strokeWidth="3" strokeDasharray="6 4" />
          </svg>

          {/* Rotating Arrow Arc */}
          <motion.div
            animate={{ rotate: isLeft ? -360 : 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              {isLeft ? (
                <path
                  d="M 50 10 A 40 40 0 0 0 10 50"
                  fill="none"
                  stroke={color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  markerEnd={`url(#arrowhead-l)`}
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
                />
              ) : (
                <path
                  d="M 50 10 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  markerEnd={`url(#arrowhead-r)`}
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
                />
              )}
            </svg>
          </motion.div>
        </div>

        {/* Center Icon (Optional, can be removed if real photo is clear enough, but keeping it subtle) */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(0,0,0,0.6)', pointerEvents: 'none', background: 'rgba(255,255,255,0.7)', borderRadius: '50%', padding: '0.4rem', boxShadow: 'var(--shadow-sm)', zIndex: 12 }}>
           {isLeft ? <RotateCcw size={24} strokeWidth={2} /> : <RotateCw size={24} strokeWidth={2} />}
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
