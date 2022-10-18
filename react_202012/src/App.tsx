import React, { Component, FC } from "react";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import store from "./redux/store";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
// @ts-ignore
import { format } from "./modules/client/utils/date";
// @ts-ignore
import Cookies from "js-cookie";

import "antd/dist/antd.css";

import "./modules/client/styles/normalize.css";
import "./modules/client/styles/common.css";
import "./modules/client/styles/animate.css";
import "./modules/client/styles/layout.css";
import NotFound from "./views/NotFound";
import Login from "./views/login";
import Demo from "./views/demo";
import DatavDemo1 from "./views/datav/demo1";
import Maptalks_3d from "./views/datav/maptalks_3d";
import Layout from "./layout/index";

import "./mock/index.js";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !!Cookies.get("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute path="/manage" name="manage" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/demo" component={Demo} />
            <Route exact path="/datav/demo1" component={DatavDemo1} />
            <Route exact path="/datav/maptalks_3d" component={Maptalks_3d} />
            <Route exact path="/404" component={NotFound} />
            <Redirect exact from="/" to="/login" />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
