import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(
          "</head>",
          `
          <script type="text/javascript" src="/vendor/h5player.min.js"></script>
          
          </head>`
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ljfl.yqyjy.tech/api/', // 目标后端地址
        changeOrigin: true, // 修改请求头中的 origin
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});