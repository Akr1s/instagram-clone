import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  plugins: [react({
    jsxRuntime: 'classic'
  }), svgrPlugin(), ],
  resolve:{
      alias: {
        tslib: 'tslib/tslib.es6.js',
    },
  },
})