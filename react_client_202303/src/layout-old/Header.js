import React, { Component } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import HeaderRight from "./HeaderRight";

import { Menu, DropDown, message } from "antd";
const { Submenu } = Menu;
class HeaderComponent extends Component {
  componentWillMount() {}

  toggleSider = () => {
    const { toggleSider } = this.props;
    if (toggleSider) {
      toggleSider();
    }
  };

  render() {
    const { styles } = this.props;
    return (
      <React.Fragment>
        <header className="clearfix">
          <div className={styles.headerLeft}>
            <button onClick={this.toggleSider}>
              {!this.props.collapsed ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )}
            </button>
          </div>
          <HeaderRight
            userInfo={this.props.userInfo}
            history={this.props.history}
            delUserInfo={this.props.delUserInfo}
          ></HeaderRight>
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
  }
}

export default HeaderComponent;
