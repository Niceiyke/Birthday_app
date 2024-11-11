

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/birthdayapp/', // Replace with your subdirectory path
  plugins: [react()],
});
