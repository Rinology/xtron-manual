import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Wrench, AlertCircle, ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';
import tempLogo from '../../public/images/Xtron_x_Qualisports_Logo_Black.png';

export default function PedalGuide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="pedal" style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--ci-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>
          <Wrench size={28} color="var(--ci-primary)" />
        </div>
        <h3 className="guide-title">페달 장착 방법</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Step 1: 좌우 확인 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel">
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            1
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--ci-primary)' }}>L/R</span> 표시 확인
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              페달 나사선 끝부분에 알파벳 <strong>L(왼쪽)</strong>과 <strong>R(오른쪽)</strong>이 각인되어 있습니다. 방향을 반드시 확인 후 장착하세요.
            </p>
            <Zoom>
              <img src={tempLogo} alt="확대 테스트용 임시 로고" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '400px' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2: 우측 페달 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1rem', left: '2rem', width: '2px', height: '1rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-secondary)', flexShrink: 0 }}>
            2
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <ArrowRightCircle size={18} color="var(--ci-secondary)" />
              우측(R) 페달 조립
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              자전거 진행 방향의 오른쪽 체인이 있는 크랭크암에 장착합니다. 나사를 <strong>시계 방향(오른쪽)</strong>으로 돌려 체결합니다.
            </p>
            <Zoom>
              <img src={tempLogo} alt="우측 페달 장착" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '400px' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 3: 좌측 페달 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1rem', left: '2rem', width: '2px', height: '1rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            3
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <ArrowLeftCircle size={18} color="var(--ci-primary)" />
              좌측(L) 페달 조립
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              자전거 진행 방향의 왼쪽 크랭크암에 장착합니다. 나사를 <strong>반시계 방향(왼쪽)</strong>으로 돌려 체결합니다.
            </p>
            <Zoom>
              <img src={tempLogo} alt="좌측 페달 장착" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '400px' }} />
            </Zoom>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginTop: '1.5rem',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          gap: '1rem'
        }}
      >
        <AlertCircle color="#ef4444" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h5 style={{ color: '#dc2626', fontSize: '1rem', marginBottom: '0.25rem' }}>주의사항</h5>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            처음에는 손으로 부드럽게 돌려 나사선이 어긋나지 않게 끼운 후, 기본 제공된 스패너 도구를 이용해 단단히 조여주세요. 반대로 돌릴 경우 크랭크 나사선이 파손될 수 있습니다.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
