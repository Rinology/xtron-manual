import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, Search, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, ExternalLink,
  Link as LinkIcon, Check, Info, Lightbulb, AlertTriangle,
  ShieldAlert, MessageCircle, BookOpen, FileDown, X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import { useGuides } from '../context/GuideContext';
import VideoPlayer from './VideoPlayer';

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeRaw];

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

const faqMermaidSvgCache = new Map();

const MermaidChart = React.memo(({ chart }) => {
  const [svg, setSvg] = useState(() => faqMermaidSvgCache.get(chart) || '');
  useEffect(() => {
    if (faqMermaidSvgCache.has(chart)) {
      setSvg(faqMermaidSvgCache.get(chart));
      return;
    }
    let cancelled = false;
    const renderChart = async () => {
      try {
        const id = 'faq-mermaid-' + Math.random().toString(36).substr(2, 9);
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        faqMermaidSvgCache.set(chart, renderedSvg);
        if (!cancelled) setSvg(renderedSvg);
      } catch (e) {
        console.error('FAQ Mermaid render error:', e);
        if (!cancelled) {
          setSvg('<div style="color: #d1242f; padding: 0.85rem 1rem; border: 1px solid rgba(209,36,47,0.3); border-radius: 8px; font-size: 0.85rem;">순서도 표시 중 오류가 발생했습니다. 문법을 확인해 주세요.</div>');
        }
      }
    };
    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      className="custom-scrollbar"
      style={{
        width: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        margin: '1.25rem 0',
        padding: '1.25rem 0.85rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--surface-border)',
        borderRadius: '12px'
      }}
    >
      <div
        className="faq-mermaid-svg-wrap"
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content', margin: '0 auto' }}
      />
    </div>
  );
});

/**
 * FAQ 시트 전용 간편 문법 전처리기 (Pre-processor)
 * 1) [표] ... [/표] (또는 표 ... /표): '|' 구분자 텍스트를 마크다운 표(Table)로 자동 변환
 * 2) [순서도] ... [/순서도] (또는 순서도 ... /순서도): '>' 구분자 텍스트를 Mermaid 순서도로 자동 변환
 * 3) 본문 내 '버튼이름 | https://...' 한 줄 입력 시 링크 바로가기 버튼으로 자동 변환
 */
const preprocessFaqAnswer = (rawText, isMobile = false) => {
  if (!rawText || typeof rawText !== 'string') return '';

  let processed = rawText.replace(/\r\n/g, '\n');

  // 1. [표] ... [/표] 블록 변환 (대괄호 필수: 일반 텍스트 내 '표' 단어와의 오작동 방지)
  processed = processed.replace(
    /(?:^|\n)[ \t]*\[표\][ \t]*\n([\s\S]*?)\n[ \t]*\[\/표\](?=[ \t]*(?:\n|$))/g,
    (_, tableBody) => {
      const rows = tableBody
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      if (rows.length === 0) return '';

      const normalizeRow = (line) => {
        const stripped = line.replace(/^\|/, '').replace(/\|$/, '');
        const cells = stripped.includes('|')
          ? stripped.split('|').map(c => c.trim())
          : stripped.split('\t').map(c => c.trim());
        return cells;
      };

      const parsedCells = rows.map(normalizeRow);
      // 전체 행 중 가장 칸 수가 많은 행을 기준으로 열 개수(colCount) 확정
      const colCount = Math.max(...parsedCells.map(c => c.length), 1);

      // 두 번째 줄이 마크다운 구분선(|---|)인지 검사
      const hasSeparator =
        parsedCells.length > 1 &&
        parsedCells[1].every(c => /^:?-{2,}:?$/.test(c));

      // 헤더 행: 데이터 행보다 열이 부족해도 colCount에 맞게 빈 칸을 채워 깨짐 방지
      const headerCells = [...parsedCells[0]];
      while (headerCells.length < colCount) headerCells.push('');
      const headerLine = `| ${headerCells.join(' | ')} |`;

      // 구분선 행 (| --- | --- |)
      const separatorLine = `| ${Array(colCount).fill('---').join(' | ')} |`;

      // 본문 데이터 행: 열이 부족한 행은 자동으로 빈칸('')을 채워 넣어 정렬 유지
      const dataRows = hasSeparator ? parsedCells.slice(2) : parsedCells.slice(1);
      const bodyLines = dataRows.map(cells => {
        const padded = [...cells];
        while (padded.length < colCount) padded.push('');
        return `| ${padded.join(' | ')} |`;
      });

      return `\n\n${[headerLine, separatorLine, ...bodyLines].join('\n')}\n\n`;
    }
  );

  // 2. [순서도], [세로순서도], [가로순서도] 블록 변환
  // 모바일에서는 [순서도]가 항시 세로(TD)로 렌더링되며, 명시적 [세로순서도]/[가로순서도]도 완벽 지원
  processed = processed.replace(
    /(?:^|\n)[ \t]*\[(순서도|가로순서도|세로순서도)\][ \t]*\n([\s\S]*?)\n[ \t]*\[\/(?:순서도|가로순서도|세로순서도)\](?=[ \t]*(?:\n|$))/g,
    (_, tagType, flowBody) => {
      const lines = flowBody
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      if (lines.length === 0) return '';

      if (/^(graph|flowchart)\s+(TD|TB|BT|RL|LR)/i.test(lines[0])) {
        return `\n\n\`\`\`mermaid\n${lines.join('\n')}\n\`\`\`\n\n`;
      }

      const nodeMap = new Map();
      let nodeCounter = 0;
      const getNodeId = (label) => {
        const cleanLabel = label.trim();
        if (!nodeMap.has(cleanLabel)) {
          nodeCounter += 1;
          nodeMap.set(cleanLabel, `N${nodeCounter}`);
        }
        return nodeMap.get(cleanLabel);
      };

      const edges = [];
      lines.forEach(line => {
        const steps = line
          .split(/\s*(?:->|>)\s*/)
          .map(s => s.trim())
          .filter(Boolean);

        for (let i = 0; i < steps.length - 1; i++) {
          const fromId = getNodeId(steps[i]);
          const toId = getNodeId(steps[i + 1]);
          edges.push(`  ${fromId}["${steps[i].replace(/"/g, "'")}"] --> ${toId}["${steps[i + 1].replace(/"/g, "'")}"]`);
        }
      });

      if (edges.length === 0) return '';

      // 방향 결정:
      // - [세로순서도]: 무조건 TD
      // - [가로순서도]: 무조건 LR
      // - [순서도]: 모바일(isMobile === true)이면 항시 세로(TD), PC에서는 가로(LR)
      let direction = 'TD';
      if (tagType === '세로순서도') {
        direction = 'TD';
      } else if (tagType === '가로순서도') {
        direction = 'LR';
      } else {
        direction = isMobile ? 'TD' : 'LR';
      }

      const mermaidCode = [
        `flowchart ${direction}`,
        ...edges
      ].join('\n');

      return `\n\n\`\`\`mermaid\n${mermaidCode}\n\`\`\`\n\n`;
    }
  );

  // 3. 본문 내 '버튼이름 | https://...' 형태를 액션 버튼 링크로 자동 변환 (마크다운 표 내부 행은 제외)
  processed = processed
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) return line;

      const match = trimmed.match(/^\[?([^|\n\]]+?)\s*\|\s*(https?:\/\/[^\s\]]+)\]?$/i);
      if (match) {
        const label = match[1].trim();
        const url = match[2].trim();
        const separator = url.includes('#') ? '&' : '#';
        return `[${label}](${url}${separator}faq-action-btn)`;
      }
      return line;
    })
    .join('\n');

  return processed;
};

