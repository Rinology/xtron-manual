import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function Troubleshooting({ searchKeyword }) {
  const problems = [
    {
      id: "error-01",
      title: "전원이 켜지지 않아요 (Error 01)",
      content: "모니터에서 버튼을 눌러도 반응이 없다면, 먼저 배터리가 완전히 결합되어 열쇠로 잠겨 있는지 확인해주세요. 또한, 충전이 충분히 되어 있는지도 확인이 필요합니다.",
      solution: "배터리 탈착 후 다시 결합, 완충 확인",
      icon: <AlertTriangle color="#ef4444" size={24} />
    },
    {
      id: "brake-noise",
      title: "주행 중 브레이크 소음",
      content: "새 자전거의 경우 브레이크 패드가 자리를 잡는 과정에서 '삐-익' 하는 소리가 발생할 수 있습니다. 이는 정상적인 현상이며, 약 1주일 주행 후 사라집니다.",
      solution: "일정 기간 주행 유지 (정상 현상)",
      icon: <CheckCircle color="var(--ci-secondary)" size={24} />
    },
    {
      id: "tire-pressure",
      title: "타이어 공기압은 어느정도인가요?",
      content: "팻바이크 타이어는 20~25 PSI, 일반 타이어는 35~45 PSI가 적당합니다. 체중과 도로 환경에 따라 조절해 주세요.",
      solution: "측면 공기압 수치 참조하여 공기 주입",
      icon: <CheckCircle color="var(--ci-secondary)" size={24} />
    }
  ];

  const filteredProblems = problems.filter(
    (p) => p.title.includes(searchKeyword) || p.content.includes(searchKeyword)
  );

  if (filteredProblems.length === 0) return null;

  return (
    <section id="troubleshooting" style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <h3 className="guide-title">자주 묻는 질문 및 해결법</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredProblems.map((problem) => (
          <motion.div 
            key={problem.id}
            id={problem.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel guide-item-panel"
            style={{ borderLeft: '4px solid var(--ci-primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {problem.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {problem.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {problem.content}
                </p>
                {/* TODO: 트러블슈팅 이미지 연결 가능 영역 */}
                <div style={{ marginBottom: '1rem' }}>
                  <img 
                    src={`https://placehold.co/600x200?text=Troubleshooting+Image\n(/images/troubleshooting/${problem.id}.jpg)`}
                    alt={problem.title} 
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px' }} 
                  />
                </div>
                <div style={{
                  display: 'inline-block',
                  background: 'var(--ci-primary-light)',
                  color: 'var(--ci-primary)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  해결책: {problem.solution}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
