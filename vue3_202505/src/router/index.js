import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/components/layout/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
          theme: "light",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../pages/dashboard/index.vue"
          ),
      },
    ],
  },
  {
    path: "/pages/base/icons",
    name: "ICONS",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "icon" */ "../pages/components/icon.vue"),
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

// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | vue-manage-system`;
//   const role = localStorage.getItem("ms_username");
//   if (!role && to.path !== "/login") {
//     next("/login");
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     role === "admin" ? next() : next("/403");
//   } else {
//     next();
//   }
// });

export default router;
