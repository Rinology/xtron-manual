import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ArrowLeftRight, HardDrive } from 'lucide-react';

export default function FoldingGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="folding-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <ArrowLeftRight color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>자전거 폴딩 (접기/펴기) 완벽 가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          전기자전거를 차량 트렁크에 싣거나 실내 보관 시 부피를 줄이기 위해 접는 방법입니다.<br/>순서를 정해 거쳐야 부품 간섭 없이 완벽히 접힐 수 있습니다.
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
              핸들/안장 내리기
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              먼저 부피 축소를 위해 핸들바의 높이를 최하단으로 부드럽게 내립니다.<br/>
              그다음 <strong>안장(배터리 팩)을 바닥에 닿을 때까지 완전히 밀어 내립니다.</strong> 접었을 때 배터리 하단이 바닥 지지대 역할을 하게 됩니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Lower+Handlebar+and+Seat" alt="핸들과 안장 내리기" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ca8a04', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              핸들 포스트 접기 및 킥스탠드 올리기
            </h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <li>핸들 포스트 하단 고정 부위의 이중 잠금장치를 해제하여 핸들바를 완전히 차체 옆면으로 꺾어 접습니다.</li>
              <li>돌출부를 줄이기 위해 <strong>자전거 페달을 누르면서 접어넣고</strong>, 주차되어 있던 <strong>킥스탠드를 발로 차 올려 세웁니다.</strong></li>
            </ul>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4f46e5', flexShrink: 0 }}>
            3
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              메인 프레임 반으로 접어 마무리
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              자전거 한가운데 위치한 가장 큰 메인 레버의 보조 슬라이드를 위로 밀며 레버를 옆으로 젖힙니다.<br/>
              자전거가 반으로 접히도록 프레임의 앞과 뒤를 밀어 접어 자석이 맞붙도록 마무리합니다. 펼 때는 방금까지의 순서를 <strong>역순으로</strong> 진행하세요.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Fold+Main+Frame" alt="메인 프레임 접기" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
