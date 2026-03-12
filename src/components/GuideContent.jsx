import React from 'react';
import { motion } from 'framer-motion';
import { allGuideItems } from '../data/guides';
import { ChevronLeft, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

export default function GuideContent({ activePage, setActivePage }) {
  const guide = allGuideItems.find(item => item.id === activePage);

  if (!guide) return null;

  const CustomComponent = guide.customComponent;

  if (CustomComponent) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        style={{ paddingBottom: '4rem', paddingTop: '1rem' }}
      >
        <CustomComponent />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      style={{ paddingBottom: '4rem', paddingTop: '1rem' }}
    >
      <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px' }}>
            {guide.icon}
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--ci-primary)', margin: 0 }}>{guide.title}</h2>
        </div>

        <div style={{ background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--surface-border)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>요약 설명</h3>
          <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {guide.summary.map((text, idx) => (
              <li key={idx} style={{ lineHeight: 1.6 }}>{text}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>상세 이미지 / 비디오</h3>
          
          {/* Placeholder for Media */}
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--surface-border)',
            border: '2px dashed var(--text-secondary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            gap: '1rem'
          }}>
            {guide.placeholderType === 'gif' ? <VideoIcon size={48} opacity={0.5} /> : <ImageIcon size={48} opacity={0.5} />}
            <span style={{ fontWeight: 600 }}>{guide.placeholderText} 공간입니다.</span>
            <span style={{ fontSize: '0.85rem' }}>(실제 이미지나 GIF로 교체될 영역)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
