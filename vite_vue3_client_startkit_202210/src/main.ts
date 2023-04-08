import { createApp } from "vue";
import App from "./App.vue";

// import "@/assets/css/base.css";
import "nprogress/nprogress.css";

import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon.vue";

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import zhCn from "element-plus/es/locale/lang/zh-cn";

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

import router from "./router/index";
import store from "./store/index";
import directive from "./directive/index";

// import { createI18n } from "vue-i18n";
// import messages from "@/locales/index";
// const i18n = createI18n({
//   locale: zhCn.name,
//   // fallbackLocale: localeEN.name,
//   messages,
// });

const app = createApp(App);
app.component("svg-icon", svgIcon);
app.use(store).use(router);
// .use(i18n)
//   .use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn });
app.use(ArcoVue);
app.mount("#app");


