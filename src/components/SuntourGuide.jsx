import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Settings, AlertCircle, Wrench, Check } from 'lucide-react';

export default function SuntourGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="suntour" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--ci-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>
          <Settings size={28} color="var(--ci-primary)" />
        </div>
        <h3 className="guide-title" style={{ fontSize: '2rem', color: 'var(--ci-primary)', margin: 0 }}>썬투어 안장 서스펜션 교체 가이드</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2rem',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          gap: '1rem'
        }}
      >
        <AlertCircle color="#dc2626" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h5 style={{ color: '#dc2626', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>안전 안내 사항</h5>
          <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>안장 교체 작업 중 자전거가 넘어지지 않도록 <strong>안정적으로 거치</strong>해 주십시오.</li>
            <li>조립 후 반드시 <strong>권장 토크(Torque)</strong>로 볼트를 조여 주행 중 안장이 흔들리거나 빠지지 않도록 주의하십시오.</li>
          </ul>
        </div>
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Step 1: 준비물 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            <Wrench size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>1. 필요한 준비물</h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>썬투어(Suntour) 서스펜션 싯포스트</strong></li>
              <li><strong>육각 렌치 세트</strong> (주로 5mm ~ 6mm)</li>
              <li>작업용 장갑</li>
            </ul>
          </div>
        </motion.div>

        {/* Step 2: 기존 싯포스트 및 안장 분리 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>2. 기존 싯포스트 분리 및 안장 탈거</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              기존 자전거에 설치된 싯포스트를 프레임에서 분리한 후, 상단 육각 볼트를 풀어 안장(Saddle)만 분리해 냅니다.
            </p>
            <div style={{ width: '100%', aspectRatio: '16/9', maxWidth: '600px', background: 'var(--bg-color)', border: '2px dashed var(--surface-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', margin: '0 auto' }}>
              [향후 추가]<br/>기존 안장의 육각 볼트를 푸는 모습
            </div>
          </div>
        </motion.div>

        {/* Step 3: 썬투어 싯포스트에 안장 결합 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            3
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>3. 썬투어 싯포스트에 안장 레일 결합</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              분리한 안장의 하단 레일을 썬투어 싯포스트의 마운트에 맞추어 올립니다.<br/>
              이후 측면의 육각 볼트를 이용하여 안장의 <strong>수평 각도</strong>를 맞추고 강하게 체결해 줍니다.
            </p>
            <div style={{ width: '100%', aspectRatio: '16/9', maxWidth: '600px', background: 'var(--bg-color)', border: '2px dashed var(--surface-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', margin: '0 auto' }}>
              [향후 추가]<br/>썬투어 싯포스트와 안장을 결합하는 모습
            </div>
          </div>
        </motion.div>

        {/* Step 4: 프레임 장착 및 스프링 장력 조절 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            4
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>4. 프레임 장착 및 스프링 장력 조절(Preload)</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              결합이 완료된 싯포스트를 자전거 프레임에 넣고 높이를 맞춘 후 QR 레버를 닫아 고정합니다.<br/>
              탑승자의 <strong>체중에 맞게</strong> 하단의 장력 조절 육각 볼트(Preload)를 돌려 서스펜션의 강도를 세팅할 수 있습니다. 
            </p>
            <div style={{ width: '100%', aspectRatio: '16/9', maxWidth: '600px', background: 'var(--bg-color)', border: '2px dashed var(--surface-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', margin: '0 auto' }}>
              [향후 추가]<br/>하단 장력 조절용 육각 나사를 돌리는 모습
            </div>
          </div>
        </motion.div>

        {/* Step 5: 최종 점검 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            <Check size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              조립 완료 및 최종 점검
            </h4>
            <div style={{ background: 'var(--ci-primary-light)', borderLeft: '4px solid var(--ci-primary)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', marginTop: '1rem' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5, display: 'block' }}>
                탑승하여 체중을 실었을 때 서스펜션이 부드럽게 작동하는지 확인하십시오.<br/>
                안장이 앞뒤나 좌우로 흔들림이 있다면 하단 마운트 볼트를 다시 한 번 강하게 조여주어야 합니다.
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
