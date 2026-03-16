import React from 'react';
import { Disc } from 'lucide-react';
import { motion } from 'framer-motion';
import ResolutionFooter from './ResolutionFooter';

const NoiseInspectionGuide = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="noise-brake" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Disc color="#2563eb" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: '#2563eb', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>브레이크 소음 점검 가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          제동 시 혹은 주행 도중 규칙적으로 들리는 <strong>쇳소리, 끼익 소리</strong>는 브레이크 디스크(로터)와 패드의 마찰 구조에서 발생합니다.<br/>
          소리의 유형별로 원인과 해결책이 다르므로 아래 유형을 먼저 파악해 주세요.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Case 1: 서걱서걱 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', color: '#1d4ed8', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, alignSelf: 'flex-start' }}>
            유형 1
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              칼 가는 소리 (서걱·샤샥 — 주행 중 규칙적)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              바퀴 한 바퀴 회전 주기에 맞추어 <strong>규칙적으로 들리는 금속 마찰음</strong>입니다.<br/>
              디스크 로터 표면이 브레이크 패드 또는 캘리퍼 몸체와 미세하게 닿고 있다는 신호입니다.
            </p>
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>해결:</strong> 캘리퍼 고정 볼트 2개를 살짝 풀고, 브레이크를 꽉 쥔 채 다시 볼트를 조여 캘리퍼를 중앙으로 정렬해 주세요. (캘리퍼 정렬)
            </div>
          </div>
        </motion.div>

        {/* Case 2: 끼익 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', color: '#1d4ed8', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, alignSelf: 'flex-start' }}>
            유형 2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              제동 시 끼익 소리 (레버 당길 때만 발생)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              브레이크를 잡을 때만 들리는 높은 음의 찢어지는 소리입니다. 패드와 로터 표면이 마찰될 때 발생하는 <strong>자연스러운 현상</strong>으로, 새 자전거이거나 주행 거리 초반에 특히 많이 납니다.
            </p>
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid #3b82f6', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>해결:</strong> 일정 주행 거리 후 자연스럽게 사라집니다. (Bedding-in) 조기 해소를 원하면 알코올 솜으로 디스크 로터 표면을 닦아주세요.
            </div>
          </div>
        </motion.div>

        {/* Case 3: 딱딱 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', color: '#b91c1c', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, alignSelf: 'flex-start' }}>
            유형 3 (정비 필요)
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              딱딱 거리는 금속 충돌음 (요주의)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              캘리퍼 금속 몸체가 로터 면에 직접 충돌하거나, 패드 고정 핀이 이탈하였을 때 나는 소리입니다. <strong>제동력 저하로 이어질 수 있어 즉각 점검</strong>이 필요합니다.
            </p>
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '3px solid #ef4444', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: '#b91c1c' }}>해결:</strong> 정확한 캘리퍼 정렬 재세팅 및 패드 고정 상태 확인이 필요합니다. 아래 해결 방법을 통해 전문 정비를 받으세요.
            </div>
          </div>
        </motion.div>
      </div>

      <ResolutionFooter />
    </section>
  );
};

export default NoiseInspectionGuide;
