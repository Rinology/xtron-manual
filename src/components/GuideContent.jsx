import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGuides } from '../context/GuideContext';
import { ChevronLeft, ChevronRight, Link as LinkIcon, Check, Youtube, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import { sanitizeUrl } from '../utils/security';
import { Info, Lightbulb, AlertTriangle, ShieldAlert, BookOpen, FileDown } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

// Cache rendered Mermaid SVGs so re-renders or returning to a page never flash blank
const mermaidSvgCache = new Map();

const MermaidChart = React.memo(({ chart }) => {
  const [svg, setSvg] = useState(() => mermaidSvgCache.get(chart) || '');
  useEffect(() => {
    if (mermaidSvgCache.has(chart)) {
      setSvg(mermaidSvgCache.get(chart));
      return;
    }
    let cancelled = false;
    const renderChart = async () => {
      try {
        const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        mermaidSvgCache.set(chart, renderedSvg);
        if (!cancelled) setSvg(renderedSvg);
      } catch (e) {
        console.error('Mermaid render error:', e);
        if (!cancelled) {
          setSvg(`<div style="color: red; padding: 1rem; border: 1px solid red; border-radius: 8px;">Mermaid Syntax Error</div>`);
        }
      }
    };
    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart]);
  return (
    <div style={{ width: '100%', overflowX: 'auto', margin: '2rem 0', paddingBottom: '1rem' }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} style={{ display: 'flex', justifyContent: 'center', minWidth: '600px' }} />
    </div>
  );
});

// Helper to resolve media URLs (supports full URL or relative CDN path)
const resolveMediaUrl = (src) => {
  if (!src) return '';
  const cdnBase = (import.meta.env.VITE_R2_URL || import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr').replace(/\/+$/, '');
  const isExternal = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:');
  if (isExternal) return src;

  let cleanPath = src.startsWith('/') ? src : `/${src}`;
  
  // 1. 기존 AWS S3 시절의 레거시 /project/ 접두사 제거 및 정규화
  if (cleanPath.startsWith('/project/xtron-guide/')) {
    cleanPath = cleanPath.replace(/^\/project\/xtron-guide/, '/xtron-guide');
  } else if (cleanPath.startsWith('/project/')) {
    cleanPath = cleanPath.replace(/^\/project/, '/xtron-guide');
  }

  // 2. R2 버킷 최상위 경로인 /xtron-guide/ 접두사 자동 보정
  if (!cleanPath.startsWith('/xtron-guide/')) {
    cleanPath = `/xtron-guide${cleanPath}`;
  }

  return `${cdnBase}${cleanPath}`;
};

// Helper to detect video file extensions (MP4, WebM, MOV, OGG)
const isVideoUrl = (url) => {
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url || '');
};

// Load all markdown files synchronously at build time to prevent flash of empty content on menu switch
const markdownModules = import.meta.glob('../data/markdown/**/*.md', { query: '?raw', import: 'default', eager: true });

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeRaw];

