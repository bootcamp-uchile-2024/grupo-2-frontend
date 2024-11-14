import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/usuarios': {
        target: 'http://localhost:4500',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
