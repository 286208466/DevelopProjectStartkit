import React from "react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
} from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return <></>;
  }
}

export default App;

/*

使用示例:

文件： App.js

import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./routers";
import LoadingComponent from "@/compontents/Loading";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
        <RenderRouter />
      </Suspense>
    </BrowserRouter>
  );
}

*/