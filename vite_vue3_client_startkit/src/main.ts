import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/css/base.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import { createI18n } from "vue-i18n";
import messages from "@/locales/index";

import router from "@/router";
import store from "@/store";

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("./mock");
  mockXHR();
}

const app = createApp(App);

const i18n = createI18n({
  locale: zhCn.name,
  // fallbackLocale: localeEN.name,
  messages,
});

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn });
app.mount("#app");
