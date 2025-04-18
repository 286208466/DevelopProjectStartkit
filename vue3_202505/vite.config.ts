import { defineConfig, loadEnv } from "vite";

// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  // console.log("config", config);
  return {
    plugins: [
      vue(),
      vueJsx(),

      // createSvgIconsPlugin({
      //   // Specify the icon folder to be cached
      //   iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      //   // Specify symbolId format
      //   symbolId: "icon-[dir]-[name]",

      //   /**
      //    * custom insert position
      //    * @default: body-last
      //    */
      //   // inject?: 'body-last' | 'body-first'

      //   /**
      //    * custom dom id
      //    * @default: __svg__icons__dom__
      //    */
      //   // customDomId: '__svg__icons__dom__',
      // }),
    ],
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/assets/styles/vars.scss';`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3333,
      open: true,
      https: false,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 设置路径别名
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
          demo: path.resolve(__dirname, "demo.html"),
        },
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
