import React from "react";

import { Provider } from "react-redux";

import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';
import en_US from "antd/locale/en_US"
import Cookies from "js-cookie";

import "./assets/css/base.less";
import "./assets/css/page.less";
import "antd/dist/reset.css";

import store from "./redux/store";

// import NotFound from "./views/NotFound";
// import Login from "./views/login";
// import Demo from "./views/demo";
// import DatavDemo1 from "./views/datav/demo1";
// import Maptalks_3d from "./views/datav/maptalks_3d";
// import Layout from "./layout/index";

// import "./mock/index.js";

// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <div className="App"></div>
    </ConfigProvider>
  );
}

export default App;
