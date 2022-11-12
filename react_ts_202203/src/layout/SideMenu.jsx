import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Button } from "antd";
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
  AppstoreOutlined,
  MenuOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu } = Menu;

const App = (props) => {
  const { styles, auths, global } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [openKey, setOpenkey] = useState([]);

  const [selectedKey, setSelectedKey] = useState([]);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const getMenuNode = (obj) => {
    if (obj.type == 1) {
      if (obj.children && obj.children.length > 0) {
        let arr = [];
        obj.children.forEach((item) => {
          arr.push(getMenuNode(item));
        });
        return (
          <SubMenu
            key={obj.key}
            icon={<MenuOutlined />}
            title={<span className="submenu-title-wrapper">{obj.name}</span>}
          >
            {arr}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={!!obj.path ? obj.path : obj.key}
            icon={obj.parent_id == "0" ? <MenuOutlined /> : null}
          >
            {obj.path ? (
              <Link to={obj.path}>{obj.name}</Link>
            ) : (
              <span>{obj.name}</span>
            )}
          </Menu.Item>
        );
      }
    } else if (obj.type == 2) {
      return (
        <Menu.Item
          key={!!obj.path ? obj.path : obj.key}
          icon={obj.parent_id == "0" ? <MenuOutlined /> : null}
        >
          {obj.path ? (
            <Link to={obj.path}>{obj.name}</Link>
          ) : (
            <span>{obj.name}</span>
          )}
        </Menu.Item>
      );
    }
  };

  const handleMenuClick = (e) => {
    // const { current } = this.state;
    // if (current != e.key) {
    //   this.setState({
    //     current: e.key,
    //   });
    // }
  };

  const onMenuClick = (e) => {
    console.log("onMenuClick", e);
    setSelectedKey([e.key]);
    // if (selectedKey != path) {
    //   navigate(path);
    // }
  };

  const onOpenChange = (keys) => {
    console.log("onOpenChange", keys);
    setOpenkey([...keys]);
  };

  let arr = [];
  if (auths && auths.length > 0) {
    auths.forEach((item) => {
      let el = getMenuNode(item);
      arr.push(el);
    });
  }

  const collapsed = global.collapsed;

  return (
    <div>
      <div className={styles.logo}>
        {!collapsed && <h2>明德薪酬管理系统</h2>}
      </div>
      <Menu
        // defaultSelectedKeys={[menuConfig_current || ""]}
        // defaultOpenKeys={["sub1"]}
        selectedKeys={selectedKey}
        openKeys={openKey}
        // onClick={handleMenuClick}
        onOpenChange={onOpenChange}
        onSelect={(k) => onMenuClick(k)}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {arr}
      </Menu>
    </div>
  );
};

export default App;
