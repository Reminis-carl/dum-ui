import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig(({command, mode})=> {
  // const env = loadEnv(mode, process.cwd(), '')
  // const env = loadEnv(mode, './env')
  console.log('==========>command:', command)
  console.log('==========>mode:', mode)
  // console.log('==========>env:', env)
  
  return {
    build: {
      minify: 'esbuild'
    },
    esbuild: {
      drop: ['console', 'debugger']
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
      //   '/foo': 'http://localhost:4567',
      // // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, ''),
      // },
      // // Using the proxy instance
      // '/api/': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     console.log(proxy, options)
      //     // proxy will be an instance of 'http-proxy'
      //   },
      // },
      // // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:5174',
      //   ws: true,
      // },
    }
    }
  }
  
})
