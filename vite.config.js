import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false, // 단순히 캐싱 목적이므로 앱 설치 관련 매니페스트는 비활성화
      devOptions: {
        enabled: true, // 로컬 개발 환경에서도 테스트 가능하도록 설정
      },
      workbox: {
        // 기본 캐싱 설정만 사용 (네이티브 브라우저 캐시 활용)
      }
    })
  ],
  base: '/',
})
