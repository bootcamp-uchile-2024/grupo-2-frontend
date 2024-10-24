import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

const apiUrl = process.env.VITE_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/cervezas": {
        target: `${apiUrl}/cervezas`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cervezas/, ""),
      },
    },
  },
  plugins: [react()],
});
