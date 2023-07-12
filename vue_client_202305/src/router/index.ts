import { createRouter, createWebHistory } from "vue-router";

const routes: any[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "baseLogin",
    component: () => import("@/pages/base/login.vue"),
    meta: {
      title: "登陆",
      theme: "light",
      keepAlive: false,
      roles: [],
    },
  },
  {
    path: "/loginSupport",
    name: "baseLoginSupport",
    component: () => import("@/pages/base/loginSupport.vue"),
    meta: {
      title: "无法登陆",
      theme: "light",
      keepAlive: false,
      roles: [],
    },
  },

  {
    path: "/register",
    name: "baseRegister",
    component: () => import("@/pages/base/register.vue"),
    meta: {
      title: "注册",
      theme: "light",
      keepAlive: false,
      roles: [],
    },
  },
  {
    path: "/findPwd",
    name: "baseFindPwd",
    component: () => import("@/pages/base/findPwd.vue"),
    meta: {
      title: "找回密码",
      theme: "light",
      keepAlive: false,
      roles: [],
    },
  },
  {
    path: "/notfound",
    name: "errorNotFound",
    component: () => import("@/pages/error/404.vue"),
    meta: {
      title: "",
      theme: "light",
      keepAlive: false,
      roles: [],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/notfound",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
