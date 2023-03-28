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

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/redux/actions";

import { Outlet, useLocation } from "react-router";

import { Spin, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "@/axios";
import Cookies from "js-cookie";

import { getFirstPathCode } from "@/utils/getFirstPathCode";
import styles from "./index.module.scss";

import AppHeader from "./Header";
import SideMenu from "./SideMenu";
import AppTabs from "./AppTabs";

import { useDispatch, useSelector } from "react-redux";
import { SET_COLLAPSED } from "@/redux/actions/global";

const { Header, Sider, Content } = Layout;

const WIDTH = 1000;
function App(props) {
  console.log("layout:props", props);

  const location = useLocation();
  const dispatch = useDispatch();

  const [isGetUserInfo, setIsGetUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    window.onresize = () => {
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;
      if (!props.global.collapsed && needCollapse) {
        dispatch(SET_COLLAPSED(true));
      }
    };
  }, [dispatch]);

  const getUserInfo = () => {
    if (Cookies.get("token")) {
      const { userinfo } = props.user;
      axios
        .post("/api/v1/user/detail", {
          user_id: userinfo.user_id,
        })
        .then((res) => {
          res = res.data;
          props.SET_USERINFO(res.userInfo);
          props.SET_AUTHS(res.auths);
          setIsGetUserInfo(true);
        })
        .catch((err) => {
          console.log(err);
          setIsGetUserInfo(false);
        });
    }
  };

  let clsName = "app-layout hasSider fixedSider";
  const collapsed = props.global.collapsed;
  if (!!collapsed) {
    clsName += " collapsed";
  }
  return (
    <React.Fragment>
      <div className="app-basicLayout">
        <div className={clsName}>
          <div className="app-sider">
            <SideMenu
              styles={styles}
              auths={props.user.auths}
              global={props.global}
            ></SideMenu>
          </div>
          <div className="app-layoutContent app-layout">
            <div className="app-header"></div>
            <div className="app-header fixedHeader">
              <AppHeader
                styles={styles}
                global={props.global}
                SET_COLLAPSED={props.SET_COLLAPSED}
              ></AppHeader>
            </div>
            <div className="app-pageLayout">
              <AppTabs
                global={props.global}
                user={props.user}
                ADD_TAB={props.ADD_TAB}
                REMOVE_TAB={props.REMOVE_TAB}
                SET_TABS={props.SET_TABS}
                SET_ACTIVETAB={props.SET_ACTIVETAB}
                REMOVEALL_TABS={props.REMOVEALL_TABS}
              />

              <div className="app-pageContainer">
                <Spin spinning={loading} tip="加载中，请稍后...">
                  {isGetUserInfo && <Outlet />}
                </Spin>
              </div>
            </div>
            <div className="app-footer"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  global: state.global,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
