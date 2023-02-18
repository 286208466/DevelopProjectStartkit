import { createApp } from "vue";
import App from "./App.vue";

import Vant from "vant";

import "nprogress/nprogress.css";
import "vant/lib/index.css";

import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon.vue";

import router from "./router/index";
import store from "./store/index";
import directive from "./directive/index";

const app = createApp(App);

app.component("svg-icon", svgIcon);
app.use(store).use(router);

app.use(Vant);
app.mount("#app");
