import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, Search, ChevronDown, ChevronUp, Pin, ExternalLink,
  Link as LinkIcon, Check, Info, Lightbulb, AlertTriangle,
  ShieldAlert, MessageCircle, BookOpen, FileDown, X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useGuides } from '../context/GuideContext';
import VideoPlayer from './VideoPlayer';

// R2 미디어 경로 자동 보정 헬퍼 (GuideContent.jsx와 동일 규격)
const resolveMediaUrl = (src) => {
  if (!src) return '';
  const cdnBase = (import.meta.env.VITE_R2_URL || import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr').replace(/\/+$/, '');
  const isExternal = src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:');
  if (isExternal) return src;

  let cleanPath = src.startsWith('/') ? src : `/${src}`;

  if (cleanPath.startsWith('/project/xtron-guide/')) {
    cleanPath = cleanPath.replace(/^\/project\/xtron-guide/, '/xtron-guide');
  } else if (cleanPath.startsWith('/project/')) {
    cleanPath = cleanPath.replace(/^\/project/, '/xtron-guide');
  }

  if (!cleanPath.startsWith('/xtron-guide/')) {
    cleanPath = `/xtron-guide${cleanPath}`;
  }

  return `${cdnBase}${cleanPath}`;
};

const isVideoUrl = (url) => {
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url || '');
};

