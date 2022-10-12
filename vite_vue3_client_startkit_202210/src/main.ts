import { createApp } from "vue";
import App from "./App.vue";

import "nprogress/nprogress.css";

import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon.vue";

import router from "./router/index";
import store from "./store/index";
import directive from "./directive/index";

const app = createApp(App);
app.use(store).use(router).component("svg-icon", svgIcon).mount("#app");
