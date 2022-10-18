import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
} from "react";

import {
  HashRouter,
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import * as actions from "./redux/actions";

import { IntlProvider } from "react-intl";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { localeConfig, LocaleFormatter } from "./locales";

import { ConfigProvider, Spin } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";

import { useDispatch, useSelector } from "react-redux";

// import "@/mock/index.js";

import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/zh-cn";

import RenderRouter from "./router";
import { history, HistoryRouter } from "./router/history";

import "antd/dist/antd.css";
import "@/assets/App.scss";

const isDev = false;

const themes = {
  // light: isDev
  //   ? "../node_modules/antd/dist/antd.css"
  //   : "https://cdn.jsdelivr.net/npm/antd@4.17.2/dist/antd.css",
  // dark: isDev
  //   ? "../node_modules/antd/dist/antd.dark.css"
  //   : "https://cdn.jsdelivr.net/npm/antd@4.17.2/dist/antd.dark.css",
};

const App: React.FC = (props: any) => {
  console.log("props", props);

  const { locale, theme, pageLoading } = useSelector((state: any) => {
    console.log("state", state);
    return state.global;
  });
  useEffect(() => {
    if (locale === "en_US") {
      moment.locale("en");
    } else if (locale === "zh_CN") {
      moment.locale("zh-cn");
    }
  }, [locale]);

  const getAntdLocale = () => {
    if (locale === "en_US") {
      return enUS;
    } else if (locale === "zh_CN") {
      return zhCN;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <ThemeSwitcherProvider defaultTheme={theme} themeMap={themes}>
        <IntlProvider
          locale={locale.split("_")[0]}
          messages={localeConfig[locale]}
        >
          <HistoryRouter history={history}>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Spin
                spinning={false}
                className="app-loading-wrapper"
                tip={<LocaleFormatter id="common.tips.loading" />}
              ></Spin>
              <RenderRouter />
            </Suspense>
          </HistoryRouter>
        </IntlProvider>
      </ThemeSwitcherProvider>
    </ConfigProvider>
  );
};

// const mapStateToProps = (state) => ({
//   global: state.global,
// });
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(actions, dispatch);
// };
// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
