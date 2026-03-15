import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import GuideContent from './components/GuideContent';
import ProgressBar from './components/ProgressBar';
import BackToTop from './components/BackToTop';
import SearchModal from './components/SearchModal';
import { AnimatePresence } from 'framer-motion';
import useSecurity from './hooks/useSecurity';
import { allGuideItems } from './data/guides';

function App() {
  useSecurity(); // 보안 로직 적용
  
  // URL 해시값 읽어오기 (초기 상태)
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && allGuideItems.some(item => item.id === hash)) {
      return hash;
    }
    return null;
  };

  const [activePage, setActivePage] = useState(getInitialPage()); // null means Hero (Home)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cmd+K 단축키 리스너
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // URL 해시 동기화 로직
  useEffect(() => {
    // 1. 상태(activePage)가 바뀔 때 브라우저 주소 표시줄 업데이트
    if (activePage) {
      window.history.pushState(null, '', `#${activePage}`);
    } else {
      // activePage가 null(메인화면)일 경우 해시 제거
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }

    // 2. 브라우저 뒤로/앞으로 가기 버튼 리스너
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash && allGuideItems.some(item => item.id === currentHash)) {
        setActivePage(currentHash);
      } else {
        setActivePage(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [activePage]);

  return (
    <div className="app-layout">
      <ProgressBar isVisible={!!activePage} />
      <Sidebar 
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={(id) => {
          setActivePage(id);
          setIsSidebarOpen(false);
        }} 
      />
      
      <div className="main-content">
        <Header activePage={activePage} setActivePage={setActivePage} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main 
          className="page-container" 
          onScroll={(e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            window.dispatchEvent(new CustomEvent('main-scroll', { detail: { isAtBottom: bottom, scrollTop: e.target.scrollTop } }));
          }}
        >
          <AnimatePresence mode="wait">
            {!activePage ? (
              <Hero key="hero" setActivePage={setActivePage} />
            ) : (
              <GuideContent key={activePage} activePage={activePage} setActivePage={setActivePage} />
            )}
          </AnimatePresence>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
