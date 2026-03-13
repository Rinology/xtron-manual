import React from 'react';
import { motion } from 'framer-motion';
import { Wind, AlertCircle } from 'lucide-react';

export default function TirePressureGuide() {
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
    <section id="tire-pressure" style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--ci-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>
          <Wind size={28} color="var(--ci-primary)" />
        </div>
        <h3 style={{ fontSize: '2rem', color: 'var(--ci-primary)' }}>타이어 공기압 체크</h3>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}
      >
        {/* Step 1 */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', fontSize: '6rem', fontWeight: 900, color: 'var(--surface-border)', lineHeight: 1, zIndex: 0 }}>1</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              적정 공기압 수치 확인
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              타이어 측면을 보면 <strong>MAX 45 PSI</strong> 와 같이 장착된 타이어의 최대/적정 공기압 수치가 적혀 있습니다. 이 수치를 먼저 확인하세요.
            </p>
            <img 
              src="https://placehold.co/400x300?text=Tire+PSI+Info" 
              alt="타이어 측면 PSI 표기" 
              style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)' }} 
            />
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            에어펌프 연결 및 주입
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            공기주입구(밸브) 캡을 열고 펌프를 연결합니다. 게이지가 있는 펌프를 사용하여 확인된 적정 수치의 <strong>약 80~90%</strong> 정도만 채우는 것을 권장합니다 (겨울철 제외). 손가락으로 눌렀을 때 탄탄한 느낌이 나야 합니다.
          </p>
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
            여름철에는 지면 온도가 높아 내부 공기가 팽창할 수 있으므로 최대치(MAX)까지 채우지 마세요. 펑크의 원인이 될 수 있습니다.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
