import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export default function BrakeGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="brake-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <ShieldAlert color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>안전한 제동 및 브레이크 가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          전기자전거는 일반 자전거보다 무겁고 평균 속도가 빨라 <strong>올바른 제동 습관</strong>이 사고를 예방하는 가장 훌륭한 방법입니다.<br/>
          자전거에 내장된 '모터컷(Motor-Cut)' 전자 제동 시스템을 이해하고 활용해 보세요.
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
              양쪽 브레이크 동시 사용
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              한쪽(특히 앞브레이크)만 강하게 잡으면 타이어가 미끄러지거나 자전거가 앞구르기(잭나이프 현상)를 할 위험이 있습니다.<br/>
              항상 <strong>양쪽 레버(앞/뒤)를 부드럽게 동시에</strong> 잡아 제동 거리를 안정적으로 확보하세요.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Use+Both+Brakes+Simultaneously" alt="양쪽 브레이크 동시 파지 사진" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4f46e5', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              모터 전원 즉각 차단 (모터컷 시스템)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              퀄리스포츠 전기자전거는 왼쪽, 오른쪽 어느 브레이크 레버를 당기든 <strong>단 1mm라도 당겨지면 즉시 모터에 공급되는 동력을 0.1초 만에 강제 차단</strong>하는 '모터컷 기능' 스위치가 레버 내부에 내장되어 있습니다.<br/>크루즈 모드나 예기치 않은 급발진 시 브레이크 레버를 살짝만 건드려도 즉각 해제됩니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Motor+Cut-off+System+in+Action" alt="브레이크 모터컷 배선 시스템 안내" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
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
        <AlertCircle color="#ef4444" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>내리막길 브레이크 베이퍼 록(Vapor Lock) 주의</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            긴 고갯길이나 산악 내리막에서 지나치게 브레이크를 계속 잡고 내려가면 과열로 인해 제동력이 일시 상실되는 위험이 생깁니다. <strong>브레이크를 잡았다 뗐다를 반복</strong>(펌핑 브레이크)하며 열차단 시간을 벌어주세요.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
