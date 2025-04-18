import { createApp } from "vue";
import App from "./App.vue";

import "nprogress/nprogress.css";


import SvgIcon from "./components/SvgIcon.vue";
// import "virtual:svg-icons-register";

import "@arco-design/web-vue/dist/arco.css";
import ArcoVue from "@arco-design/web-vue";

import router from "./router/index";
import store from "./store/index";
// import directive from "./directives/index";

// import { createI18n } from "vue-i18n";
// import messages from "@/locales/index";
// const i18n = createI18n({
//   locale: zhCn.name,
//   // fallbackLocale: localeEN.name,
//   messages,
// });

const app = createApp(App);

// app.config.globalProperties.$utils = {};
app.config.errorHandler = (err) => {
  console.log(err);
};

app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  //   componentPrefix: "arco",
});
app.use(router);
app.use(store);
// app.use(i18n)
// app.use(directive);

app.component("SvgIcon", SvgIcon);

app.mount("#app");
