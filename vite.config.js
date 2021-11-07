import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  overlay: false,
  plugins: [vue()],
  port: 3001,
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  }

  // proxy: {
  //   '/api/': {
  //     target: 'http://192.168.9.20:8888',
  //     changeOrigin: true,
  //     configure: (proxy, options) => {
  //       // proxy will be an instance of 'http-proxy'
  //     }
  //   }
  // }
})
