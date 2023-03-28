import { FC } from "react";
import { Menu, Dropdown } from "antd";
import { SettingOutlined } from "@ant-design/icons";
// import { LocaleFormatter } from "@/locales";
import { useDispatch, useSelector } from "react-redux";

const TabsAction = (props) => {
  return (
    <Dropdown
      placement="bottomRight"
      arrow
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={() => props.removeCurrentTab()}>
            关闭当前页签
          </Menu.Item>
          <Menu.Item key="1" onClick={() => props.removeOtherTab()}>
            关闭其他页签
          </Menu.Item>
          <Menu.Item key="2" onClick={() => props.removeAllTab()}>
            关闭所有页签
          </Menu.Item>
          {/* <Menu.Divider />
          <Menu.Item key="3" onClick={() => props.SET_TABS([])}>
            关闭所有页签
          </Menu.Item> */}
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TabsAction;