// R2 미디어 경로 자동 보정 헬퍼 (GuideContent.jsx와 동일 규격)
const resolveMediaUrl = (src) => {
  if (!src) return '';
  const cdnBase = (import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr').replace(/\/+$/, '');
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

// 마크다운 컴포넌트 설정 (모듈 스코프에 고정하여 리렌더링 시 이미지/동영상이 깜빡이며 재마운트되는 현상 방지)
const MarkdownComponents = {
  h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.25rem', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--surface-border)' }} {...props} />,
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
      <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '0.75rem', whiteSpace: 'pre-line' }} {...props}>
        {filteredChildren}
      </p>
    );
  },
  ul: ({ node, ...props }) => <ul style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7, paddingLeft: '1.5rem', marginBottom: '0.75rem' }} {...props} />,
  ol: ({ node, ...props }) => <ol style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7, paddingLeft: '1.5rem', marginBottom: '0.75rem' }} {...props} />,
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
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match && match[1] === 'mermaid') {
      return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
    }
    return (
      <code
        className={className}
        style={inline ? {
          background: 'rgba(0,0,0,0.05)',
          padding: '0.18rem 0.4rem',
          borderRadius: '4px',
          color: '#d1242f',
          fontFamily: 'monospace',
          fontSize: '0.85em'
        } : {}}
        {...props}
      >
        {children}
      </code>
    );
  },
  table: ({ node, children, ...props }) => (
    <div
      className="custom-scrollbar"
      style={{
        width: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        margin: '1.25rem 0',
        borderRadius: '8px',
        border: '1px solid var(--surface-border)'
      }}
    >
      <table style={{ width: '100%', minWidth: '440px', borderCollapse: 'collapse', fontSize: '0.86rem' }} {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      style={{
        background: 'var(--ci-primary-light)',
        color: 'var(--text-primary)',
        fontWeight: 600,
        textAlign: 'left',
        padding: '0.75rem 0.95rem',
        borderBottom: '2px solid rgba(47, 98, 134, 0.2)',
        whiteSpace: 'nowrap'
      }}
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      style={{
        padding: '0.75rem 0.95rem',
        borderBottom: '1px solid var(--surface-border)',
        color: 'var(--text-primary)',
        lineHeight: 1.5
      }}
      {...props}
    />
  ),
  a: ({ node, href, children, ...props }) => {
    if (href && (href.endsWith('#faq-action-btn') || href.endsWith('&faq-action-btn'))) {
      const cleanHref = href.replace(/[#&]faq-action-btn$/, '');
      return (
        <a
          href={cleanHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(47, 98, 134, 0.08)',
            color: 'var(--ci-primary)',
            border: '1px solid rgba(47, 98, 134, 0.28)',
            padding: '0.48rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            marginTop: '0.35rem',
            marginRight: '0.5rem',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--ci-primary)';
            e.currentTarget.style.color = 'var(--ci-white)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(47, 98, 134, 0.08)';
            e.currentTarget.style.color = 'var(--ci-primary)';
          }}
        >
          <span>{children}</span>
          <ExternalLink size={14} />
        </a>
      );
    }
    if (href && href.endsWith('.pdf')) {
      const r2Url = import.meta.env.VITE_CDN_URL || 'https://cdn.xtron-guide.kr';
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
        style={{
          width: 'auto', maxWidth: 'min(100%, 520px)', maxHeight: '480px',
          objectFit: 'contain', borderRadius: '8px',
          border: '1px solid var(--surface-border)', display: 'block', margin: '1rem auto'
        }}
        {...props}
      />
    );
  },
  video: ({ node, src }) => <VideoPlayer src={resolveMediaUrl(src)} />
};

