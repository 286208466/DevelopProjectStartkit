import { FC, useCallback, useEffect } from "react";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import TabsAction from "./TabsAction";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;

const AppTabs = (props) => {
  const { tabs, activeTab } = props.global;
  const { auths } = props.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [];
  const getAllMenus = (item) => {
    if (item.type == 2) {
      menus.push(item);
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        getAllMenus(child);
      });
    }
  };

  auths.forEach((item) => {
    if (item.type == 2) {
      menus.push(item);
    }
    getAllMenus(item);
  });

  console.log("menus", menus);

  // 页签点击事件
  const onChange = (key) => {
    console.log("onChange", key);
    const tab = tabs.find((tag) => tag.path === key);

    if (tab) {
      setCurrentTab(tab.path);
      navigate(tab.path);
    }
  };

  // onRemove tag
  const onClose = (targetKey) => {
    console.log("onClose", targetKey);
    if (targetKey === location.pathname) {
      let lastIndex = 0;
      tabs.forEach((item, i) => {
        if (item.path === targetKey) {
          lastIndex = i - 1;
        }
      });
      props.REMOVE_TAB(targetKey);
      navigate(tabs[lastIndex].path);
    } else {
      props.REMOVE_TAB(targetKey);
    }
  };

  const setCurrentTab = (id) => {
    const tab = tabs.find((item) => {
      if (id) {
        return item.path === id;
      } else {
        return item.path === location.pathname;
      }
    });
    if (tab) {
      props.SET_ACTIVETAB(tab.path);
    }
  };

  useEffect(() => {
    const menu = menus.find((m) => m.path === location.pathname);
    console.log(menu);
    if (menu) {
      props.ADD_TAB(menu);
    }
  }, [location.pathname]);

  const removeCurrentTab = () => {
    if (tabs.length > 1) {
      let lastIndex = -1;
      tabs.forEach((item, i) => {
        if (item.path === activeTab) {
          lastIndex = i - 1;
        }
      });
      if (lastIndex > -1) {
        props.REMOVE_TAB(activeTab);
        navigate(tabs[lastIndex].path);
      }
    }
  };

  const removeAllTab = () => {
    if (tabs.length > 1) {
      props.REMOVEALL_TABS();
      if (activeTab !== tabs[0].path) {
        navigate(tabs[0].path);
      }
    }
  };

  const removeOtherTab = () => {
    if (tabs.length > 1) {
      const arr = [tabs[0]];
      tabs.forEach((item, i) => {
        if (i != 0 && item.path == activeTab) {
          arr.push(item);
        }
      });
      props.SET_TABS([...arr]);
    }
  };

  return (
    <div id="pageTabs" style={{ padding: "6px 4px" }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={props.global.activeTab}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) =>
          action === "remove" && onClose(targetKey)
        }
        tabBarExtraContent={
          <TabsAction
            activeTab={activeTab}
            removeCurrentTab={removeCurrentTab}
            removeOtherTab={removeOtherTab}
            removeAllTab={removeAllTab}
          />
        }
      >
        {tabs.map((item) => (
          <TabPane tab={item.name} key={item.path} closable={item.closable} />
        ))}
      </Tabs>
    </div>
  );
};

export default AppTabs;
