import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ZapOff, CheckCircle } from 'lucide-react';
import ResolutionFooter from './ResolutionFooter';

export default function ErrorPowerGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="error-power-guide" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ZapOff color="#ef4444" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: '#ef4444', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>전원이 안 켜짐 (Error 01) 해결가이드</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          M버튼을 길게 눌러도 계기판에 전혀 반응이 없거나 주행 중 갑자기 전원이 툭 꺼지는 현상의 핵심 원리 점검입니다.<br/>
          고장 접수 전 <strong>90% 이상이 자가 조치로 해결</strong>될 수 있는 단순 물리적 접촉 불량 문제입니다.
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
              1단계: 배터리 잔량 및 어댑터 확인
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              단순 방전일 수 있습니다. 충전기를 자전거에 물렸을 때 충전기 어댑터 네모 박스에 <strong>빨간불(충전 중)</strong>이 들어오는지 <strong>초록불(완충 또는 단선)</strong>이 들어오는지 확인하세요. 잔량이 전혀 없다면 1~2시간 이상 충분히 충전 후 다시 시도합니다.
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
              2단계: 싯포스트 하단 열쇠 100% 잠금 확인
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              전원 차단의 가장 빈번한 원인입니다. 배터리를 자전거에 체결하고 열쇠를 꽂아 돌릴 때, <strong>안쪽 끝까지 들어가서 90도 이상 딸깍! 돌아갔는지</strong> 반드시 재확인해야 합니다.<br/>
              열쇠가 덜 돌아가 있으면 도난 방지 핀이 나오지 않아 주행 진동 충격에 의해 전력이 순식간에 끊어집니다.
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Seatpost+Key+Lock+Mechanism" alt="열쇠 100퍼센트 잠금 설명" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
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
              3단계: 프레임 연결 단자 물리적 손상 파악
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              배터리 본체를 뽑아내어 거꾸로 들고, 배터리 구멍과 자전거 차체 바닥에서 올라오는 <strong>은색 핀(단자)</strong>을 라이트로 비춰보세요.<br/>이물질이 잔뜩 끼어있거나 단자 핀 중 하나가 구부러지거나 파손되었다면 전력 공급이 차단됩니다. (이 경우 고객센터 부품 교체 접수)
            </p>
            <Zoom>
              <img src="https://placehold.co/600x400?text=Inspect+Battery+Terminals" alt="배터리 단자 이물질 확인" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>
      <ResolutionFooter />

    </section>
  );
}
