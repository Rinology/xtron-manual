import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Gauge, ShieldAlert, AlertCircle } from 'lucide-react';

export default function LCDCruiseGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="lcd-cruise-mode" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <Gauge color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>크루즈 모드 (정속 주행)</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          자동차가 액셀을 계속 밟지 않아도 속도를 유지해주는 것처럼, 전기자전거도 <strong>최종 도달 속도를 자동으로 유지(정속 주행)해주는 '크루즈 시스템'</strong>이 탑재되어 있습니다.<br/>장거리 직진 도로에서 피로도를 크게 줄여줍니다.
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
              주행 중 자동 속도 고정
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              장애물이 없는 안전한 직선 주로에서 가속 후 손이나 발을 멈추고 <strong>주행 중인 상태</strong>에서 <strong>하단(▼) 버튼을 약 3초 이상 길게 꾹 누릅니다.</strong><br/>
              화면에 <strong>"P" 아이콘 또는 크루즈 기호</strong>가 켜졌다면, 페달과 스로틀 조작을 아예 멈추고 버튼에서 손을 떼도 자전거가 현재 달리고 있던 속도 그대로 전진합니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x300?text=Press+and+Hold+DOWN+While+Riding" alt="크루즈 모드 안내" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2: 해제하기 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#dc2626', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              긴급 해제 방법
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              모터가 계속 돌기 때문에 돌발 상황 시 직관적으로 끊어내는 것이 생명줄입니다.<br/>
              자동 주행 중 <strong>브레이크 손잡이를 살짝이라도 당기면 안전장치(모터컷)에 의해 즉시 크루즈 모드가 해제되고 감속</strong>합니다. 
            </p>
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #ef4444', fontSize: '0.9rem', color: '#ef4444' }}>
              <ShieldAlert size={16} style={{ display: 'inline', marginRight: '5px' }} />
              브레이크 조작 외에도 상/하 버튼 클릭스 등 어떤 조작을 가해도 즉각 정속 주행은 풀리도록 설계되어 있습니다.
            </div>
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
        <AlertCircle color="#ef4444" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>위험 요소 (곡선, 보행자로)</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            자전거 전용 순환로나 쭉 뻗은 길 외에 곡선 차로, 보행자 밀집 구역에서는 <strong>절대로 크루즈를 사용하지 마십시오.</strong> 좁은 코너에서 자동 직진 추진력이 남아있을 경우 크게 전도될 수 있습니다.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
