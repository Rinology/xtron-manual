import React, { useState } from 'react';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import GuideContent from './components/GuideContent';
import { AnimatePresence } from 'framer-motion';
import useSecurity from './hooks/useSecurity';

function App() {
  useSecurity(); // 보안 로직 적용
  const [activePage, setActivePage] = useState(null); // null means Hero (Home)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--ci-white)', overflow: 'hidden' }}>
      <Sidebar 
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="main-content">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main 
          className="page-container" 
          style={{ flex: 1, padding: '0 2rem 2rem 2rem', overflowY: 'auto' }}
          onScroll={(e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            // You can dispatch a custom event or use state, but custom event is more performant for scroll
            window.dispatchEvent(new CustomEvent('main-scroll', { detail: { isAtBottom: bottom } }));
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
      </div>
    </div>
  );
}

export default App;
