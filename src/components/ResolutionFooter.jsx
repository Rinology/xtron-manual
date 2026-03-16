import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Store } from 'lucide-react';

/**
 * Shared Resolution Footer component for all troubleshooting guides.
 * Shows 3 CTA options: KakaoTalk channel, nationwide dealer map, local store visit.
 */
export default function ResolutionFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginTop: '2.5rem' }}
    >
      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap', fontWeight: 600 }}>
          스스로 해결이 어렵다면?
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>

        {/* KakaoTalk */}
        <a
          href="http://pf.kakao.com/_xnknxkj"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            background: '#FEE500',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageCircle size={22} color="#3b1f00" />
            </div>
            <div>
              <strong style={{ display: 'block', color: '#3b1f00', fontSize: '0.95rem' }}>카카오톡 채널 상담</strong>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)' }}>퀄리스포츠 본사 공식 채널</p>
            </div>
          </div>
        </a>

        {/* Dealer Map */}
        <a
          href="https://qualisports.kr/board/free/agency_list_with_map.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={22} color="#2563eb" />
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem' }}>전국 대리점 안내</strong>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>지도에서 가까운 매장 찾기</p>
            </div>
          </div>
        </a>

        {/* Local Store */}
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Store size={22} color="#059669" />
          </div>
          <div>
            <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem' }}>구매 매장 방문 수리</strong>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>구매하신 매장에서 점검·수리 권장</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