// Markdown renderer components (defined at module scope so references stay stable across renders and media never remounts)
const MarkdownComponents = {
  h1: ({node, ...props}) => <h1 style={{ fontSize: '1.35rem', color: 'var(--ci-primary)', marginTop: '1.8rem', marginBottom: '0.8rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--surface-border)' }} {...props} />,
  h2: ({node, ...props}) => <h2 style={{ fontSize: '1.25rem', color: 'var(--ci-primary)', marginTop: '1.6rem', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--surface-border)' }} {...props} />,
  h3: ({node, ...props}) => <h3 style={{ fontSize: '1.15rem', color: 'var(--ci-primary)', marginTop: '1.5rem', marginBottom: '0.75rem', paddingBottom: '0.35rem', borderBottom: '1px solid var(--surface-border)' }} {...props} />,
  h4: ({node, ...props}) => <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '1.2rem', marginBottom: '0.4rem' }} {...props} />,
  p: ({node, children, ...props}) => {
    let filteredChildren = children;
    if (node.children?.[0]?.type === 'text') {
      const textValue = node.children[0].value;
      const match = textValue.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
      if (match) {
        filteredChildren = React.Children.map(children, (child, idx) => {
          if (idx === 0 && typeof child === 'string') {
            return child.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '');
          }
          return child;
        });
      }
    }
    return <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.85rem' }} {...props}>{filteredChildren}</p>;
  },
  ul: ({node, ...props}) => <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.4rem', marginBottom: '0.85rem' }} {...props} />,
  ol: ({node, ...props}) => <ol style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '1.4rem', marginBottom: '0.85rem' }} {...props} />,
  li: ({node, ...props}) => <li style={{ marginBottom: '0.25rem' }} {...props} />,
  blockquote: ({node, children, ...props}) => {
    let type = null;
    let title = '';
    let Icon = Info;
    let color = 'var(--text-secondary)';
    let bg = 'rgba(0,0,0,0.05)';
    let borderColor = 'var(--surface-border)';

    const getAllText = (n) => {
      if (n.type === 'text') return n.value;
      if (n.children) return n.children.map(getAllText).join('');
      return '';
    };

    const fullText = getAllText(node);
    const match = fullText.trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
    
    if (match) {
      type = match[1].toLowerCase();
      if (type === 'note') {
        title = 'Note'; Icon = Info; color = '#0969da'; bg = 'rgba(9, 105, 218, 0.05)'; borderColor = '#0969da';
      } else if (type === 'tip') {
        title = 'Tip'; Icon = Lightbulb; color = '#1a7f37'; bg = 'rgba(26, 127, 55, 0.05)'; borderColor = '#1a7f37';
      } else if (type === 'important') {
        title = 'Important'; Icon = MessageCircle; color = '#8250df'; bg = 'rgba(130, 80, 223, 0.05)'; borderColor = '#8250df';
      } else if (type === 'warning') {
        title = 'Warning'; Icon = AlertTriangle; color = '#9a6700'; bg = 'rgba(154, 103, 0, 0.05)'; borderColor = '#9a6700';
      } else if (type === 'caution') {
        title = 'Caution'; Icon = ShieldAlert; color = '#d1242f'; bg = 'rgba(209, 36, 47, 0.05)'; borderColor = '#d1242f';
      }
    }

    if (type) {
      return (
        <div className={`markdown-alert markdown-alert-${type}`} style={{
          borderLeft: `4px solid ${borderColor}`,
          padding: '1rem 1.5rem',
          margin: '1.5rem 0',
          backgroundColor: bg,
          borderRadius: '0 8px 8px 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: color, fontWeight: 'bold', marginBottom: '0.5rem' }}>
            <Icon size={18} />
            <span>{title}</span>
          </div>
          <div className="markdown-alert-content" style={{ color: 'var(--text-secondary)' }}>
            {children}
          </div>
        </div>
      );
    }

    return (
      <blockquote style={{
        background: 'rgba(47, 98, 134, 0.05)',
        borderLeft: '4px solid var(--ci-primary)',
        padding: '1rem 1.5rem',
        margin: '1.5rem 0',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0'
      }} {...props}>
        {children}
      </blockquote>
    );
  },
  code: ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match && match[1] === 'mermaid') {
      return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
    }
    return <code className={className} style={inline ? { background: 'rgba(0,0,0,0.05)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: '#d1242f', fontFamily: 'monospace' } : {}} {...props}>{children}</code>;
  },
  a: ({node, href, children, ...props}) => {
    if (href && href.endsWith('.pdf')) {
      const r2Url = import.meta.env.VITE_R2_URL || import.meta.env.VITE_R2_PDF_URL || import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr';
      const fullHref = href.startsWith('http') ? href : `${r2Url}/${href.replace(/^\//, '')}`;
      
      let title = '';
      let desc = '';
      const text = String(children);
      if (text.includes('|')) {
        const parts = text.split('|');
        title = parts[0].trim();
        desc = parts[1].trim();
      } else {
        title = text;
      }

      return (
        <a
          href={fullHref}
          target="_blank"
          rel="noopener noreferrer"
          download
          style={{
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
            background: 'var(--ci-white)', border: '1px solid var(--surface-border)',
            borderRadius: '12px', padding: '1.25rem', textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)', marginBottom: '1rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--ci-primary-light)', borderRadius: '8px', color: 'var(--ci-primary)' }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{title}</h3>
          </div>
          {desc && <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{desc}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ci-primary)', fontWeight: '600', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            <FileDown size={16} /> PDF 다운로드
          </div>
        </a>
      );
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ci-primary)', textDecoration: 'underline' }} {...props}>{children}</a>;
  },
  img: ({node, src, alt, ...props}) => {
    const fullSrc = resolveMediaUrl(src);
    const isVideo = isVideoUrl(fullSrc);

    if (isVideo) {
      return (
        <VideoPlayer 
          src={fullSrc}
          title={alt || undefined}
        />
      );
    }

    return (
      <img 
        src={fullSrc}
        alt={alt}
        style={{ width: 'auto', maxWidth: 'min(100%, 600px)', maxHeight: '600px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--surface-border)', display: 'block', margin: '1.5rem auto' }} 
        {...props} 
      />
    );
  },
  video: ({node, src, children, ...props}) => {
    const fullSrc = resolveMediaUrl(src);
    return (
      <VideoPlayer 
        src={fullSrc}
      />
    );
  }
};

function GuideContent({ activePage, setActivePage }) {
  const { allGuideItems } = useGuides();
  const guideIndex = allGuideItems.findIndex(item => item.id === activePage);
  const guide = allGuideItems[guideIndex];
  const [copied, setCopied] = useState(false);

  const cleanFile = guide?.markdownFile ? String(guide.markdownFile).trim() : '';
  const matchedModuleKey = cleanFile
    ? Object.keys(markdownModules).find(key =>
        key === `../data/markdown/${cleanFile}` ||
        key.endsWith(`/${cleanFile}`)
      )
    : null;

  const markdownContent = matchedModuleKey ? (markdownModules[matchedModuleKey] || '') : '';
  const isMarkdownMissing = cleanFile
    ? !matchedModuleKey
    : Boolean(guide && !guide.customComponent && !guide.jsonData);

  const renderedMarkdown = useMemo(() => {
    if (!markdownContent) return null;
    return (
      <ReactMarkdown 
        remarkPlugins={REMARK_PLUGINS} 
        rehypePlugins={REHYPE_PLUGINS}
        components={MarkdownComponents}
      >
        {markdownContent}
      </ReactMarkdown>
    );
  }, [markdownContent]);

  if (!guide || isMarkdownMissing) {
    return (
      <div className="guide-error-container">
        <h2 className="guide-error-title">해당 마법서를 찾을 수 없습니다 😢</h2>
        <p className="guide-error-desc">요청하신 가이드가 존재하지 않거나 준비 중입니다.<br/>문제가 지속되면 카카오톡 채널로 문의해 주세요.</p>
        <div className="guide-error-actions">
          <button onClick={() => setActivePage(null)} className="btn-error-action btn-error-home">
            홈으로 돌아가기
          </button>
          <a href="https://pf.kakao.com/_xhxhRZxl" target="_blank" rel="noopener noreferrer" className="btn-error-action btn-error-kakao">
            카카오톡 상담하기
          </a>
        </div>
      </div>
    );
  }

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

  const topActionsElement = (
    <div className="top-actions-container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      {guide.youtubeLink && (
        <a
          href={sanitizeUrl(guide.youtubeLink)}
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

  const navigationButtonsElement = (
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

  // Legacy rendering for non-migrated components
  if (CustomComponent && !guide.markdownFile) {
    return (
      <div style={{ paddingBottom: '4rem', paddingTop: '1rem' }}>
        {topActionsElement}
        <CustomComponent />
        {navigationButtonsElement}
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '4rem', paddingTop: '1rem' }}>
      {topActionsElement}
      <div className="glass-panel guide-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px' }}>
            {guide.icon}
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--ci-primary)', margin: 0, fontWeight: 700 }}>{guide.title}</h2>
        </div>

        {guide.markdownFile ? (
          <div className="markdown-body">
            {renderedMarkdown}
          </div>
        ) : guide.jsonData ? (
          <div className="json-data-body">
            {/* Intro */}
            {guide.jsonData.intro && (
              <div style={{ background: 'var(--ci-primary-light)', border: '1px solid rgba(47, 98, 134, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
                <ReactMarkdown remarkPlugins={REMARK_PLUGINS} rehypePlugins={REHYPE_PLUGINS} components={MarkdownComponents}>
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
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.8rem', marginTop: 0 }}>{step.title}</h4>
                      {step.text && (
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                          <ReactMarkdown remarkPlugins={REMARK_PLUGINS} rehypePlugins={REHYPE_PLUGINS} components={MarkdownComponents}>
                            {step.text}
                          </ReactMarkdown>
                        </div>
                      )}
                      {step.image && (
                        isVideoUrl(step.image) ? (
                          <VideoPlayer
                            src={resolveMediaUrl(step.image)}
                            title={step.title}
                            maxWidth="500px"
                          />
                        ) : (
                          <img src={resolveMediaUrl(step.image)} alt={step.title} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--surface-border)', maxWidth: '500px', display: 'block', margin: '1rem auto' }} />
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {navigationButtonsElement}
      </div>
    </div>
  );
}

export default React.memo(GuideContent);
