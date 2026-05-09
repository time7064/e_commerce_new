import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/e_commerce_new",  // 서버 배포 관련 추가 - 원인
})
