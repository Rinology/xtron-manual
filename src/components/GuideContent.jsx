import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { allGuideItems } from '../data/guides';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Video as VideoIcon, Link as LinkIcon, Check, Menu, Printer, QrCode, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function GuideContent({ activePage, setActivePage }) {
  const guideIndex = allGuideItems.findIndex(item => item.id === activePage);
  const guide = allGuideItems[guideIndex];
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!guide) return null;

  const CustomComponent = guide.customComponent;
  const prevGuide = guideIndex > 0 ? allGuideItems[guideIndex - 1] : null;
  const nextGuide = guideIndex < allGuideItems.length - 1 ? allGuideItems[guideIndex + 1] : null;

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  };

  const actionBtnStyle = {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    background: 'var(--ci-white)', color: 'var(--text-secondary)',
    border: '1px solid var(--surface-border)',
    padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease',
    boxShadow: 'var(--shadow-sm)'
  };

  const TopActions = () => (
    <div className="top-actions-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <button
        onClick={() => setShowQR(true)}
        title="스마트폰 카메라로 보기 (QR)"
        style={actionBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--ci-white)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        <QrCode size={14} /> 모바일 보기
      </button>

      <button
        onClick={handleCopyLink}
        title="현재 가이드 링크 복사"
        style={{
          ...actionBtnStyle,
          background: copied ? 'var(--ci-secondary)' : 'var(--ci-white)',
          color: copied ? 'var(--ci-white)' : 'var(--text-secondary)',
          border: copied ? '1px solid var(--ci-secondary)' : '1px solid var(--surface-border)'
        }}
        onMouseEnter={e => {
          if (!copied) { e.currentTarget.style.background = 'var(--bg-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }
        }}
        onMouseLeave={e => {
          if (!copied) { e.currentTarget.style.background = 'var(--ci-white)'; e.currentTarget.style.color = 'var(--text-secondary)'; }
        }}
      >
        {copied ? <Check size={14} /> : <LinkIcon size={14} />}
        {copied ? '링크 복사됨' : '가이드 링크 복사'}
      </button>
    </div>
  );

  const NavigationButtons = () => (
    <div className="nav-buttons-container" style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
      {prevGuide ? (
        <button 
          onClick={() => {
            setActivePage(prevGuide.id);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="nav-btn nav-btn-left"
          style={{ flex: 1 }}
        >
          <ChevronLeft size={20} />
          {prevGuide.title}
        </button>
      ) : <div style={{ flex: 1 }}></div>}

      {nextGuide ? (
        <button 
          onClick={() => {
            setActivePage(nextGuide.id);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="nav-btn nav-btn-right"
          style={{ flex: 1 }}
        >
          {nextGuide.title}
          <ChevronRight size={20} />
        </button>
      ) : <div style={{ flex: 1 }}></div>}
    </div>
  );

  if (CustomComponent) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        style={{ paddingBottom: '4rem', paddingTop: '1rem' }}
      >
        {showQR && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowQR(false)}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setShowQR(false)} 
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#666' }}
              >
                <X size={20} />
              </button>
              <h4 style={{ marginBottom: '1rem', color: 'var(--ci-primary)', fontSize: '1.1rem' }}>스마트폰 스캔 (QR)</h4>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`} alt="QR Code" style={{ width: '200px', height: '200px', margin: '0 auto', display: 'block' }} />
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '1rem 0 0 0' }}>모바일 화면에 최적화된 엑스트론<br/>매뉴얼을 경험해보세요.</p>
            </div>
          </div>
        )}
        <TopActions />
        <CustomComponent />
        <NavigationButtons />
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
      {showQR && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowQR(false)}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setShowQR(false)} 
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#666' }}
              >
                <X size={20} />
              </button>
              <h4 style={{ marginBottom: '1rem', color: 'var(--ci-primary)', fontSize: '1.1rem' }}>스마트폰 스캔 (QR)</h4>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`} alt="QR Code" style={{ width: '200px', height: '200px', margin: '0 auto', display: 'block' }} />
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '1rem 0 0 0' }}>모바일 화면에 최적화된 엑스트론<br/>매뉴얼을 경험해보세요.</p>
            </div>
          </div>
      )}
      <TopActions />
      <div className="glass-panel guide-panel">
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
        <NavigationButtons />
      </div>
    </motion.div>
  );
}
