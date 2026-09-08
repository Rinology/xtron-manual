import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, BookOpen, HardDriveDownload } from 'lucide-react';

export default function Downloads() {
  // 환경변수에서 R2 주소를 가져오거나 임시 주소 사용
  const r2Url = import.meta.env.VITE_R2_PDF_URL || 'https://cdn.xtron-guide.kr/pdf';

  const manuals = [
    { id: 1, title: '설명서 1', description: '제품 초기 설정 및 기본 조작 가이드', filename: 'manual1.pdf' },
    { id: 2, title: '설명서 2', description: '고급 기능 및 유지보수 가이드', filename: 'manual2.pdf' },
    { id: 3, title: '설명서 3', description: '부품 교체 및 자가 수리 가이드', filename: 'manual3.pdf' },
  ];

  return (
    <div className="downloads-container" style={{ padding: '2rem 0', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.75rem', 
          fontSize: '2rem', 
          color: 'var(--ci-primary)',
          marginBottom: '1rem',
          fontWeight: '700'
        }}>
          <HardDriveDownload size={32} />
          자료실 및 설명서 다운로드
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
          제품 사용에 필요한 모든 PDF 설명서를 다운로드하여 오프라인에서도 확인하세요.<br/>
          (데이터 요금 걱정 없이 Cloudflare R2를 통해 고속으로 다운로드됩니다.)
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' 
      }}>
        {manuals.map((manual, index) => (
          <motion.div
            key={manual.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            style={{
              background: 'var(--ci-white)',
              border: '1px solid var(--surface-border)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ y: -5, boxShadow: 'var(--shadow-md)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'var(--ci-primary-light)', 
                borderRadius: '12px',
                color: 'var(--ci-primary)'
              }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>{manual.title}</h3>
            </div>
            
            <p style={{ margin: 0, color: 'var(--text-secondary)', flex: 1, lineHeight: '1.5', fontSize: '0.95rem' }}>
              {manual.description}
            </p>

            <a
              href={`${r2Url}/${manual.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.25rem',
                background: 'var(--ci-primary)',
                color: 'var(--ci-white)',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'background 0.2s ease, transform 0.1s ease',
                marginTop: 'auto',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--ci-primary-dark, #1c4b6b)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--ci-primary)';
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FileDown size={20} />
              PDF 다운로드
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
