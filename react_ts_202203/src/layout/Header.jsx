import React, { Component } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  EditTwoTone,
} from "@ant-design/icons";

import { Layout, Menu, Dropdown, message } from "antd";
import axios from "@/axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import ChangePwdModal from "./ChangePwdModal";
// import MyCheckList from "./MyCheckList";

const { Submenu } = Menu;

const AppHeader = (props) => {
  const { styles, user, global } = props;
  const { collapsed } = global;

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const toggleSider = () => {
    const { SET_COLLAPSED, global } = props;
    SET_COLLAPSED(!global.collapsed);
  };

  const onDropdownClick = ({ key }) => {
    if (key == "logout") {
      logout();
    } else if (key == "changePwd") {
      // this.changePwdRef.current.showModal();
    } else if (key == "myCheckList") {
      // this.myCheckListRef.current.init();
    }
  };

  const logout = () => {
    axios
      .post("/api/v1/system/logout")
      .then((res) => {
        res = res.data;
        props.SET_USERINFO({});
        props.SET_AUTHS([]);
        sessionStorage.clear();
        localStorage.clear();
        Cookies.remove("token");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menu = (
    <Menu onClick={onDropdownClick}>
      {/* <Menu.Item key="set">用户设置</Menu.Item> */}
      <Menu.Item key="myCheckList">待审批事项</Menu.Item>
      <Menu.Item key="changePwd">修改密码</Menu.Item>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <header className={styles.appHeader}>
        <div className={styles.headerLeft}>
          <button onClick={toggleSider}>
            {!collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </button>
        </div>
        {/* <MyCheckList
          ref={this.myCheckListRef}
          drawerVisible={this.state.drawerVisible}
          styles={styles}
          dict={this.props.dict}
          user={user}
          onDrawerClose={this.onDrawerClose.bind(this)}
        ></MyCheckList> */}
        {/* <ChangePwdModal ref={this.changePwdRef} user={user}></ChangePwdModal> */}
        <div className={styles.headerRight}>
          <ul>
            <li>
              <Dropdown overlay={menu} overlayStyle={{ width: 155 }} placement="bottomRight" arrow>
                <a className="ant-dropdown-link">
                  <img src="./static/avatar.jpg" />
                  <label>{user && user.name}</label>&ensp;
                  <DownOutlined />
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
        {/* <div className="app-headerMenu">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          ></Menu>
        </div> */}
      </header>
    </React.Fragment>
  );
};

export default AppHeader;
