
vite.config

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import federation from "@originjs/vite-plugin-federation";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";

import svgLoader from "vite-svg-loader";

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
    svgLoader(),
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
    cors: true,
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

```


package.json
```json
{
  "name": "vite_vue3_client_startkit_202210",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "build:dev": "vite build --mode development",
    "build:test": "vite build --mode test",
    "build:pro": "vite build --mode production",
    "start": "electron .",
    "packager": "electron-packager ./dist/ --platform=win32 --arch=x64 --overwrite",
    "electron": "wait-on tcp:3000 && cross-env isDev=true electron .",
    "electron:dev": "concurrently -k \"cross-env BROWSER=none npm run dev\" \"npm run electron\"",
    "electron:build.win": "npm run build && electron-builder --win --dir",
    "electron:build.linux": "npm run build && electron-builder --linux appImage",
    "electron:build.test": "npm run build && electron-builder --dir",
    "electron:build.exe": "npm run build && electron-builder --win"
  },
  "dependencies": {
    "axios": "^1.0.0",
    "js-cookie": "^3.0.1",
    "less": "^4.1.3",
    "less-loader": "^11.0.0",
    "mockjs": "^1.1.0",
    "nprogress": "^0.2.0",
    "vite-svg-loader": "^3.6.0",
    "vue": "^3.2.37",
    "vue-i18n": "^9.2.2",
    "vue-router": "^4.1.5",
    "vuex": "^4.0.2",
    "vuex-persistedstate": "^4.1.0"
  },
  "devDependencies": {
    "@arco-design/web-vue": "^2.44.7",
    "@intlify/vite-plugin-vue-i18n": "^6.0.3",
    "@originjs/vite-plugin-federation": "^1.1.9",
    "@vitejs/plugin-vue": "^3.1.0",
    "@vitejs/plugin-vue-jsx": "^3.0.1",
    "concurrently": "^7.4.0",
    "cross-env": "^7.0.3",
    "electron": "^21.1.0",
    "electron-builder": "^23.6.0",
    "electron-packager": "^16.0.0",
    "fast-glob": "^3.2.12",
    "typescript": "^4.6.4",
    "vite": "^3.1.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-cropperjs": "^5.0.0",
    "vue-tsc": "^0.40.4",
    "wait-on": "^6.0.1"
  },
  "build": {
    "appId": "com.electron.myapp",
    "productName": "MyApp",
    "copyright": "Copyright © 2022 ${author}",
    "mac": {
      "category": "public.app-category.utilities"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "files": [
      "dist/**/*",
      "electron/**/*"
    ],
    "directories": {
      "buildResources": "assets",
      "output": "dist_electron"
    },
    "electronDownload": {
      "mirror": "https://npm.taobao.org/mirrors/electron/"
    }
  }
}

```