import React from 'react';
import { Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import ResolutionFooter from './ResolutionFooter';

const NoiseFenderGuide = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="noise-fender" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'rgba(168, 85, 247, 0.05)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Wrench color="#7c3aed" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: '#7c3aed', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>모터/흙받이 주변 진동 소음</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          모터가 돌 때 나는 금속성 <strong>"징징", "위잉"</strong> 진동음은 모터 내부 고장이 아닌 <strong>흙받이(머드가드) 부품의 떨림</strong>인 경우가 대부분입니다.<br />
          (특히 짐받이 일체형 흙받이가 달린 모델)
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Step 1 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#7c3aed', flexShrink: 0 }}>
            1
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              소음 발생 위치 특정
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              자전거를 세워 손으로 뒷바퀴를 돌려 보거나, 천천히 주행하면서 소음이 어느 방향에서 들리는지 귀를 기울여 보세요.<br/>
              <strong>흙받이(뒤 덮개)나 짐받이 연결 부위에서 가장 크게 들린다면</strong> 흙받이 마찰 소음입니다.
            </p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#7c3aed', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              절연테이프 보강으로 해결
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              흙받이를 지지하는 금속 지지대와 흙받이 본체가 맞닿는 접촉면에서 금속끼리 비벼져 소리가 납니다.
            </p>
            <ol style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>스패너 8mm + 육각렌치 3mm</strong>로 흙받이 지지대 볼트를 풀어 분리합니다.</li>
              <li>맞닿는 면 모서리에 <strong>전기테이프(절연테이프)</strong>를 1~2겹 감아 완충재 역할을 합니다.</li>
              <li>다시 볼트를 단단히 잠그고 소음이 사라졌는지 확인합니다.</li>
            </ol>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#7c3aed', flexShrink: 0 }}>
            3
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              흙받이 연결 볼트 전체 재조임
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              주행 진동으로 흙받이 연결 볼트 전체가 서서히 풀릴 수 있습니다.<br/>
              흙받이 주변 <strong>모든 볼트(상단 고정 볼트 및 양쪽 지지 볼트)</strong>를 육각렌치로 단단히 다시 조여주세요.
            </p>
          </div>
        </motion.div>
      </div>

      <ResolutionFooter />
    </section>
  );
};

export default NoiseFenderGuide;
