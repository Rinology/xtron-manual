import React from 'react';
import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Wrench, AlertCircle, Check } from 'lucide-react';
import PedalRotationAnim from './PedalRotationAnim';


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
    <section id="pedal" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--ci-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>
          <Wrench size={28} color="var(--ci-primary)" />
        </div>
        <h3 className="guide-title" style={{ fontSize: '2rem', color: 'var(--ci-primary)', margin: 0 }}>자전거 페달 장착 기본 가이드</h3>
      </div>

      {/* 안전 안내 사항 (번호 없이 최상단) */}
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
            <li>자전거가 전도되지 않도록 <strong>킥스탠드나 벽면에 안정적으로 거치</strong>하십시오.</li>
            <li><strong>전기자전거:</strong> 예기치 않은 모터 작동(PAS 센서 인식) 방지를 위해 반드시 전원을 차단하고 배터리를 분리하십시오.</li>
          </ul>
        </div>
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Step 1: 필요한 준비물 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            1
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              필요한 준비물
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem', lineHeight: 1.6 }}>
              페달을 안전하고 견고하게 조립하기 위해 사전 준비 도구를 마련해 주십시오.
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>15mm 페달 렌치</strong> 또는 육각 렌치 (페달 축 규격에 맞게 사용)</li>
              <li>작업용 장갑 (손 보호용)</li>
              <li>그리스(Grease) (나사선 도포용, 권장 사항)</li>
            </ul>
          </div>
        </motion.div>

        {/* Step 2: 좌우 페달 식별 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              좌우 페달 식별
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              페달 중심축(스핀들)에 각인된 알파벳을 확인하여 좌우를 명확히 분류하십시오.
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>우측 페달(R):</strong> 구동계(체인)가 위치한 방향</li>
              <li><strong>좌측 페달(L):</strong> 구동계가 없는 방향</li>
            </ul>
            <Zoom>
              <img src={`${import.meta.env.BASE_URL}images/pedal/pedal-identify-lr-01.jpg`} alt="페달 스핀들 L/R 각인 식별" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px' }} />
            </Zoom>
          </div>
        </motion.div>

        {/* 3. 우측 페달 체결 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            3
          </div>
          <div style={{ width: '100%' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              우측 페달(R) 체결
            </h4>
            <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '0.5rem' }}>
              
              {/* 3-1. 회전 안내 애니메이션 */}
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  크랭크 나사산의 영구적인 파손 방지를 위해 먼저 손으로 가결합을 진행합니다.<br/>
                  우측은 <strong>시계 방향 회전</strong>으로 결합됩니다.
                </p>
                <PedalRotationAnim isLeft={false} bgImage={`${import.meta.env.BASE_URL}images/pedal/crank-bg.png`} />
              </div>

              {/* 3-2. 크랭크 위치 및 손 조립 사진 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <Zoom>
                  <img src={`${import.meta.env.BASE_URL}images/pedal/crank-position-r.png`} alt="우측 자전거 크랭크 위치" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', cursor: 'zoom-in' }} />
                </Zoom>
                <Zoom>
                  <img src={`${import.meta.env.BASE_URL}images/pedal/pedal-hand-install-r.png`} alt="오른쪽 페달을 손(시계 방향)으로 돌리는 작업" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', cursor: 'zoom-in' }} />
                </Zoom>
              </div>

              {/* 3-3. 공구 본결합 */}
              <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  손으로 충분히 결합했다면, <strong>15mm 페달 렌치 또는 육각 렌치</strong>를 사용하여 전륜 방향(시계 방향)으로 강하게 조입니다.
                </p>
                <Zoom>
                  <img src={`${import.meta.env.BASE_URL}images/pedal/pedal-wrench-install-r.png`} alt="15mm 렌치로 우측 페달을 강하게 조이는 모습" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '0 auto', cursor: 'zoom-in' }} />
                </Zoom>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. 좌측 페달 체결 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            4
          </div>
          <div style={{ width: '100%' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              좌측 페달(L) 체결 <span style={{ fontSize: '0.8rem', color: '#dc2626', background: 'rgba(220,38,38,0.1)', padding: '2px 6px', borderRadius: '4px', marginLeft: '0.5rem' }}>많이 실수하는 곳</span>
            </h4>
            <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(220, 38, 38, 0.2)', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '0.5rem' }}>
              
              {/* 4-1. 회전 안내 애니메이션 */}
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  풀림 방지를 위해 <strong>역방향 나사산</strong>이 적용되어 있습니다.<br/>크랭크 스레드의 손상 방지를 위해 먼저 손으로 <strong>시계 반대 방향 회전</strong>하여 결합하십시오.
                </p>
                <PedalRotationAnim isLeft={true} />
              </div>

              {/* 4-2. 크랭크 위치 및 손 조립 사진 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <Zoom>
                  <img src={`${import.meta.env.BASE_URL}images/pedal/crank-position-l.png`} alt="좌측 자전거 크랭크 위치" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.4)', maxWidth: '500px', cursor: 'zoom-in' }} />
                </Zoom>
                <div style={{ width: '100%', aspectRatio: '4/3', maxWidth: '500px', background: 'var(--bg-color)', border: '2px dashed rgba(220, 38, 38, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', textAlign: 'center', padding: '1rem' }}>
                  [향후 추가]<br/>왼쪽 페달을 손(시계 반대 방향)으로<br/>돌리는 작업 사진
                </div>
              </div>

              {/* 4-3. 공구 본결합 */}
              <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  손으로 충분히 결합했다면, <strong>15mm 페달 렌치 또는 육각 렌치</strong>를 사용하여 전륜 방향(시계 반대 방향)으로 강하게 조입니다.
                </p>
                <div style={{ width: '100%', aspectRatio: '16/9', maxWidth: '500px', background: 'var(--bg-color)', border: '2px dashed rgba(220, 38, 38, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', margin: '0 auto' }}>
                  [향후 추가]<br/>15mm 렌치 또는 공구를 이용해 좌측 페달을 강하게 조이는 사진
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. 최종 점검 및 안내 */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
            5
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              안전 경고 및 최종 점검
            </h4>
            
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--surface-border)', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1.25rem', marginTop: '1rem' }}>
              💡 <strong>공통 지침:</strong> 양쪽 페달 모두 <strong>자전거 전륜(앞바퀴) 방향</strong>으로 돌리면 결합됩니다. 저항 없이 3~4회전 이상 부드럽게 손으로 결합된 후 공구를 사용하는 것이 정상입니다.
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #dc2626', padding: '1rem', borderRadius: '4px', marginBottom: '1.25rem' }}>
              <span style={{ color: '#dc2626', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <AlertCircle size={18} /> 유격 및 체결 불량 경고
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>
                불완전한 체결은 주행 중 크랭크 파손 및 페달 이탈을 유발하여 심각한 사고로 이어질 수 있습니다. <strong>반드시 유격이 없도록 견고히 조이십시오.</strong>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', color: 'var(--ci-primary)' }}><Check size={20} /></div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>최종 구름성 점검</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>페달을 역방향으로 회전시켜 구름성에 이상이 없고 마찰음이 발생하지 않는지 확인하십시오.</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
