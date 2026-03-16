import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { PersonStanding, PowerOff, ShieldCheck } from 'lucide-react';

export default function LCDWalkModeGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="lcd-walk-mode" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <PersonStanding color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>도보 모드 (Walk Mode, 끌바)</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          가파른 언덕이나 육교, 횡단보도 등 <strong>자전거에서 내려서 끌고 가야만 하는 장소</strong>에서<br/>
          무거운 전기자전거를 사람의 걷는 속도(시속 약 4~6km)로 편하게 밀어주는 어시스트 기능입니다.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Step 1: 실행하기 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            1
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              도보 모드 작동
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              자전거가 <strong>완전히 멈춘 상태(정차 중)</strong>에서 화면 좌측 조작부의 <strong>하단 화살표(▼) 버튼을 계속 누르고 있으면</strong> 모터가 부드럽게 돌아가며 걷는 속도에 맞춰 전진합니다.
            </p>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--surface-border)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--ci-secondary)" style={{ display: 'inline', marginRight: '5px' }} />
              <strong>주의:</strong> 계단이나 너무 가파른 경사에서는 강제로 밀면 모터에 무리가 갈 수 보조 수단으로만 써주세요.
            </div>
          </div>
        </motion.div>

        {/* Step 2: 해제하기 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#dc2626', flexShrink: 0 }}>
            <PowerOff size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              도보 모드 중단
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              누르고 걷던 <strong>하단 버튼에서 손가락을 떼기만 하면</strong> 즉시 모터의 어시스트가 중단됩니다.<br/>추가적으로 양쪽 브레이크 레버를 잡아도 즉시 기능이 차단됩니다.
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
