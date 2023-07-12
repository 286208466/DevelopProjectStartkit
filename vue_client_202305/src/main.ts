import { createApp } from "vue";
import App from "./App.vue";

import "./assets/styles/all.scss";

import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

import router from "@/router/index";
import store from "@/store/index";

import SvgIcon from "./components/SvgIcon.vue";
import "virtual:svg-icons-register";

import directive from "./directives/index";
const app = createApp(App);

// app.config.globalProperties.$utils = {};
app.config.errorHandler = (err) => {
  console.log(err);
};

app.use(router).use(store);

app.use(directive);

app.component("SvgIcon", SvgIcon);

app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  //   componentPrefix: "arco",
});

app.mount("#app");
