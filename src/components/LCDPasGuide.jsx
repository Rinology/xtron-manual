import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Activity, Zap, TrendingDown, AlertCircle } from 'lucide-react';

export default function LCDPasGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="lcd-pas" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <Activity color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>PAS (페달 어시스트) 단계 설정</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          전기자전거에서 페달을 굴릴 때 <strong>모터가 밀어주는 힘의 세기</strong>를 뜻합니다.<br/>
          0단계부터 최대 5단계까지, 탑승자의 체력과 주행 환경(언덕, 평지)에 맞추어 설정할 수 있습니다.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Step 1: Up */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#059669', flexShrink: 0 }}>
            ▲
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              PAS 단수 올리기
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              왼쪽 계기판 조작부의 <strong>상단(▲) 버튼을 짧게(클릭) 누르면</strong> 화면의 숫자가 1단씩 증가합니다.<br/>단계를 높일수록 페달링은 훨씬 가벼워지고 모터 지원 속도 구간이 올라갑니다.<br/>(대신 배터리 소모는 빠르게 발생합니다.)
            </p>
            <Zoom>
              <img src="https://placehold.co/600x300?text=Press+UP+to+Increase+PAS" alt="PAS 올리기" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2: Down */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ef4444', flexShrink: 0 }}>
            ▼
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              PAS 단수 내리기
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              주행 중 안정감이 필요하거나 내리막길에서는 <strong>하단(▼) 버튼을 짧게 눌러</strong> 단계를 낮춥니다.<br/>
              화면에 <strong>0단</strong>이 표시되면 모터 개입이 완전히 차단되어 순수 다리 힘으로만 움직이는 일반 자전거 상태가 됩니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x300?text=Press+DOWN+to+Decrease+PAS" alt="PAS 내리기" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderLeft: '4px solid #10b981',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <AlertCircle color="#10b981" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#047857', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>출발 시 권장 사항</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            고단(4~5단)에 둔 상태로 출발하면 모터가 갑자기 강한 힘으로 튀어나가 놀라거나 전복될 위험이 있습니다. <strong>항상 1단 모드로 안전하게 출발</strong>한 뒤 평지에서 단수를 순차적으로 올리는 것을 습관화하세요!
          </p>
        </div>
      </motion.div>

    </section>
  );
}
