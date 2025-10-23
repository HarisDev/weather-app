import { defineConfig } from 'vitest/config'
import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,tsx}'],
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.d.ts',
        '**/*.config.{ts,js}',
        '**/types/**',
      ],
    },
  },
})
