import { useEffect } from 'react';

const useSecurity = () => {
  useEffect(() => {
    // 1. 우클릭 (컨텍스트 메뉴) 차단
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // 2. 개발자 도구 및 소스 보기 단축키 차단 (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J (Windows) / Cmd+Option+J (Mac)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (Windows) / Cmd+Option+U (Mac) - 소스 보기
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    // 3. 이미지 드래그 방지
    const handleDragStart = (e) => {
      if (e.target.tagName.toLowerCase() === 'img') {
        e.preventDefault();
        return false;
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // 클린업 함수 (언마운트 시 리스너 제거)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
};

export default useSecurity;
