import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist/'),
  // base: path.resolve(__dirname, './dist'),
  base: process.env.ELECTRON == "true" ? "./" : "",
  plugins: [vue()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  //打包配置
  // pluginOptions: {
  //   electronBuilder: {
  //     builderOptions: {
  //       win: {
  //         icon: "src/assets/img/icon.ico",
  //       },

  //       mac: {
  //         icon: "src/assets/img/icon.icns",
  //       },
  //     },
  //   },
  // },
});
