import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// import { viteMockServe } from "vite-plugin-mock";
import path from "path";
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  console.log("config", config);
  return {
    plugins: [vue(), 
      //viteMockServe({})
    ],
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/assets/styles/vars.scss';`,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      https: false,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:5000",
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
          demo: path.resolve(__dirname, "demo.html"),
        },
      },
    },
  };
});
