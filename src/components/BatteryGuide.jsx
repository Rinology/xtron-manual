import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Zap, ShieldCheck, Activity, Info } from 'lucide-react';

export default function BatteryGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="battery-charging" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>

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
          <Zap color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>배터리 충전 가이드 (공통)</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          싯포스트형 및 KTX형 모든 배터리에 공통으로 적용되는 <strong>올바른 충전 순서</strong>입니다.<br/>
          충전기 포트를 반드시 <strong>배터리에 먼저</strong> 연결한 후 콘센트를 꽂는 것이 기본 원칙입니다.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Step 1 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#059669', flexShrink: 0 }}>
            1
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              충전기 단자를 배터리에 먼저 연결
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              자전거 전원을 끈 상태에서, 충전 포트 고무 마개를 열고 <strong>충전기의 둥근 DC 단자를 배터리 충전구에 먼저 꽂습니다.</strong><br/>
              단자가 방향에 맞게 완전히 들어가야 하며(딸깍 소리), 헐겁게 꽂히면 충전 불량, 과열의 원인이 됩니다.
            </p>
            <Zoom>
              <img
                src="https://placehold.co/600x400?text=충전기+단자+배터리에+먼저+연결+사진"
                alt="충전기 단자 배터리 연결"
                style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto' }}
              />
            </Zoom>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#059669', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              콘센트(220V)에 플러그 연결
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              배터리 단자가 단단히 꽂힌 것을 확인한 뒤, 충전 어댑터(사각 박스)의 전원 플러그를 <strong>220V 콘센트에 꽂아</strong> 충전을 시작합니다.
            </p>

            {/* 충전 상태 인디케이터 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Zap color="#ef4444" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#b91c1c' }}>충전 중</strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>어댑터에 <strong>적색 LED</strong> 점등</p>
                </div>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck color="#059669" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#047857' }}>완충 완료</strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>어댑터에 <strong>녹색 LED</strong> 점등</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 3: 잔량 확인(VOL) */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4f46e5', flexShrink: 0 }}>
            <Activity size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              정확한 잔량 확인: 전압(VOL) 모드
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              계기판 상단의 배터리 아이콘 칸 수는 대략적인 수치이며, 주행 조건에 따라 오차가 있습니다.<br/>
              가장 정확한 방법은 LCD 계기판에서 <strong>M 버튼을 두 번 짧게 눌러 VOL (전압) 모드</strong>를 확인하는 것입니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ background: 'var(--ci-primary-light)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(47, 98, 134, 0.2)' }}>
                <strong style={{ display: 'block', color: 'var(--ci-primary)', marginBottom: '0.5rem' }}>36V 배터리 모델</strong>
                <ul style={{ margin: 0, paddingLeft: '0', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center' }}><span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#047857', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>✅ 완충: 약 42.0V 내외</span></li>
                  <li style={{ paddingLeft: '0.5rem' }}><strong>즉시 충전:</strong> <strong>32.0V</strong> 이하</li>
                </ul>
              </div>
              <div style={{ background: 'var(--ci-primary-light)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(47, 98, 134, 0.2)' }}>
                <strong style={{ display: 'block', color: 'var(--ci-primary)', marginBottom: '0.5rem' }}>48V 배터리 모델</strong>
                <ul style={{ margin: 0, paddingLeft: '0', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center' }}><span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#047857', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>✅ 완충: 약 54.6V 내외</span></li>
                  <li style={{ paddingLeft: '0.5rem' }}><strong>즉시 충전:</strong> <strong>41.0V</strong> 이하</li>
                </ul>
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
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>충전 마감 후 고무 마개 닫기</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            완충 후 충전기를 분리한 다음, <strong>충전 포트를 덮는 고무 마개를 반드시 꼭 닫아 주세요.</strong><br/>
            빗물이나 이물질이 충전구 내부로 들어가면 단락(쇼트)과 부식의 원인이 됩니다.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
