import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import federation from "@originjs/vite-plugin-federation";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist/'),
  // base: path.resolve(__dirname, './dist'),
  base: process.env.ELECTRON == "true" ? "./" : "",
  plugins: [
    vue(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: resolve(__dirname, "./src/locales/*"),
    }),

    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
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
  server: {
    host: "0.0.0.0",
    port: 8888,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000", // 所要代理的目标地址
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true,
      },
    },
  },
  //打包配置
  // build: {
  //   target: "es2015", //主要用于兼容低版本浏览器 可以解决chrome65版本打包发布到服务器上页面空白的问题(主要是65版本不兼容 try catch )
  //   cssTarget: "chrome65", // 兼容低版本浏览器上样式问题
  //   assetsDir: "./assets", // 打包配置路径
  //   rollupOptions: {
  //     input: {
  //       // 主要用于配置多页面
  //       platForm: resolve(__dirname, "platform.html"),
  //       merchant: resolve(__dirname, "merchant.html"),
  //     },
  //   },
  // },
});