function FaqBoard({ activePage, setActivePage }) {
  const { faqItems, isFaqLoading, allGuideItems } = useGuides();
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerHovered, setIsTickerHovered] = useState(false);
  const [openRelatedPopupId, setOpenRelatedPopupId] = useState(null);

  const itemRefs = useRef({});
  const relatedPopupRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  // 카테고리 스크롤 화살표(< >) 활성화 상태 계산
  const updateCategoryScrollState = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateCategoryScrollState();
    window.addEventListener('resize', updateCategoryScrollState);
    return () => window.removeEventListener('resize', updateCategoryScrollState);
  }, [categories, updateCategoryScrollState]);

  const scrollCategories = (direction) => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.65, 180);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // 외부 클릭 시 관련 매뉴얼 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (relatedPopupRef.current && !relatedPopupRef.current.contains(event.target)) {
        setOpenRelatedPopupId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 전체 탭 상단 1줄 롤링용 질문 풀 (Pinned 순서 우선 + 미지정 항목 랜덤 셔플)
  const rollingFaqs = useMemo(() => {
    const pinned = (faqItems || [])
      .filter(f => f.pinned && f.id && f.question)
      .sort((a, b) => a.pinned - b.pinned);

    const unpinned = (faqItems || [])
      .filter(f => !f.pinned && f.id && f.question);

    for (let i = unpinned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unpinned[i], unpinned[j]] = [unpinned[j], unpinned[i]];
    }

    return [...pinned, ...unpinned];
  }, [faqItems]);

  // 전체 탭이고 검색어가 없을 때 3.5초 주기로 롤링
  useEffect(() => {
    if (selectedCategory !== '전체' || searchQuery.trim() !== '' || rollingFaqs.length <= 1 || isTickerHovered) {
      return;
    }
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % rollingFaqs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [selectedCategory, searchQuery, rollingFaqs.length, isTickerHovered]);

  const currentRollingFaq = rollingFaqs.length > 0
    ? rollingFaqs[tickerIndex % rollingFaqs.length]
    : null;

  // 특정 FAQ_ID 해시(예: #FAQ-001)로 진입했을 때만 해당 아코디언 자동 펼침 및 스크롤 이동
  // 일반 'faq' 페이지 진입 시에는 모든 질문이 닫힌 상태로 표시
  useEffect(() => {
    if (!faqItems || faqItems.length === 0) return;

    if (activePage && activePage !== 'faq') {
      const targetFaq = faqItems.find(f => f.id.toLowerCase() === activePage.toLowerCase());
      if (targetFaq) {
        setSelectedCategory('전체');
        setSearchQuery('');
        setOpenIds({ [targetFaq.id]: true });
        setOpenRelatedPopupId(null);
        setTimeout(() => {
          const el = itemRefs.current[targetFaq.id];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    } else if (activePage === 'faq') {
      setOpenIds({});
      setOpenRelatedPopupId(null);
    }
  }, [activePage, faqItems]);

  // 단일 아코디언 토글: 선택한 질문만 열리고 다른 질문은 자동으로 닫힘
  const toggleItem = (id) => {
    setOpenRelatedPopupId(null);
    setOpenIds(prev => prev[id] ? {} : { [id]: true });
  };

  const handleRollingFaqClick = (faq) => {
    if (!faq) return;
    setOpenRelatedPopupId(null);
    setOpenIds({ [faq.id]: true });
    setTimeout(() => {
      const el = itemRefs.current[faq.id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
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

  // 카테고리 + 검색어 필터링 및 정렬 (Pinned 1~10 순위 우선)
  // '전체' 탭이고 검색어가 없을 때는 Pinned(숫자 또는 TRUE)로 지정된 핵심 질문만 최대 10개 노출
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = faqItems.filter(item => {
      const matchesCat = selectedCategory === '전체' || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (!query) return true;

      const inQ = (item.question || '').toLowerCase().includes(query);
      const inA = (item.answer || '').toLowerCase().includes(query);
      const inK = (item.keywords || '').toLowerCase().includes(query);
      const inCat = (item.category || '').toLowerCase().includes(query);
      return inQ || inA || inK || inCat;
    });

    const sorted = filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      if (a.pinned && b.pinned) return a.pinned - b.pinned;
      return 0;
    });

    // '전체' 탭 + 검색어 없음: Pinned 핵심 항목 최대 10개 + 현재 해시/롤링 클릭으로 열려있는 항목 포함
    if (selectedCategory === '전체' && !query) {
      const pinnedTop = sorted.filter(item => Boolean(item.pinned)).slice(0, 10);
      const openedExtras = sorted.filter(item => !item.pinned && openIds[item.id]);
      const combined = [...pinnedTop, ...openedExtras];
      return combined.length > 0 ? combined : sorted.slice(0, 10);
    }

    return sorted;
  }, [faqItems, selectedCategory, searchQuery, openIds]);

  if (isFaqLoading) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{
          display: 'inline-block', width: '30px', height: '30px',
          border: '3px solid var(--surface-border)', borderTop: '3px solid var(--ci-primary)',
          borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p>빠른 답변을 불러오고 있습니다...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '4rem', paddingTop: '1rem' }}>
      <div className="glass-panel guide-panel">
        {/* 상단 타이틀 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--ci-primary-light)', color: 'var(--ci-primary)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>
                빠른 답변 (FAQ)
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

        {/* 카테고리 필터 탭 (1줄 가로 스크롤 + < > 네비게이션 버튼으로 모바일 줄바꿈 완벽 방지) */}
        {categories.length > 1 && (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.75rem' }}>
            {/* 좌측 스크롤 버튼 (<) */}
            {canScrollLeft && (
              <button
                onClick={() => scrollCategories('left')}
                aria-label="이전 카테고리 보기"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid var(--surface-border)',
                  background: 'var(--ci-white)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s',
                  zIndex: 2
                }}
              >
                <ChevronLeft size={16} />
              </button>
            )}

            <div
              ref={categoryScrollRef}
              onScroll={updateCategoryScrollState}
              className="faq-category-scroll"
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                padding: '0.15rem 0',
                flex: 1
              }}
            >
              <style>{`.faq-category-scroll::-webkit-scrollbar { display: none; }`}</style>
              {categories.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenIds({});
                      setOpenRelatedPopupId(null);
                    }}
                    style={{
                      padding: '0.5rem 1.05rem',
                      borderRadius: 'var(--radius-full)',
                      border: isActive ? '1px solid var(--ci-primary)' : '1px solid var(--surface-border)',
                      background: isActive ? 'var(--ci-primary)' : 'var(--ci-white)',
                      color: isActive ? 'var(--ci-white)' : 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* 우측 스크롤 버튼 (>) */}
            {canScrollRight && (
              <button
                onClick={() => scrollCategories('right')}
                aria-label="다음 카테고리 보기"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid var(--surface-border)',
                  background: 'var(--ci-white)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s',
                  zIndex: 2
                }}
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* '전체' 탭이고 검색어가 없을 때: 상단 1줄 롤링 메뉴 + 주요 질문 안내 */}
        {selectedCategory === '전체' && !searchQuery.trim() && currentRollingFaq && (
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <div style={{ width: '4px', height: '15px', background: 'var(--ci-secondary)', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                실시간 추천 질문
              </span>
            </div>

            <div
              onMouseEnter={() => setIsTickerHovered(true)}
              onMouseLeave={() => setIsTickerHovered(false)}
              onClick={() => handleRollingFaqClick(currentRollingFaq)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.95rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-color)',
                border: '1px solid var(--surface-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--ci-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >

              <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRollingFaq.id}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {currentRollingFaq.category && (
                      <span style={{
                        background: 'var(--surface-border)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        flexShrink: 0
                      }}>
                        {currentRollingFaq.category}
                      </span>
                    )}
                    <span style={{
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%'
                    }}>
                      {currentRollingFaq.question}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', flexShrink: 0, paddingLeft: '0.25rem' }}>
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        )}

        {/* '전체' 탭이고 검색어가 없을 때 하단 핵심 질문 섹션 타이틀 */}
        {selectedCategory === '전체' && !searchQuery.trim() && filteredFaqs.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '4px', height: '15px', background: 'var(--ci-primary)', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                핵심 빠른 답변
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              분야별 전체 질문은 상단 카테고리 탭을 선택해 주세요
            </span>
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

              // 콤마(,) 구분자로 연결된 복수 매뉴얼 ID 파싱 및 유효한 매뉴얼 항목만 안전하게 매칭
              // (구분자 오류나 존재하지 않는 ID가 입력된 경우 에러 없이 링크 노출 생략)
              const rawRelatedIds = Array.isArray(item.relatedItemIds) && item.relatedItemIds.length > 0
                ? item.relatedItemIds
                : (item.relatedItemId ? String(item.relatedItemId).split(',').map(s => s.trim()).filter(Boolean) : []);

              const matchedRelatedGuides = rawRelatedIds
                .map(relId => (allGuideItems || []).find(g => g && g.id && g.id.toLowerCase() === relId.toLowerCase()))
                .filter(Boolean);

              const isHighlighted = activePage && activePage.toLowerCase() === item.id.toLowerCase();
              const isRelatedPopupOpen = openRelatedPopupId === item.id;

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
                    // 기존 대비 약 20% 이상 진하고 넓어진 3D 뎁스 그림자 적용
                    boxShadow: isOpen
                      ? '0 14px 32px -4px rgba(47, 98, 134, 0.24), 0 6px 14px -2px rgba(0, 0, 0, 0.10)'
                      : 'var(--shadow-sm)',
                    transform: isOpen ? 'translateY(-3px)' : 'none',
                    position: 'relative',
                    zIndex: isOpen ? 10 : 1,
                    overflow: 'visible',
                    transition: 'all 0.22s ease'
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
                      {/* Pinned 녹색 전구 아이콘 */}
                      {item.pinned && (
                        <Lightbulb size={17} color="var(--ci-secondary)" style={{ flexShrink: 0 }} />
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
                        fontWeight: isOpen ? 600 : 500,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4
                      }}>
                        {item.question}
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
                        style={{ overflow: isRelatedPopupOpen ? 'visible' : 'hidden' }}
                      >
                        <div style={{
                          padding: '0 1.35rem 1.35rem 1.35rem',
                          borderTop: '1px solid var(--surface-border)',
                          paddingTop: '1.15rem'
                        }}>
                          <div className="markdown-body">
                            <ReactMarkdown
                              remarkPlugins={REMARK_PLUGINS}
                              rehypePlugins={REHYPE_PLUGINS}
                              components={MarkdownComponents}
                            >
                              {preprocessFaqAnswer(item.answer, isMobile)}
                            </ReactMarkdown>
                          </div>

                          {/* 하단 액션 바: 관련 매뉴얼 (단일/퀵메뉴 팝업) & 개별 질문 링크 복사 */}
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
                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              {matchedRelatedGuides.length === 1 && (
                                <button
                                  onClick={() => {
                                    setActivePage(matchedRelatedGuides[0].id);
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                  }}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    background: 'var(--ci-primary)',
                                    color: 'var(--ci-white)',
                                    border: 'none',
                                    padding: '0.52rem 0.95rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.86rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'opacity 0.2s'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                                >
                                  <BookOpen size={15} />
                                  <span>{matchedRelatedGuides[0].title.replace(/^ㄴ\s*/, '')}</span>
                                  <ExternalLink size={13} />
                                </button>
                              )}

                              {matchedRelatedGuides.length > 1 && (
                                <div style={{ position: 'relative' }} ref={isRelatedPopupOpen ? relatedPopupRef : null}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenRelatedPopupId(isRelatedPopupOpen ? null : item.id);
                                    }}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.45rem',
                                      background: 'var(--ci-primary)',
                                      color: 'var(--ci-white)',
                                      border: 'none',
                                      padding: '0.52rem 0.95rem',
                                      borderRadius: 'var(--radius-md)',
                                      fontSize: '0.86rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      boxShadow: 'var(--shadow-sm)',
                                      transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                                  >
                                    <BookOpen size={15} />
                                    <span>관련 매뉴얼 ({matchedRelatedGuides.length})</span>
                                    {isRelatedPopupOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                  </button>

                                  <AnimatePresence>
                                    {isRelatedPopupOpen && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                        transition={{ duration: 0.18 }}
                                        style={{
                                          position: 'absolute',
                                          bottom: 'calc(100% + 8px)',
                                          left: 0,
                                          background: 'var(--ci-white)',
                                          padding: '0.45rem',
                                          borderRadius: '14px',
                                          boxShadow: 'var(--shadow-lg)',
                                          border: '1px solid var(--surface-border)',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '0.15rem',
                                          minWidth: '220px',
                                          maxWidth: 'min(290px, 82vw)',
                                          zIndex: 500
                                        }}
                                      >
                                        <span style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', padding: '0.35rem 0.75rem', fontWeight: 600 }}>
                                          관련 매뉴얼 바로가기
                                        </span>
                                        {matchedRelatedGuides.map(guide => (
                                          <button
                                            key={guide.id}
                                            onClick={() => {
                                              setOpenRelatedPopupId(null);
                                              setActivePage(guide.id);
                                              window.scrollTo({ top: 0, behavior: 'instant' });
                                            }}
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'space-between',
                                              gap: '0.6rem',
                                              padding: '0.62rem 0.75rem',
                                              borderRadius: '10px',
                                              background: 'transparent',
                                              border: 'none',
                                              color: 'var(--text-primary)',
                                              fontSize: '0.85rem',
                                              fontWeight: 500,
                                              cursor: 'pointer',
                                              textAlign: 'left',
                                              fontFamily: 'inherit',
                                              transition: 'background 0.15s'
                                            }}
                                            onMouseEnter={e => {
                                              e.currentTarget.style.background = 'var(--surface-border)';
                                              e.currentTarget.style.color = 'var(--ci-primary)';
                                            }}
                                            onMouseLeave={e => {
                                              e.currentTarget.style.background = 'transparent';
                                              e.currentTarget.style.color = 'var(--text-primary)';
                                            }}
                                          >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
                                              <BookOpen size={15} color="var(--ci-primary)" style={{ flexShrink: 0 }} />
                                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {guide.title.replace(/^ㄴ\s*/, '')}
                                              </span>
                                            </div>
                                            <ExternalLink size={13} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
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
                                transition: 'all 0.2s',
                                flexShrink: 0
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
    </div>
  );
}

export default React.memo(FaqBoard);
