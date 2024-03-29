import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/layout/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
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
    path: "/components/icons",
    name: "ICONS",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "icon" */ "../pages/components/icon.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/login/index.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
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
