import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Lightbulb, Info } from 'lucide-react';

export default function LCDLightGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="lcd-light" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <Lightbulb color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>전조등(헤드라이트) 및 야간 화면 켜기</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          전기자전거 본체 메인 배터리에 직접 연결된 강력한 <strong>LED 전조등</strong>을 점등하고, 어두운 무빙 상황에서 속도계를 선명하게 볼 수 있는 <strong>LCD 백라이트</strong>를 제어하는 공용 기능입니다.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Step 1: On/Off */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ca8a04', flexShrink: 0 }}>
            ▲
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              상단 버튼 길게 조작
            </h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <li><strong>켜기:</strong> 조작부의 가장 위에 있는 <strong>상단 화살표(▲) 버튼을 3초 이상 길게 꾹</strong> 누릅니다. 자전거 전방 랜턴이 켜지며 계기판 자체 발광 불빛도 어두운 환경에 맞춰 작동합니다.</li>
              <li><strong>끄기:</strong> 불이 들어온 상태에서 다시 <strong>상단 화살표(▲) 버튼을 3초간 길게</strong> 누르면 LED 스포트라이트와 백라이트가 동시에 소등됩니다.</li>
            </ul>
            <Zoom>
              <img src="https://placehold.co/600x300?text=Press+UP+(3s)+to+Turn+ON+Light" alt="전조등 켜기" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2: Check Visual Status */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ca8a04', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              점등 상태 전면 확인
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              기능이 정상적으로 켜지면 다음과 같이 <strong>세 가지 불빛</strong>이 동시에 작동합니다. 야간 주행 전 모두 점등되었는지 꼭 육안으로 확인하세요.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Zoom>
                  <img src="https://placehold.co/400x300?text=LCD+Backlight+ON" alt="LCD 백라이트 점등" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', cursor: 'zoom-in' }} />
                </Zoom>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: 600 }}>① LCD 야간 백라이트</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Zoom>
                  <img src="https://placehold.co/400x300?text=Headlight+ON" alt="전면 헤드라이트 점등" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', cursor: 'zoom-in' }} />
                </Zoom>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: 600 }}>② 전면 고휘도 헤드라이트</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Zoom>
                  <img src="https://placehold.co/400x300?text=Taillight+ON" alt="후방 후미등 점등" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', cursor: 'zoom-in' }} />
                </Zoom>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: 600 }}>③ 후방 안전 후미등</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(47, 98, 134, 0.05)',
          border: '1px solid rgba(47, 98, 134, 0.2)',
          borderLeft: '4px solid var(--ci-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <Info color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>주간 주행 시 전력 관리 팁</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            고휘도 LED 전조등은 모터가 쓰는 메인 배터리의 전력을 적지 않게 소모합니다.<br/>시야 확보가 용이한 <strong>햇빛이 쨍한 주간에는 전조등을 꺼두시는 것</strong>이 전체 주행 거리를 조금이라도 더 길게 유지하는 비결입니다. 단, 터널이나 해 질 녘에는 타인에게 나를 알리기 위해 꼭 점등하세요.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