export default function FaqBoard({ activePage, setActivePage }) {
  const { faqItems, isFaqLoading, allGuideItems } = useGuides();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const itemRefs = useRef({});

  // 카테고리 목록 추출 ('전체' + 시트에 등장하는 고유 분류명)
  const categories = useMemo(() => {
    const uniqueCats = [];
    faqItems.forEach(item => {
      if (item.category && !uniqueCats.includes(item.category)) {
        uniqueCats.push(item.category);
      }
    });
    return ['전체', ...uniqueCats];
  }, [faqItems]);

  // 특정 FAQ_ID 해시(예: #FAQ-001)로 진입했을 때 해당 아코디언 자동 펼침 및 스크롤 이동
  useEffect(() => {
    if (!faqItems || faqItems.length === 0) return;

    if (activePage && activePage !== 'faq') {
      const targetFaq = faqItems.find(f => f.id.toLowerCase() === activePage.toLowerCase());
      if (targetFaq) {
        setSelectedCategory('전체');
        setSearchQuery('');
        setOpenIds(prev => ({ ...prev, [targetFaq.id]: true }));
        setTimeout(() => {
          const el = itemRefs.current[targetFaq.id];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    } else if (activePage === 'faq') {
      // 기본 진입 시 Pinned 순서가 가장 빠른 첫 번째 항목을 기본으로 열어두기
      const pinnedSorted = [...faqItems].filter(f => f.pinned).sort((a, b) => a.pinned - b.pinned);
      if (pinnedSorted.length > 0 && Object.keys(openIds).length === 0) {
        setOpenIds({ [pinnedSorted[0].id]: true });
      }
    }
  }, [activePage, faqItems]);

  const toggleItem = (id) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyFaqLink = (e, id) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy FAQ link:', err);
    });
  };

  // 필터링 및 Pinned 순서(1~10) 우선 정렬
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = faqItems.filter(item => {
      const matchCat = selectedCategory === '전체' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;

      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    });

    // Pinned 항목을 숫자 순서(1~10)대로 상단에 배치하고, 일반 항목은 시트 순서 보존
    return [...filtered].sort((a, b) => {
      if (a.pinned && b.pinned) return a.pinned - b.pinned;
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }, [faqItems, selectedCategory, searchQuery]);

  // 마크다운 컴포넌트 설정 (구글 시트 Alt+Enter 줄바꿈 및 R2 이미지/동영상 완벽 호환)
  const MarkdownComponents = {
    h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.2rem', color: 'var(--ci-primary)', marginTop: '1.25rem', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--surface-border)' }} {...props} />,
    h4: ({ node, ...props }) => <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.5rem' }} {...props} />,
    p: ({ node, children, ...props }) => {
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
      return (
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem', whiteSpace: 'pre-line' }} {...props}>
          {filteredChildren}
        </p>
      );
    },
    ul: ({ node, ...props }) => <ul style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', marginBottom: '0.75rem' }} {...props} />,
    li: ({ node, ...props }) => <li style={{ whiteSpace: 'pre-line', marginBottom: '0.25rem' }} {...props} />,
    blockquote: ({ node, children, ...props }) => {
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
          <div style={{
            borderLeft: `4px solid ${borderColor}`,
            padding: '0.85rem 1.25rem',
            margin: '1rem 0',
            backgroundColor: bg,
            borderRadius: '0 8px 8px 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color, fontWeight: 'bold', marginBottom: '0.35rem' }}>
              <Icon size={17} />
              <span>{title}</span>
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              {children}
            </div>
          </div>
        );
      }

      return (
        <blockquote style={{
          background: 'rgba(47, 98, 134, 0.05)',
          borderLeft: '4px solid var(--ci-primary)',
          padding: '0.85rem 1.25rem',
          margin: '1rem 0',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0'
        }} {...props}>
          {children}
        </blockquote>
      );
    },
    a: ({ node, href, children, ...props }) => {
      if (href && href.endsWith('.pdf')) {
        const r2Url = import.meta.env.VITE_R2_URL || import.meta.env.VITE_R2_PDF_URL || import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr';
        const fullHref = href.startsWith('http') ? href : `${r2Url}/${href.replace(/^\//, '')}`;
        return (
          <a
            href={fullHref}
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--ci-primary-light)', color: 'var(--ci-primary)',
              padding: '0.6rem 1rem', borderRadius: '8px', textDecoration: 'none',
              fontWeight: 600, fontSize: '0.9rem', marginTop: '0.5rem'
            }}
          >
            <FileDown size={16} /> {children}
          </a>
        );
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ci-primary)', textDecoration: 'underline' }} {...props}>{children}</a>;
    },
    img: ({ node, src, alt, ...props }) => {
      const fullSrc = resolveMediaUrl(src);
      if (isVideoUrl(fullSrc)) {
        return <VideoPlayer src={fullSrc} title={alt || undefined} />;
      }
      return (
        <img
          src={fullSrc}
          alt={alt}
          style={{ width: '100%', maxWidth: '520px', maxHeight: '520px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--surface-border)', display: 'block', margin: '1rem auto' }}
          {...props}
        />
      );
    },
    video: ({ node, src }) => {
      const fullSrc = resolveMediaUrl(src);
      return <VideoPlayer src={fullSrc} />;
    }
  };

  if (isFaqLoading) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{
          display: 'inline-block', width: '30px', height: '30px',
          border: '3px solid var(--surface-border)', borderTop: '3px solid var(--ci-primary)',
          borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p>자주 묻는 질문을 불러오고 있습니다...</p>
      </div>
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
      <div className="glass-panel guide-panel">
        {/* 상단 타이틀 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--ci-primary)', margin: 0, fontWeight: 700 }}>
                자주 묻는 질문 (FAQ)
              </h2>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                간단한 궁금증과 조치 방법을 빠르게 확인해 보세요.
              </p>
            </div>
          </div>
        </div>

        {/* 검색창 */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={20} color="var(--ci-primary)" style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="궁금한 키워드를 검색해 보세요 (예: 충전시간, 공기압, 페달)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.95rem 2.75rem 0.95rem 3rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--surface-border)',
              background: 'var(--bg-color)',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--ci-primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(47, 98, 134, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--surface-border)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                background: 'var(--surface-border)', border: 'none', borderRadius: '50%',
                width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)'
              }}
              title="검색어 지우기"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 카테고리 필터 탭 */}
        {categories.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: isActive ? '1px solid var(--ci-primary)' : '1px solid var(--surface-border)',
                    background: isActive ? 'var(--ci-primary)' : 'var(--ci-white)',
                    color: isActive ? 'var(--ci-white)' : 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ 아코디언 리스트 */}
        {filteredFaqs.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--surface-border)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {faqItems.length === 0 ? '등록된 FAQ 항목이 아직 없습니다.' : '검색 조건에 맞는 질문이 없습니다 😢'}
            </p>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              {faqItems.length === 0
                ? '구글 스프레드시트 FAQ 탭에 질문과 답변을 추가해 주세요.'
                : '다른 검색어를 입력하시거나 전체 카테고리에서 확인해 보세요.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredFaqs.map(item => {
              const isOpen = Boolean(openIds[item.id]);
              const relatedGuide = item.relatedItemId
                ? allGuideItems.find(g => g.id === item.relatedItemId)
                : null;
              const isHighlighted = activePage && activePage.toLowerCase() === item.id.toLowerCase();

              return (
                <div
                  key={item.id}
                  ref={el => { itemRefs.current[item.id] = el; }}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    border: isOpen || isHighlighted
                      ? '1.5px solid var(--ci-primary)'
                      : '1px solid var(--surface-border)',
                    background: isOpen ? 'var(--ci-white)' : 'var(--bg-color)',
                    boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* 질문 헤더 (클릭 시 아코디언 토글) */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.15rem 1.35rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', flex: 1 }}>
                      {/* Pinned 뱃지 */}
                      {item.pinned && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                          background: 'rgba(47, 98, 134, 0.12)', color: 'var(--ci-primary)',
                          fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-full)', flexShrink: 0
                        }}>
                          <Pin size={12} /> 핵심
                        </span>
                      )}

                      {/* 카테고리 태그 */}
                      {item.category && (
                        <span style={{
                          background: 'var(--surface-border)',
                          color: 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          flexShrink: 0
                        }}>
                          {item.category}
                        </span>
                      )}

                      {/* 질문 텍스트 */}
                      <span style={{
                        fontSize: '1.05rem',
                        fontWeight: isOpen ? 700 : 600,
                        color: isOpen ? 'var(--ci-primary)' : 'var(--text-primary)',
                        lineHeight: 1.4
                      }}>
                        Q. {item.question}
                      </span>
                    </div>

                    <div style={{ color: isOpen ? 'var(--ci-primary)' : 'var(--text-secondary)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* 답변 영역 (접기/펼치기 애니메이션) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 1.35rem 1.35rem 1.35rem',
                          borderTop: '1px solid var(--surface-border)',
                          paddingTop: '1.15rem'
                        }}>
                          <div className="markdown-body">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={MarkdownComponents}
                            >
                              {item.answer}
                            </ReactMarkdown>
                          </div>

                          {/* 하단 액션 바: 연관 상세 가이드 이동 버튼 & 개별 질문 링크 복사 */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                            marginTop: '1.25rem',
                            paddingTop: '0.85rem',
                            borderTop: '1px dashed var(--surface-border)'
                          }}>
                            <div>
                              {item.relatedItemId && (
                                <button
                                  onClick={() => {
                                    setActivePage(item.relatedItemId);
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                  }}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    background: 'var(--ci-primary)',
                                    color: 'var(--ci-white)',
                                    border: 'none',
                                    padding: '0.55rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'opacity 0.2s'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                                >
                                  <BookOpen size={15} />
                                  {relatedGuide ? `관련 매뉴얼: ${relatedGuide.title}` : '관련 상세 매뉴얼 보러가기'}
                                  <ExternalLink size={14} />
                                </button>
                              )}
                            </div>

                            <button
                              onClick={(e) => handleCopyFaqLink(e, item.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: copiedId === item.id ? 'var(--ci-secondary)' : 'var(--bg-color)',
                                color: copiedId === item.id ? 'var(--ci-white)' : 'var(--text-secondary)',
                                border: '1px solid var(--surface-border)',
                                padding: '0.4rem 0.75rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              title="이 질문의 직통 링크 복사"
                            >
                              {copiedId === item.id ? <Check size={13} /> : <LinkIcon size={13} />}
                              {copiedId === item.id ? '링크 복사됨' : '질문 링크 복사'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

