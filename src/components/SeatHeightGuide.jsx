import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Wrench, AlertTriangle } from 'lucide-react';

export default function SeatHeightGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="seat-height-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'var(--ci-primary-light)',
          border: '1px solid rgba(47, 98, 134, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Wrench color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>안장 높이 조절 가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          탑승자의 신장과 다리 길이에 맞추어 안장의 높이를 쾌적하게 조절하는 방법입니다.<br/>
          올바른 안장 높이는 피로도를 줄이고 주행 효율을 높여줍니다.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Step 1 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            1
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              레버 열기 및 높이 맞추기
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              싯클램프에 열쇠 구멍이 있다면 잠금을 풀고, 손으로 <strong>QR 레버를 엽니다.</strong><br/>
              페달을 가장 아래로 내린 상태에서 발을 올렸을 때 무릎이 살짝 구부러지는 높이가 가장 적절합니다. 조절 후 레버를 단단히 닫아줍니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Seat+Clamp+Lever+Release" alt="안장 QR레버 조절" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderLeft: '4px solid #ef4444',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <AlertTriangle color="#ef4444" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>위험 요소: 배터리(싯포스트) 간섭</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            키가 작으신 분이나 안장을 과하게 낮출 경우, 안장 밑으로 내려온 싯포스트(배터리 내장형) 하단부가 땅이나 요철 표면에 닿아 <strong>배터리가 파손될 위험</strong>이 있습니다. 지면과 배터리 사이에 최소한의 여유 공간을 확보해 주세요.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
