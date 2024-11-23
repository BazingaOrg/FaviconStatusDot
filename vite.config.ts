import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  server: {
    open: true,
    port: 3000
  },
  build: {
    lib: {
      entry: 'src/core/favicon.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'vue']
    },
    minify: 'terser',
    sourcemap: true
  },
  plugins: [dts()]
}); 