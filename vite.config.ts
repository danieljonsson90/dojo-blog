import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // Add the plugin to the Vite config
  resolve: {
    alias: {
      '@': '/src', // Set alias for @
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: [
      ...configDefaults.exclude,
      'tests/**', // ✅ ignore folder
      'tests-examples/**', // ✅ ignore folder
    ],
  },
});
