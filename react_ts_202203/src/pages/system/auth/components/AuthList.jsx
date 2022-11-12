import React, { Component } from "react";
import PropTypes from "prop-types";

import { Modal, Table, Menu, Button, Dropdown, message } from "antd";

import authType from "../resources/dict";
import axios from "axios";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  columns = [
    {
      title: "权限",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return (
          <div>
            <a>{record.name}</a>
          </div>
        );
      },
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: "150px",
      render: (text, record, index) => {
        return <div>{authType[record.type.toString()]}</div>;
      },
    },
    {
      title: "排序权重",
      dataIndex: "sort_value",
      key: "sort_value",
      width: "150px",
    },
    {
      title: "操作",
      dataIndex: "auth_id",
      key: "auth_id",
      width: "400px",
      render: (text, record, index) => {
        let addBtn = null;
        if (record.type == 1) {
          addBtn = (
            <>
              <a
                onClick={this.toggleDialog.bind(this, {
                  dialogTitle: "添加菜单",
                  dialogDisabledFields: ["parent_id", "type"],
                  dialogData: { type: "1", parent_id: record.auth_id },
                })}
              >
                添加菜单
              </a>
              <a
                onClick={this.toggleDialog.bind(this, {
                  dialogTitle: "添加页面",
                  dialogDisabledFields: ["parent_id", "type"],
                  dialogData: { type: "2", parent_id: record.auth_id },
                })}
              >
                添加页面
              </a>
            </>
          );
        } else if (record.type == 2) {
          addBtn = (
            <a
              onClick={this.toggleDialog.bind(this, {
                dialogTitle: "添加按钮",
                dialogDisabledFields: ["parent_id", "type"],
                dialogData: { type: "3", parent_id: record.auth_id },
              })}
            >
              添加按钮
            </a>
          );
        } else if (record.type == 3) {
        }
        return (
          <div className="optBtnGroup">
            {addBtn}
            <a onClick={this.handleEdit.bind(this, record)}>编辑</a>
            {record.can_del == 1 && (
              <a className="red" onClick={this.handleDel.bind(this, record)}>
                删除
              </a>
            )}
          </div>
        );
      },
    },
  ];

  componentWillMount() {}
  componentDidMount() {}
  //   componentWillReceiveProps(nextProps) {}
  //   shouldComponentUpdate(nextProps, nextState) {}
  //   componentWillUpdate(nextProps, nextState) {}
  //   componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  toggleDialog = ({ dialogTitle, dialogDisabledFields, dialogData }) => {
    this.props.toggleDialog({
      dialogVisible: true,
      dialogTitle: dialogTitle,
      dialogDisabledFields: dialogDisabledFields,
      dialogData: dialogData,
    });
  };

  handleEdit = (record) => {
    this.props.toggleDialog({
      dialogVisible: true,
      dialogTitle: "编辑",
      dialogDisabledFields: ["parent_id", "type"],
      dialogData: {
        auth_id: record.auth_id,
        name: record.name,
        key: record.key,
        parent_id: record.parent_id,
        type: record.type.toString(),
        sort_value: record.sort_value,
        path: record.path,
      },
    });
  };

  handleDel = (record) => {
    let self = this;
    if (record.children && record.children.length > 0) {
      message.info("请先删除该权限下的所有子权限");
      return;
    }
    if (record.can_del == 0) {
      message.info("系统默认权限，无法删除");
      return;
    }
    Modal.confirm({
      title: "提示",
      content: "是否确认删除该条数据？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        axios
          .post("/api/v1/auth/remove", {
            auth_id: record.auth_id,
          })
          .then((res) => {
            message.info("操作成功");
            self.props.fetch();
          })
          .catch((err) => {});
      },
      onCancel() {},
    });
  };
  render() {
    const { authList } = this.props;
    return (
      <>
        <Table
          columns={this.columns}
          childrenColumnName={"children"}
          pagination={false}
          dataSource={authList}
        ></Table>
      </>
    );
  }
}

export default App;
