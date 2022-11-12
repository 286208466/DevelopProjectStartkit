import { lazy, FC } from "react";
// import LayoutPage from "@/pages/layout";
import { Navigate, RouteObject } from "react-router";
import WrapperRouteComponent from "./config";
import { useRoutes } from "react-router-dom";

import Layout from "@/layout/index";
import Login from "@/pages/login";
import NotFound from "@/pages/404";

import Dashboard from "@/pages/dashboard/index";

const SystemLog = lazy(
  () => import(/* webpackChunkName: "systemLog'"*/ "@/pages/system/log/index")
);
const SystemAuth = lazy(
  () => import(/* webpackChunkName: "systemAuth'"*/ "@/pages/system/auth/index")
);
const SystemRole = lazy(
  () => import(/* webpackChunkName: "systemRole'"*/ "@/pages/system/role/index")
);

const routeList: RouteObject[] = [
  {
    path: "/login",
    element: <WrapperRouteComponent element={<Login />} docTitle="" />,
  },
  {
    path: "/404",
    element: <WrapperRouteComponent element={<NotFound />} docTitle="" />,
  },
  {
    path: "/manage",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: (
          <WrapperRouteComponent
            needLogin={true}
            docTitle=""
            docTheme="light"
            element={<Dashboard />}
          />
        ),
      },
      {
        path: "system/log",
        element: (
          <WrapperRouteComponent
            needLogin={true}
            docTitle=""
            docTheme="light"
            element={<SystemLog />}
          />
        ),
      },
      {
        path: "system/auth",
        element: (
          <WrapperRouteComponent
            needLogin={true}
            docTitle=""
            docTheme="light"
            element={<SystemAuth />}
          />
        ),
      },
      {
        path: "system/role",
        element: (
          <WrapperRouteComponent
            needLogin={true}
            docTitle=""
            docTheme="light"
            element={<SystemRole />}
          />
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
