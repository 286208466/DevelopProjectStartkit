import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store/index";
import directive from "./directive/index";

import "./assets/styles/base.less";
import "./assets/styles/page.less";
import "nprogress/nprogress.css";

import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon.vue";

import Vant from "vant";
import "vant/lib/index.css";
import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";
import zhCN from "vant/es/locale/lang/zh-CN";

import { createI18n } from "vue-i18n";
import messages from "./locales/index";

import axios from "./axios";

const i18n = createI18n({
  locale: "zh-CN", //en,
  messages,
});

Locale.use("en-US", enUS);
const app = createApp(App);

app.component("svg-icon", svgIcon);
app.use(store).use(router).use(i18n);

app.use(Vant);
app.mount("#app");
