import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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

import styles from "./index.module.less";

import { getDepartmentTree } from "./resources/getDepartmentTree";

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
        title: "部门名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "上级部门",
        dataIndex: "parent_id",
        key: "parent_id",
        render: (text, record, index) => {
          return <p className="ellipsis">{record.parent_name}</p>;
        },
      },
      {
        title: "部门类型",
        dataIndex: "type",
        key: "type",
        render: (text, record, index) => {
          return (
            <p className="ellipsis">
              {this.props.dict.departmentType[+record.type]}
            </p>
          );
        },
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        render: (text, record, index) => {
          return <p className="ellipsis">{record.remark}</p>;
        },
      },
      {
        title: "操作",
        dataIndex: "department_id",
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
    this.getDepartment(() => {
      this.fetch();
    });
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

  handleTreeSelectChange = (key, value) => {
    console.log(key, value);
    const { form } = this.state;
    form[key] = value;
    this.setState({
      form: { ...form },
    });
  };

  handleSelectChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({
      form: { ...form },
    });
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
        type: "",
        parent_id: "",
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
      filter: {
        name: search.filter.name,
        type: +search.filter.type,
        parent_id: search.filter.parent_id,
      },
    };
    axios
      .post("/api/v1/department/list", params)
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
    this.toggleDialog({
      dialogVisible: true,
      dialogTitle: "新增",
      dialogDisabledFields: [],
      dialogData: {},
    });
  };

  handleEdit = (record) => {
    this.toggleDialog({
      dialogVisible: true,
      dialogTitle: "编辑",
      dialogDisabledFields: [],
      dialogData: {
        department_id: record.department_id,
        name: record.name,
        type: record.type,
        parent_id: record.parent_id,
        remark: record.remark,
      },
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
          .post("/api/v1/department/remove", {
            department_id: record.department_id,
          })
          .then((res) => {
            message.info("操作成功");
            self.fetch();
            self.getDepartment();
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
    const departmentList = [
      { title: "无", key: "0", value: "0" },
      ...this.state.departmentList,
    ];
    return (
      <div>
        <h3 className="app-gridTitle">部门管理</h3>

        <Dialog
          ref={this.dialogRef}
          dialogTitle={dialogTitle}
          dialogData={dialogData}
          dialogDisabledFields={dialogDisabledFields}
          dialogVisible={dialogVisible}
          handleDialogCancel={this.handleDialogCancel.bind(this)}
          fetch={this.fetch.bind(this)}
          getDepartment={this.getDepartment.bind(this)}
          styles={styles}
          dict={dict}
          departmentList={this.state.departmentList}
        ></Dialog>

        <div className="app-toolbar">
          <div className="app-toolbarItem">
            <label>部门名称：</label>
            <div>
              <Input
                value={form.name}
                placeholder="请输入"
                style={{ width: 220 }}
                onChange={this.handleInputChange.bind(this, "name")}
              ></Input>
            </div>
          </div>

          <div className="app-toolbarItem hide">
            <label>部门类型：</label>
            <div>
              <Select
                value={form.type}
                style={{ width: 220 }}
                onChange={this.handleSelectChange.bind(this, "type")}
              >
                <Option value={0} key={0}>
                  全部
                </Option>
                {dict.departmentTypeOptions.map((item) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="app-toolbarItem">
            <label>上级部门：</label>
            <div>
              <TreeSelect
                treeData={departmentList}
                value={form.parent_id}
                onChange={this.handleTreeSelectChange.bind(this, "parent_id")}
                placeholder="请选择"
                style={{ width: "220px" }}
              ></TreeSelect>
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
            rowKey={(record) => record.id}
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
  user: state.system.user,
  dict: state.system.dict,
  auths: state.system.auths,
});
const mapDispatchToProps = {};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
