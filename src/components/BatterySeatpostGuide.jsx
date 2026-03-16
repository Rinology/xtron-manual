import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Key, AlertTriangle } from 'lucide-react';

export default function BatterySeatpostGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="battery-seatpost" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>

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
          <Key color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>싯포스트 배터리 탈착 가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          안장 포스트 내부에 배터리가 내장된 <strong>싯포스트 일체형 배터리</strong> 모델의 장착 및 분리 방법입니다.<br/>
          도난 방지 열쇠 잠금 구조가 포함되어 있어, 분리 전 반드시 열쇠를 해제해야 합니다.
        </p>
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
              배터리 장착하기
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              내용을 여기에 작성해 주세요.<br/>
              (각 단계별 설명과 함께 아래 이미지 자리에 사진을 교체하면 됩니다.)
            </p>
            <Zoom>
              <img
                src="https://placehold.co/600x400?text=싯포스트+배터리+장착+사진"
                alt="싯포스트 배터리 장착"
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
              배터리 분리하기
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              내용을 여기에 작성해 주세요.<br/>
              (열쇠 잠금 해제 → 싯클램프 레버 → 배터리 포스트 위로 당겨 분리)
            </p>
            <Zoom>
              <img
                src="https://placehold.co/600x400?text=싯포스트+배터리+분리+사진"
                alt="싯포스트 배터리 분리"
                style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }}
              />
            </Zoom>
          </div>
        </motion.div>
      </div>

      {/* 주의사항 */}
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
            계기판의 M버튼을 3초간 눌러 전원을 완전히 끈 뒤, 열쇠를 돌려 잠금 해제 후 배터리를 분리해 주세요. 전원이 켜진 채로 배터리를 강제 분리하면 전장 회로에 과부하가 발생할 수 있습니다.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
