import React, { Component } from "react";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class App extends React.Component {
  render() {
    const { styles } = this.props;
    return (
      <div>
        <div className={styles.logo}>
          {!this.props.collapsed && <h2>XXX管理系统</h2>}
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="系统管理">
            <Menu.Item key="5">菜单管理</Menu.Item>
            <Menu.Item key="6">角色管理</Menu.Item>
            <Menu.Item key="7">用户管理</Menu.Item>
            <Menu.Item key="8">日志管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default App;
