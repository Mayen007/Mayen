import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'os': 'rollup-plugin-node-polyfills/polyfills/os',
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  build: {
    // Output directory
    outDir: 'dist',
    // Generate sourcemaps for production debugging (optional)
    sourcemap: false,
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Chunk size warning limit (500kb)
    chunkSizeWarningLimit: 500,
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor chunk for React and related libraries
          'react-vendor': ['react', 'react-dom'],
          // Framer Motion in separate chunk
          'framer': ['framer-motion'],
          // GitHub API related
          'github': ['octokit', '@tanstack/react-query'],
          // Icons
          'icons': ['react-icons'],
          // Markdown and syntax highlighting
          'markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  // Server configuration for development
  server: {
    port: 5173,
    open: true,
    // CORS configuration for GitHub API
    cors: true,
  },
  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },
})
