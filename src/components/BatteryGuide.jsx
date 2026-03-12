import React from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Zap, ShieldCheck } from 'lucide-react';

export default function BatteryGuide() {
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <section id="battery" style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--ci-secondary-light)', padding: '0.75rem', borderRadius: '12px' }}>
          <BatteryCharging size={28} color="var(--ci-secondary)" />
        </div>
        <h3 style={{ fontSize: '2rem', color: 'var(--ci-primary)' }}>배터리 충전 방법</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <motion.div 
          variants={itemVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: '-50px' }}
          className="glass-panel" 
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
        >
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0
          }}>
            1
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>전원 끄기 및 분리</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>먼저 자전거의 전원을 완전히 끄고, 열쇠를 이용해 잠금을 해제한 후 배터리를 프레임/싯포스트에서 분리합니다.</p>
            {/* TODO: 배터리 탈착 GIF 연결 */}
            <img 
              src="https://placehold.co/600x300?text=Battery+Detach+GIF\n(/images/battery/battery_detach.gif)" 
              alt="배터리 탈착" 
              style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '400px' }} 
            />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: '-50px' }}
          className="glass-panel" 
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}
        >
          {/* subtle line connecting steps */}
          <div style={{ position: 'absolute', top: '-1rem', left: '2rem', width: '2px', height: '1rem', background: 'var(--surface-border)' }}></div>
          
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0
          }}>
            2
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>충전기 단자 결합</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>충전기의 단자를 배터리의 충전 포트에 먼저 꽂아줍니다. (딸깍 소리가 날 때까지 밀어 넣습니다.)</p>
            {/* TODO: 특수 충전 단자 이미지 연결 */}
            <img 
              src="https://placehold.co/600x300?text=Charger+Port+Image\n(/images/battery/battery_charge.jpg)" 
              alt="충전기 연결 포트" 
              style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '400px' }} 
            />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: '-50px' }}
          className="glass-panel" 
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: '-1rem', left: '2rem', width: '2px', height: '1rem', background: 'var(--surface-border)' }}></div>
          
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0
          }}>
            3
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>전원에 플러그 연결</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>그 다음, 충전기의 220V 콘센트 플러그를 벽면 전원에 연결합니다.</p>
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1rem', marginTop: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
            <Zap size={18} />
            <span style={{ fontWeight: 600 }}>충전 중 (적색 표시)</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>어댑터에 빨간 불이 들어오면 정상적으로 충전이 진행 중인 상태입니다.</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: `1px solid var(--ci-secondary)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ci-secondary)' }}>
            <ShieldCheck size={18} />
            <span style={{ fontWeight: 600 }}>충전 완료 (녹색 표시)</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>어댑터에 녹색 불이 들어오면 완충된 것입니다. 즉시 플러그를 뽑아주세요.</p>
        </div>
      </div>
    </section>
  );
}
