import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ThermometerSnowflake, ShieldCheck, Info, ZapOff, Heater, Droplets } from 'lucide-react';

export default function WinterBatteryGuide() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="winter-battery" style={{ marginBottom: '4rem', paddingTop: '1rem' }}>
      
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
          <Info color="var(--ci-primary)" size={24} style={{ flexShrink: 0 }} />
          <h5 style={{ color: 'var(--ci-primary)', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>겨울철 배터리 충전 기본 안내</h5>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          당사 배터리팩은 <strong>SAMSUNG SDI 및 LG ENERGY SOLUTION</strong>의 리튬이온 셀을 기반으로 제작되며 제조사의 공식 가이드를 따릅니다.<br/>
          최근 영하권(-7°C 전후)에서 사용 후 실내로 가져온 직후 충전을 시도하면 <strong style={{color: 'var(--ci-secondary)'}}>충전기 LED가 초록색으로 유지될 수 있습니다.</strong><br/>
          이는 배터리팩에 내장된 <strong>BMS(배터리 관리 시스템)의 정상적인 보호 기능</strong>이 작동한 결과로, 배터리 고장이 아닙니다.
        </p>
      </motion.div>

      {/* 1. 충전이 되지 않는 이유 */}
      <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ThermometerSnowflake size={22} color="var(--ci-primary)" />
        1. 충전이 되지 않는 이유 (초록색 불 상시 점등 시)
      </h4>
      <div className="guide-grid-2" style={{ marginBottom: '3rem' }}>
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ci-primary)' }}>
            <ShieldCheck size={20} />
            <h5 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>내부 보호 기능 작동</h5>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            리튬이온 배터리의 권장 충전 온도는 <strong>0~45°C</strong>입니다. 0°C 이하의 극저온 환경에서는 배터리 셀 보호를 위해 <strong>BMS가 자동으로 충전을 차단</strong>합니다. (이때 충전기는 완충으로 인식해 초록불이 켜집니다)
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
            <AlertTriangle size={20} />
            <h5 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>저온 충전 시 손상 가능성</h5>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            보호 회로가 없이 0°C 이하에서 억지로 충전될 경우, 내부 리튬 금속 석출 위험으로 인해 <strong>영구적인 배터리 수명 단축 및 성능 저하</strong>가 발생할 수 있습니다.
          </p>
        </motion.div>
      </div>

      {/* 2. 충전 시 유의사항 */}
      <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck size={22} color="var(--ci-primary)" />
        2. 올바른 충전 및 관리 유의사항
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ padding: '1.25rem', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-color)', border: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ci-primary)', flexShrink: 0 }}>
            <ThermometerSnowflake size={20} />
          </div>
          <div>
            <h5 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>실내 환경 보관 및 온도 회복</h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              과도한 냉각을 방지하기 위해 배터리는 가급적 실내에 보관하세요. 영하에서 주행 후 실내로 들여왔다면 <strong>실내 온도(약 10~25°C)에서 1~2시간 방치</strong>하여 내부 온도가 서서히 올라간 후 충전을 시작하세요. (오류 초록불 점등 시 온도 회복 후 재시도)
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ padding: '1.25rem', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-color)', border: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ci-primary)', flexShrink: 0 }}>
            <Droplets size={20} />
          </div>
          <div>
            <h5 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>결로(물기) 제거 후 완전 건조</h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              차가운 외부에서 따뜻한 실내로 들어올 때 온도차로 인해 배터리나 단자에 <strong>결로 현상(물방울)</strong>이 맺힐 수 있습니다. 마른 수건으로 가볍게 닦고 완전히 건조(1~2시간)한 후에 충전기를 연결해야 합선 위험이 없습니다.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="glass-panel guide-step-panel" style={{ padding: '1.25rem', gap: '1rem', borderLeft: '3px solid #ef4444' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
            <Heater size={20} />
          </div>
          <div>
            <h5 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', color: '#ef4444' }}>강한 열원 사용 절대 금지</h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              배터리 온도를 빠르게 높이기 위해 <strong>헤어 드라이어, 난로, 온풍기 등 강한 열원</strong>을 절대 직접 쏘거나 가까이 두지 마세요. 외부 플라스틱 변형 및 내부 셀 화재의 원인이 될 수 있습니다.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 공통 지침: 주행 성능 저하 */}
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
        <div style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>💡</div>
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>공통 지침: 일시적인 주행 성능 저하</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            영하 환경에서는 리튬 이온의 활성도가 떨어져 방전 효율이 <strong>일시적으로 최대 50% 정도 감소</strong>(평소보다 배터리가 더 빨리 줄어듦)할 수 있으나, 이는 <strong>고장이 아니며</strong> 기온이 영상으로 다시 상승하면 <strong>정상적인 배터리 효율과 성능으로 다시 완전히 회복</strong>됩니다. 안전하고 따뜻한 겨울 보내시길 바랍니다!
          </p>
        </div>
      </motion.div>
      
    </section>
  );
}
