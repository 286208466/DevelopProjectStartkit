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

import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import Cookies from "js-cookie";

import "./assets/css/App.scss";
import "antd/dist/reset.css";

import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

import { HashRouter, BrowserRouter } from "react-router-dom";
import RenderRouter from "./router";

import { messages, LocaleFormatter } from "./locales";

// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import * as actions from "./redux/actions";

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

// import moment from "moment";
// import "moment/locale/zh-cn";
// moment.locale("zh-cn");

function App() {
  // const { locale, theme, pageLoading } = useSelector((state: any) => {
  //   console.log("state", state);
  //   return state.global;
  // });

  // const getAntdLocale = () => {
  //   if (locale === "en_US") {
  //     return enUS;
  //   } else if (locale === "zh_CN") {
  //     return zhCN;
  //   }
  // };
  let state = store.getState();

  let [locale, setLocale] = useState(() => {
    return state.global.locale;
  });

  console.log("locale", locale);

  return (
    <ConfigProvider
      locale={zhCN}
      // theme={{
      //   token: {
      //     colorPrimary: "#00b96b",
      //   },
      // }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IntlProvider
            locale={locale.split("_")[0]}
            messages={messages[locale.split("_")[0]]}
          >
            <BrowserRouter>
              <Suspense fallback={<h1>Loading...</h1>}>
                <Spin
                  spinning={false}
                  className="app-loading-wrapper"
                  // tip={<LocaleFormatter id="common.tips.loading" />}
                ></Spin>
                <RenderRouter />
              </Suspense>
            </BrowserRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
