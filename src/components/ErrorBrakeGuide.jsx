import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { VolumeX, CheckCircle, Info } from 'lucide-react';
import ResolutionFooter from './ResolutionFooter';

export default function ErrorBrakeGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="error-brake-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'rgba(234, 179, 8, 0.05)',
          border: '1px solid rgba(234, 179, 8, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <VolumeX color="#ca8a04" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: '#ca8a04', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>주행 중 브레이크(쇳소리) 소음 원인 분석</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          브레이크를 잡을 때 '끼익' 하는 쇳소리가 나거나, 주행 중에 금속 갈리는 소리가 규칙적으로 나는 현상은 <strong>기계식/유압식 디스크 브레이크의 특성 상 매우 흔하며 보통 기계적인 고장이 아닙니다.</strong>
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
              새 자전거의 길들이기 과정 (Bedding-in)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              새 자전거를 샀거나, 새 패드로 교체한 직후에 나는 돼지 멱따는 소리(끼익)는 <strong>정상적인 '길들이기' 전 상태</strong>입니다.<br/>
              디스크 로터 표면에 제동 패드의 입자들이 얇게 묻어나면서 코팅(Bedding-in)이 완료되어야 소음이 사라지고 제동력이 100% 올라옵니다. 어느 정도 속도를 내면서 브레이크를 부드럽게 잡는 동작을 20~30회 반복해 주세요.
            </p>
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
              디스크 로터 오염 확인 (기름, 세차용품)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              자동차처럼 세차 시에 광택제를 뿌리거나, 체인 오일(윤활유)이 디스크 로터(동그란 은색 판)에 조금이라도 튀면 엄청난 소음과 함께 제동력이 완전히 상실됩니다.<br/>
              약국에서 파는 <strong>순수 알코올 솜(스왑)</strong>이나 전용 파츠 클리너로 로터를 깨끗하게 닦아주세요.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Clean+Disc+Rotor+with+Alcohol" alt="알코올 패드로 로터 세척" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            3
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              캘리퍼 위치 틀어짐 (샤샤샥 소음)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              브레이크를 잡지 않고 그냥 굴러갈 때만 '샥, 샥, 샥' 하고 은박지 스치는 소리가 난다면, 패드가 위치한 검은색 박스(캘리퍼)의 정렬이 한쪽으로 미세하게 쏠렸기 때문입니다.<br/>
              이는 볼트를 살짝 풀어 중앙을 다시 맞춘 뒤 조여주는 캘리퍼 정렬 세팅이 필요하며, 근처 자전거 점포에서 쉽게 세팅을 받으실 수 있습니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Caliper+Alignment" alt="캘리퍼 위치 정렬 원리" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>
      <ResolutionFooter />

    </section>
  );
}
