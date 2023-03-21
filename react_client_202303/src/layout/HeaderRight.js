import React, { Component } from "react";
import PropTypes from "prop-types";

import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import axios from "@/axios";
// import Cookies from "js-cookie";

const { SubMenu } = Menu;
class App extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {}
  //   componentWillReceiveProps(nextProps) {}
  //   showComponentUpdate(nextProps, nextState) {}
  //   componentWillUpdate(nextProps, nextState) {}
  //   componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  onDropdownClick = ({ key }) => {
    if (key == "logout") {
      this.logout();
    }
  };

  logout() {
    axios
      .post("/api/system/logout")
      .then((res) => {
        res = res.data;
        this.props.delUserInfo();
        sessionStorage.clear();
        localStorage.clear();
        // Cookies.remove("token");
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const menu = (
      <Menu onClick={this.onDropdownClick.bind(this)}>
        <Menu.Item key="set">用户设置</Menu.Item>
        <Menu.Item key="changePwd">修改密码</Menu.Item>
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    );
    const { userInfo } = this.props;
    return (
      <>
        <div className="app-headerRight">
          <Dropdown overlay={menu} overlayStyle={{ width: 155 }}>
            <a className="ant-dropdown-link">
              <label>{userInfo && userInfo.username}</label>
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </>
    );
  }
}

export default App;
