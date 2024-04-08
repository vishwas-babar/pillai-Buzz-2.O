import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api":"https://pillai-buzz-goo4.vercel.app/"
      "/api": "http://127.0.0.1:8000/",
      // "/api": "https://pillai-buzz.onrender.com/"
    },
  },
  plugins: [react()],
});
