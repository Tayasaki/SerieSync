import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        myseries: resolve(__dirname, 'src/components/pages/MySeries.tsx'),
        new: resolve(__dirname, 'src/components/pages/NewSeries.tsx'),
      }
    }
  }
});
