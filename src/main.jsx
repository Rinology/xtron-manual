import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GuideProvider } from './context/GuideContext.jsx'
import { registerSW } from 'virtual:pwa-register'

// Service Worker 등록
const updateSW = registerSW({
  onNeedRefresh() {
    // 새로운 업데이트가 있을 때 (선택적 처리)
  },
  onOfflineReady() {
    // 오프라인 준비 완료 (선택적 처리)
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuideProvider>
      <App />
    </GuideProvider>
  </React.StrictMode>,
)
