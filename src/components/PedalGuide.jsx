import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, AlertCircle, ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';

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
        <h3 style={{ fontSize: '2rem', color: 'var(--ci-primary)' }}>페달 장착 방법</h3>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}
      >
        {/* Step 1: 좌우 확인 */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', fontSize: '6rem', fontWeight: 900, color: 'var(--surface-border)', lineHeight: 1, zIndex: 0 }}>1</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--ci-primary)' }}>L/R</span> 표시 확인
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              페달 나사선 끝부분에 알파벳 <strong>L(왼쪽)</strong>과 <strong>R(오른쪽)</strong>이 각인되어 있습니다. 방향을 반드시 확인 후 장착하세요.
            </p>
            {/* TODO: L/R 확인 이미지 연결 */}
            <img 
              src="https://placehold.co/400x300?text=L/R+Check\n(/images/pedal/pedal_lr_check.jpg)" 
              alt="페달 L/R 확인 방법" 
              style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)' }} 
            />
          </div>
        </motion.div>

        {/* Step 2: 우측 페달 */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--ci-secondary)' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <ArrowRightCircle size={20} color="var(--ci-secondary)" />
            우측(R) 페달 조립
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            자전거 진행 방향의 오른쪽 체인이 있는 크랭크암에 장착합니다. 나사를 <strong>시계 방향(오른쪽)</strong>으로 돌려 체결합니다.
          </p>
          {/* TODO: 우측 페달 장착 GIF 연결 */}
          <img 
            src="https://placehold.co/400x300?text=Right+Pedal+Install+GIF\n(/images/pedal/pedal_right_install.gif)" 
            alt="우측 페달 장착" 
            style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', marginTop: '0.5rem' }} 
          />
        </motion.div>

        {/* Step 3: 좌측 페달 */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid var(--ci-primary)' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <ArrowLeftCircle size={20} color="var(--ci-primary)" />
            좌측(L) 페달 조립
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            자전거 진행 방향의 왼쪽 크랭크암에 장착합니다. 나사를 <strong>반시계 방향(왼쪽)</strong>으로 돌려 체결합니다.
          </p>
          {/* TODO: 좌측 페달 장착 GIF 연결 */}
          <img 
            src="https://placehold.co/400x300?text=Left+Pedal+Install+GIF\n(/images/pedal/pedal_left_install.gif)" 
            alt="좌측 페달 장착" 
            style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', marginTop: '0.5rem' }} 
          />
        </motion.div>
      </motion.div>

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
