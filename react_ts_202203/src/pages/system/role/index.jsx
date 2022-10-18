import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/redux/actions";

import axios from "@/axios";
import {
  Select,
  Input,
  Table,
  Button,
  DatePicker,
  Modal,
  message,
  TreeSelect,
} from "antd";
import moment from "moment";

import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import Dialog from "./components/Dialog";
import { getDepartmentTree } from "@/pages/system/department/resources/getDepartmentTree";
import { getAuthTree } from "@/pages/system/auth/resources/getAuthTree";
import styles from "./index.module.less";

const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

class App extends Component {
  dialogRef = React.createRef();
  constructor(props) {
    super(props);

    const initSearch = this.initSearch();

    this.state = {
      authList: [],
      //
      dialogTitle: "",
      dialogData: "",
      dialogDisabledFields: [],
      dialogVisible: false,
      //
      tableData: [],
      pagination: {
        simple: false,
        current: 1,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30", "50"],
        showTotal: (total, range) => {
          return `共${total}条数据`;
        },
      },
      tableLoading: false,
      form: {
        ...initSearch.filter,
      },
      search: {
        ...initSearch,
      },
      //
      departmentList: [],
    };

    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "角色类别",
        dataIndex: "type",
        key: "type",
        // render: (text, record, index) => {
        //   return <p>{this.props.dict.positionType[record.type]}</p>;
        // },
      },
      // {
      //   title: "所属部门",
      //   dataIndex: "department_ids",
      //   key: "department_ids",
      //   render: (text, record, index) => {
      //     return <p>{record.department_names}</p>;
      //   },
      // },
      {
        title: "关联用户数",
        dataIndex: "user_count",
        key: "user_count",
      },
      {
        title: "描述",
        dataIndex: "remark",
        key: "remark",
      },
      {
        title: "操作",
        dataIndex: "role_id",
        render: (text, record, index) => {
          return record.type == 100 ? (
            <></>
          ) : (
            <>
              <div className="optBtnGroup">
                <a onClick={this.handleEdit.bind(this, record)}>编辑</a>
                <a className="red" onClick={this.handleDel.bind(this, record)}>
                  删除
                </a>
              </div>
            </>
          );
        },
      },
    ];
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

  getDepartment = (callback) => {
    getDepartmentTree().then((tree) => {
      this.setState(
        {
          departmentList: [...tree],
        },
        () => {
          callback && callback();
        }
      );
    });
  };

  getAuths = (callback) => {
    getAuthTree().then((tree) => {
      if (tree && tree.length > 0) {
        tree.forEach((item) => {
          this.forEachToDelNullChildren(item);
        });
      }
      this.setState(
        {
          authList: [...tree],
        },
        () => {
          callback && callback();
        }
      );
    });
  };

  //递归遍历删除authList的空children
  forEachToDelNullChildren = (obj) => {
    obj.title = obj.name;
    obj.key = obj.auth_id;
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((item) => {
        this.forEachToDelNullChildren(item);
      });
    } else {
      delete obj.children;
    }
  };

  handleInputChange = (key, e) => {
    console.log(key, e);
    e.persist();
    const { form } = this.state;
    form[key] = e.target.value;
    this.setState({
      form: { ...form },
    });
  };

  initSearch = () => {
    return {
      filter: {
        name: "",
      },
      pageNo: 1,
      pageSize: 10,
    };
  };

  fetch(callback) {
    const { search, pagination } = this.state;
    this.setState({ tableLoading: true });
    const params = {
      ...search,
    };
    axios
      .post("/api/v1/position/role/list", params)
      .then((res) => {
        pagination.total = res.data.total;
        this.setState({
          tableLoading: false,
          tableData: [...res.data.rows],
          ...pagination,
        });
        callback && callback(res);
      })
      .then((err) => {
        this.setState({
          tableLoading: false,
        });
      });
  }

  onSearch = () => {
    const { form, search, pagination } = this.state;
    pagination.current = 1;
    search.filter = form;
    search.pageNo = 1;
    this.setState(
      {
        search: { ...search },
        pagination: { ...pagination },
      },
      () => {
        this.fetch();
      }
    );
  };

  onReset = () => {
    const initSearch = this.initSearch();
    const { pagination } = this.state;
    pagination.current = 1;
    pagination.pageSize = 10;
    this.setState(
      {
        form: { ...initSearch.filter },
        pagination: { ...pagination },
        search: { ...initSearch },
      },
      () => {
        this.fetch();
      }
    );
  };

  handleTableChange = (pager, filters, sorter) => {
    const { search, pagination } = this.state;
    pagination.current = pager.current;
    pagination.pageSize = pager.pageSize;
    search.pageNo = pager.current;
    search.pageSize = pager.pageSize;
    this.setState(
      {
        pagination: { ...pagination },
        search: { ...search },
      },
      () => {
        this.fetch();
      }
    );
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
          this.dialogRef.current.setForm({ ...dialogData });
        }, 300);
      }
    );
  };

  handleAdd = () => {
    this.getDepartment(() => {
      this.getAuths(() => {
        this.toggleDialog({
          dialogVisible: true,
          dialogTitle: "新增",
          dialogDisabledFields: [],
          dialogData: {},
        });
      });
    });
  };

  handleEdit = (record) => {
    this.getDepartment(() => {
      this.getAuths(() => {
        this.toggleDialog({
          dialogVisible: true,
          dialogTitle: "编辑",
          dialogDisabledFields: [],
          dialogData: {
            role_id: record.role_id,
            name: record.name,
            type: record.type,
            department_ids: record.department_ids,
            auth_ids: record.auth_ids,
            remark: record.remark,
          },
        });
      });
    });

    // axios
    //   .post("/api/system/role/detail", {
    //     role_id: record.role_id,
    //   })
    //   .then((res) => {

    //   })
    //   .catch((err) => {});
  };

  handleDel = (record) => {
    let self = this;
    Modal.confirm({
      title: "提示",
      content: "是否确认删除该条数据？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        axios
          .post("/api/v1/position/role/remove", {
            role_id: record.role_id,
          })
          .then((res) => {
            message.info("操作成功");
            self.fetch();
          })
          .catch((err) => {});
      },
      onCancel() {},
    });
  };

  //弹出框组件事件回调
  handleDialogCancel = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  render() {
    const {
      form,
      tableData,
      pagination,
      tableLoading,
      dialogTitle,
      dialogData,
      dialogDisabledFields,
      dialogVisible,
    } = this.state;
    const { dict } = this.props;
    return (
      <div>
        <h3 className="app-gridTitle">角色管理</h3>

        <Dialog
          ref={this.dialogRef}
          authList={this.state.authList}
          dialogTitle={dialogTitle}
          dialogData={dialogData}
          dialogDisabledFields={dialogDisabledFields}
          dialogVisible={dialogVisible}
          handleDialogCancel={this.handleDialogCancel.bind(this)}
          fetch={this.fetch.bind(this)}
          styles={styles}
          dict={dict}
          departmentList={this.state.departmentList}
        ></Dialog>

        <div className="app-toolbar">
          <div className="app-toolbarItem">
            <label>角色名称：</label>
            <div>
              <Input
                value={form.name}
                placeholder="请输入"
                style={{ width: 220 }}
                onChange={this.handleInputChange.bind(this, "name")}
              ></Input>
            </div>
          </div>

          <div className="app-toolbarItem">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={this.onSearch}
            >
              查询
            </Button>
            <Button onClick={this.onReset}>重置</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={this.handleAdd}
            >
              新建
            </Button>
          </div>
        </div>

        <div className="app-grid">
          <Table
            columns={this.columns}
            rowKey={(record) => record.role_id}
            dataSource={tableData}
            pagination={pagination}
            loading={tableLoading}
            onChange={this.handleTableChange}
          ></Table>
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
