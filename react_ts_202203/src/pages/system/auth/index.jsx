import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/redux/actions";
import axios from "@/axios";
import { Button, Tabs, Radio, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

import AuthList from "./components/AuthList";
import Dialog from "./components/Dialog";
import { getAuthTree } from "./resources/getAuthTree";

class App extends Component {
  dialogRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      //
      authList: [],
      //
      dialogTitle: "",
      dialogData: "",
      dialogDisabledFields: [],
      dialogVisible: false,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.fetch();
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  fetch = () => {
    getAuthTree().then((tree) => {
      this.setState({
        authList: [...tree],
      });
    });
  };

  //弹出框组件事件回调
  handleDialogCancel = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  toggleDialog = ({
    dialogVisible,
    dialogTitle,
    dialogDisabledFields,
    dialogData,
  }) => {
    this.setState(
      {
        dialogVisible: dialogVisible,
        dialogTitle: dialogTitle,
        dialogDisabledFields: dialogDisabledFields,
        dialogData: dialogData,
      },
      () => {
        setTimeout(() => {
          this.dialogRef.current.setForm({
            ...dialogData,
          });
        }, 300);
      }
    );
  };

  handleAddFirstMenu = () => {
    this.toggleDialog({
      dialogVisible: true,
      dialogTitle: "添加菜单",
      dialogDisabledFields: ["parent_id", "type"],
      dialogData: { type: "1", parent_id: "0" },
    });
  };

  handleAddInterface = () => {
    this.toggleDialog({
      dialogVisible: true,
      dialogTitle: "添加接口/数据",
      dialogDisabledFields: ["parent_id", "type"],
      dialogData: { type: "4", parent_id: "0" },
    });
  };
  render() {
    const {
      dialogTitle,
      dialogData,
      dialogDisabledFields,
      dialogVisible,
      authList,
    } = this.state;
    return (
      <div>
        <Dialog
          ref={this.dialogRef}
          dialogTitle={dialogTitle}
          dialogData={dialogData}
          dialogDisabledFields={dialogDisabledFields}
          dialogVisible={dialogVisible}
          handleDialogCancel={this.handleDialogCancel.bind(this)}
          fetch={this.fetch.bind(this)}
          styles={styles}
        ></Dialog>

        <h3 className="app-gridTitle">权限管理</h3>

        <div>
          <AuthList
            authList={authList}
            toggleDialog={this.toggleDialog.bind(this)}
            fetch={this.fetch.bind(this)}
          ></AuthList>
        </div>
        <div className="app-toolbar">
          <div className="app-toolbarItem">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={this.handleAddFirstMenu}
            >
              添加菜单
            </Button>
          </div>
          <div className="app-toolbarItem">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={this.handleAddInterface}
            >
              添加接口/数据
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  global: state.global,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
