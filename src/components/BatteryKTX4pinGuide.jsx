import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { BatteryCharging, AlertTriangle } from 'lucide-react';

export default function BatteryKTX4pinGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="battery-ktx-4pin" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>

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
          <BatteryCharging color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>KTX 배터리 탈착 가이드 (4핀)</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          프레임 외부 크래들(거치대)에 탈착되는 <strong>KTX형 외장 배터리 — 4핀 커넥터</strong> 모델의 탈착 방법입니다.<br/>
          (사용 모델에 핀 수를 확인 후 올바른 가이드를 참고하세요.)
        </p>
      </motion.div>

      {/* 핀 수 식별 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderLeft: '4px solid #6366f1',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🔌</span>
        <div>
          <h4 style={{ color: '#4f46e5', fontSize: '1rem', marginBottom: '0.4rem', fontWeight: 700 }}>4핀 커넥터 식별 방법</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
            배터리와 프레임이 연결되는 커넥터 내부의 <strong>금속 핀(단자)이 4개</strong> 있으면 이 가이드에 해당합니다.<br/>
            (사진 자리에 4핀 커넥터 확대 사진을 삽입해 주세요.)
          </p>
          <Zoom>
            <img
              src="https://placehold.co/600x300?text=4핀+커넥터+식별+사진"
              alt="4핀 커넥터 식별"
              style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '400px', display: 'block', marginTop: '0.75rem' }}
            />
          </Zoom>
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Step 1: 장착 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#059669', flexShrink: 0 }}>
            ↑
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              배터리 장착하기 (4핀)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              내용을 여기에 작성해 주세요.<br/>
              (크래들 삽입 방향, 4핀 커넥터 연결, 잠금 순서 등을 설명하세요.)
            </p>
            <Zoom>
              <img
                src="https://placehold.co/600x400?text=KTX+4핀+배터리+장착+사진"
                alt="KTX 4핀 배터리 장착"
                style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }}
              />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2: 분리 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#dc2626', flexShrink: 0 }}>
            ↓
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              배터리 분리하기 (4핀)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              내용을 여기에 작성해 주세요.<br/>
              (잠금 버튼 누르기 → 4핀 커넥터 분리 → 배터리 슬라이드 분리 순서)
            </p>
            <Zoom>
              <img
                src="https://placehold.co/600x400?text=KTX+4핀+배터리+분리+사진"
                alt="KTX 4핀 배터리 분리"
                style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }}
              />
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
          <h4 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>분리 전 반드시 전원 차단</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            계기판 M버튼을 3초간 길게 눌러 전원을 끈 뒤 배터리를 분리해 주세요.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
