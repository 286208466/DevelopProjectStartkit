import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderComponent from "./Header";
import ContentComponent from "./Content";
import SideMenu from "./SideMenu";
import styles from "./index.module.less";

import { setUserInfo, delUserInfo, setCollapsed } from "@/redux/actions";
import { removeClass, addClass } from "@@/client/utils/class";
import axios from "@/axios";
import { setCookie, getCookie } from "@@/client/utils/cookie";

class LayoutComponent extends Component {
  componentWillMount() {}
  componentDidMount() {
    if (window.self != window.top) {
      let headerEle = document.querySelectorAll(".app-header");
      headerEle.forEach((item) => {
        removeClass(item, "fixedHeader");
        removeClass(item, "isTopMenu");
        addClass(item, "header");
      });
    }
    this.getUserInfo();
  }

  getUserInfo() {
    if (getCookie("token")) {
      axios
        .post("/api/user/detail")
        .then((res) => {
          res = res.data;
          console.log(res);
          setTimeout(() => {
            this.props.setUserInfo(res);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  toggleSider = () => {
    this.props.setCollapsed(!this.props.collapsed);
  };
  render() {
    let clsName = "app-layout hasSider fixedSider";
    if (this.props.collapsed) {
      clsName += " collapsed";
    }
    return (
      <React.Fragment>
        <div className="app-basicLayout">
          <div className={clsName}>
            <div className="app-sider">
              <SideMenu
                styles={styles}
                collapsed={this.props.collapsed}
              ></SideMenu>
            </div>
            <div className="app-layoutContent app-layout">
              <div className="app-header"></div>
              <div className="app-header fixedHeader">
                <HeaderComponent
                  styles={styles}
                  history={this.props.history}
                  collapsed={this.props.collapsed}
                  userInfo={this.props.userInfo}
                  toggleSider={this.toggleSider.bind(this)}
                  delUserInfo={this.props.delUserInfo}
                />
              </div>
              <div className="app-pageLayout">
                <div className="app-pageContainer">
                  <ContentComponent />
                </div>
              </div>
              <div className="app-footer"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  collapsed: state.system.collapsed,
  userInfo: state.system.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setCollapsed: (playload) => {
    dispatch(setCollapsed(playload));
  },
  setUserInfo: (playload) => {
    dispatch(setUserInfo(playload));
  },
  delUserInfo: () => {
    dispatch(delUserInfo());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
