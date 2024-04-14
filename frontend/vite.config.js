import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    },
  },
  css: {
    // This option is not necessary by default, but adding for explicit configuration
    modules: {
      scopeBehaviour: 'local'
    },
    preprocessorOptions: {
      css: {
        javascriptEnabled: true // For CSS modules that might need JS evaluation
      }
    }
  },
  resolve: {
    alias: {
      '@': '/frontend/src/', // Adjust this path as necessary
    }
  }
}));
