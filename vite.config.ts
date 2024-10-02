import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/cervezas": {
        target: "http://localhost:4500/cervezas",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cervezas/, ""),
      },
    },
  },
  plugins: [react()],
});
