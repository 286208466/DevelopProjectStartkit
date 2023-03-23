import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useRoutes,
} from "react-router-dom";

import { lazy, FC } from "react";

import Login from "@/pages/login";
import NotFound from "@/pages/404";

const routeList = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  // {
  //   path: "/user/*",
  //   element: <User />,
  //   // 设置子路由
  //   children: [
  //     { path: "add", element: <UserAdd /> },
  //     { path: "profile", element: <UserProfile /> },
  //   ],
  // },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

const RenderRouter = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
