import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Settings, Info } from 'lucide-react';

export default function GearGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="gear-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <Settings color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>기계식 기어 변속 가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          전기적인 PAS 시스템(모터 지원)과 별도로, 탑승자가 실제로 구르는 다리 힘과 속도를 체인으로 조절하는 <strong>물리적 기어비 변속</strong> 방법입니다.<br/>
          경사도에 맞춰 기어를 잘 활용해야 배터리와 모터 효율을 극대화할 수 있습니다.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Step 1 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#059669', flexShrink: 0 }}>
            ▲
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              고단(빠른 속도)으로 변속
            </h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <li>평지나 내리막길에서 페달을 돌릴 때 발이 너무 가벼워 허당을 친다면, <strong>핸들바에 위치한 변속 레버의 아래쪽(또는 + 버튼)을 눌러 고단</strong>으로 올립니다.</li>
              <li>체인이 작은 톱니바퀴로 이동하며, 다리 회전은 무거워지는 대신 1회 회전당 나아가는 전진 거리가 크게 늘어납니다.</li>
            </ul>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ef4444', flexShrink: 0 }}>
            ▼
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              저단(오르막용)으로 변속
            </h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <li>가파른 언덕길을 만나 다리 힘이 많이 들 때는 레버의 위쪽(또는 큰 스위치)을 깊게 밀어 <strong>저단인 1~2단 방향</strong>으로 내립니다.</li>
              <li>체인이 큰 톱니바퀴로 이동하며 속도는 느려지지만, 훨씬 적은 다리 힘으로도 모터 성능을 보조받아 오르막을 쉽게 탈출할 수 있습니다.</li>
            </ul>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Gear+Shifter+Action" alt="기어 시프터 조작 사진" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(234, 179, 8, 0.05)',
          border: '1px solid rgba(234, 179, 8, 0.2)',
          borderLeft: '4px solid #ca8a04',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <Info color="#ca8a04" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#ca8a04', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>치명적 파손 주의: 정지 중 변속 금지</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            변속기는 오직 체인이 앞으로 굴러가고 있을 때만 이동하도록 설계되어 있습니다.<br/><strong>자전거가 멈춰 있는 상태에서 강제로 무리하게 변속기를 꺾으면 내부 부속이 전부 박살납니다.</strong> 반드시 페달을 밟아 앞으로 달리는 주행 상태에서만 1단씩 순차적으로 변속해 주세요.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
