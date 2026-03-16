import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Wind, Activity } from 'lucide-react';
import ResolutionFooter from './ResolutionFooter';

export default function ErrorTireGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="error-tire-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <Wind color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>타이어 공기압 저하 확인 및 관리 세팅</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          배터리가 100%인데도 자전거가 무겁게 나가거나, 커브를 돌 때 흔들흔들(출렁거림) 불안정하다면 타이어 공기압이 심각하게 부족해 펑크 위험에 노출된 상태입니다.<br/>
          자전거도 자동차처럼 1~2달에 한 번은 꼭 바람을 보충해 줘야 합니다.
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
              자가 압력 테스트 (엄지 누르기)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              집에서 가장 직관적으로 알아보는 방법입니다. 앞/뒤 타이어 가운데를 엄지손가락으로 힘껏 눌렀을 때, <strong>쑥 들어가거나 물렁물렁하다면 당장 바람을 넣어야 하는 상태</strong>입니다.<br/>
              적정 공기압이면 성인 남성이 힘 있게 눌러도 거의 살갗만 들어갈 정도로 돌덩이처럼 탄탄해야 합니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Thumb+Press+Tire+Pressure+Check" alt="타이어 압력 엄지 테스트" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              측면 표기 적정 PSI 확인 및 보충
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              모든 자전거 타이어의 옆면(고무 측면)에는 해당 타이어의 적정 최대 공기압 수치인 <strong>xxx PSI</strong> 표시가 양각으로 돌출되어 적혀 있습니다.
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <li><strong>두꺼운 타이어(팻바이크):</strong> 보통 최대 30 PSI 내외. (20~25 PSI 유지 권장)</li>
              <li><strong>일반 타이어:</strong> 보통 최대 45~65 PSI 내외. (최대치의 80%~90% 유지 권장)</li>
            </ul>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              압력 게이지가 달린 바닥형 펌프(슈레더 밸브 겸용)나 자동 전동 펌프를 꽂아 기압을 채워 넣어 줍니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Check+Tire+Sidewall+PSI" alt="타이어 측면 PSI 제원" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>
      <ResolutionFooter />

    </section>
  );
}
