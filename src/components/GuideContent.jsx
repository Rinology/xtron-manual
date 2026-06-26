import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGuides } from '../context/GuideContext';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Video as VideoIcon, Link as LinkIcon, Check, Youtube } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Load all markdown files at build time
const markdownModules = import.meta.glob('../data/markdown/**/*.md', { query: '?raw', import: 'default' });

export default function GuideContent({ activePage, setActivePage }) {
  const { allGuideItems } = useGuides();
  const guideIndex = allGuideItems.findIndex(item => item.id === activePage);
  const guide = allGuideItems[guideIndex];
  const [copied, setCopied] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (guide?.markdownFile) {
      const loader = markdownModules[`../data/markdown/${guide.markdownFile}`];
      if (loader) {
        loader().then(content => setMarkdownContent(content));
      } else {
        setMarkdownContent('마크다운 파일을 찾을 수 없습니다.');
      }
    } else {
      setMarkdownContent('');
    }
  }, [guide]);

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
      {guide.youtubeLink && (
        <a
          href={guide.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          title="유튜브 영상으로 가기"
          style={{ ...actionBtnStyle, textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--ci-white)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Youtube size={14} color="#dc2626" /> 유튜브 영상으로 가기
        </a>
      )}

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
        {copied ? <Check size={14} color="var(--ci-secondary)" /> : <LinkIcon size={14} color="var(--ci-primary)" />}
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

  // Markdown renderer components
  const MarkdownComponents = {
    h3: ({node, ...props}) => <h3 style={{ fontSize: '1.4rem', color: 'var(--ci-primary)', marginTop: '2rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--surface-border)' }} {...props} />,
    h4: ({node, ...props}) => <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }} {...props} />,
    p: ({node, ...props}) => <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }} {...props} />,
    ul: ({node, ...props}) => <ul style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
    blockquote: ({node, ...props}) => (
      <blockquote style={{
        background: 'rgba(47, 98, 134, 0.05)',
        borderLeft: '4px solid var(--ci-primary)',
        padding: '1rem 1.5rem',
        margin: '1.5rem 0',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0'
      }} {...props} />
    ),
    img: ({node, ...props}) => <img style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', border: '1px solid var(--surface-border)', display: 'block', margin: '1.5rem auto' }} {...props} />
  };

  // Legacy rendering for non-migrated components
  if (CustomComponent && !guide.markdownFile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        style={{ paddingBottom: '4rem', paddingTop: '1rem' }}
      >
        <TopActions />
        <CustomComponent />
        <NavigationButtons />
      </motion.div>
    );
  }

  // Unified Rendering (Markdown or Fallback)
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      style={{ paddingBottom: '4rem', paddingTop: '1rem' }}
    >
      <TopActions />
      <div className="glass-panel guide-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px' }}>
            {guide.icon}
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--ci-primary)', margin: 0 }}>{guide.title}</h2>
        </div>

        {guide.markdownFile ? (
          <div className="markdown-body">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              components={MarkdownComponents}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : guide.jsonData ? (
          <div className="json-data-body">
            {/* Intro */}
            {guide.jsonData.intro && (
              <div style={{ background: 'var(--ci-primary-light)', border: '1px solid rgba(47, 98, 134, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                  {guide.jsonData.intro}
                </ReactMarkdown>
              </div>
            )}
            
            {/* Steps */}
            {guide.jsonData.steps && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {guide.jsonData.steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="glass-panel guide-step-panel" 
                    style={{ position: 'relative' }}
                  >
                    <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '2px', height: '1.5rem', background: 'var(--surface-border)' }}></div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ci-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--ci-primary)', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        {step.title}
                      </h4>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                          {step.text}
                        </ReactMarkdown>
                      </div>
                      {step.image && (
                        <img src={step.image} alt={step.title} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '1rem auto' }} />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <React.Fragment>
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
              margin: '2rem 0'
            }}>
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>상세 내용 준비중</span>
            </div>
          </React.Fragment>
        )}

        <NavigationButtons />
      </div>
    </motion.div>
  );
}
