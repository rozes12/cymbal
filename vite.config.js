// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // path is already imported by default in newer vite setups

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This ensures Vite knows where to resolve '@/'
      '@': path.resolve(__dirname, './src'),
    },
  },
});