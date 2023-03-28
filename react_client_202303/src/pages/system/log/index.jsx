import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/redux/actions";
import axios from "@/axios";
import { Select, Input, Table, Button, DatePicker } from "antd";
import moment from "moment";

import { SearchOutlined } from "@ant-design/icons";
import operateType from "./resources/dict";

import styles from "./index.module.less";

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const typeOptions = [];
for (let key in operateType) {
  typeOptions.push({
    label: operateType[key],
    value: key,
  });
}

class App extends Component {
  constructor(props) {
    super(props);

    const initSearch = this.initSearch();

    this.state = {
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
    };

    this.columns = [
      {
        title: "操作者",
        dataIndex: "operator_name",
        key: "operator_name",
      },

      {
        title: "所属部门",
        dataIndex: "department_names",
        key: "department_names",
      },
      {
        title: "职务",
        dataIndex: "position_names",
        key: "position_names",
      },
      {
        title: "操作对象类型",
        dataIndex: "type",
        key: "type",
        // render: (text, record, index) => {
        //   return <div>{operateType[record.type.toString()]}</div>;
        // },
      },
      {
        title: "操作描述",
        dataIndex: "remark",
        key: "remark",
      },
      {
        title: "操作IP",
        dataIndex: "operate_ip",
        key: "operate_ip",
      },
      {
        title: "操作时间",
        dataIndex: "operate_time",
        key: "operate_time",
        // render: (text, record, index) => {
        //   return (
        //     <div>
        //       {new Date(record.operate_time).format("yyyy-MM-dd hh:mm:ss")}
        //     </div>
        //   );
        // },
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

  handleSelectChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({
      form: { ...form },
    });
  };

  handleDateChange = (date, dateString) => {
    const { form } = this.state;
    form.start_time = dateString[0];
    form.end_time = dateString[1];
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
        operator: "",
        type: 0,
        start_time: "",
        end_time: "",
      },
      pageNo: 1,
      pageSize: 10,
    };
  };

  fetch(callback) {
    const { search, pagination } = this.state;
    this.setState({ tableLoading: true });
    axios
      .post("/api/v1/log/list", search)
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

  render() {
    const { form, tableData, pagination, tableLoading } = this.state;
    return (
      <div>
        <h3 className="app-gridTitle">系统日志</h3>

        <div className="app-toolbar">
          <div className="app-toolbarItem">
            <label>操作者：</label>
            <div>
              <Input
                value={form.operator}
                placeholder="请输入"
                style={{ width: 220 }}
                onChange={this.handleInputChange.bind(this, "operator")}
              ></Input>
            </div>
          </div>
          <div className="app-toolbarItem hide">
            <label>操作类型：</label>
            <div>
              <Select
                value={form.type}
                style={{ width: 220 }}
                onChange={this.handleSelectChange.bind(this, "type")}
              >
                <Option value={0} key={0}>
                  全部
                </Option>
                {typeOptions.map((item) => {
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
            <label>操作时间：</label>
            <div>
              <RangePicker
                onChange={this.handleDateChange}
                style={{ width: 350 }}
                value={
                  form.start_time && form.end_time
                    ? [moment(form.start_time), moment(form.end_time)]
                    : []
                }
                format={dateFormat}
              ></RangePicker>
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
  global: state.global,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
