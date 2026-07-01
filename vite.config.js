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
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.xtron-guide\.kr\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'xtron-cdn-image-cache',
              expiration: {
                maxEntries: 500, // 최대 500개 이미지 캐시
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1년 (초 단위)
              },
              cacheableResponse: {
                statuses: [0, 200] // Opaque response (CORS) 대응을 위해 0 상태 코드 포함
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1년
              }
            }
          }
        ]
      }
    })
  ],
  base: '/',
})
