import React, { Component } from "react";

import {
  Form,
  Input,
  Button,
  Modal,
  message,
  Select,
  Tree,
  TreeSelect,
} from "antd";
import axios from "@/axios";

const { SHOW_PARENT } = TreeSelect;

const { TextArea } = Input;
const { Option } = Select;

class App extends React.Component {
  formRef = React.createRef();

  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {
        parent_id: "",
      },
    };
  }

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

  handleOk = () => {
    const { handleDialogCancel, fetch, getDepartment } = this.props;
    this.formRef.current.validateFields().then((values) => {
      console.log("values", values);
      this.setState({ loading: true });
      axios
        .post("/api/v1/department/save", values)
        .then((res) => {
          this.setState({ loading: false });
          message.success("操作成功");
          handleDialogCancel && handleDialogCancel();
          fetch && fetch();
          getDepartment && getDepartment();
        })
        .catch((err) => {
          this.setState({ loading: false });
        });
    });
  };

  handleCancel = () => {
    const { handleDialogCancel } = this.props;
    handleDialogCancel && handleDialogCancel();
  };

  setForm = (form) => {
    this.formRef.current.setFieldsValue({
      department_id: "",
      name: "",
      type: "",
      parent_id: "",
      remark: "",
      ...form,
    });
    this.setState({
      form: {
        parent_id: form.parent_id || "",
      },
    });
  };

  handleAfterClose = () => {
    this.setForm({});
  };

  handleTreeSelectChange = (key, value) => {
    console.log(key, value);
    const { form } = this.state;
    form[key] = value;
    this.setState(
      {
        form: { ...form },
      },
      () => {
        this.formRef.current.setFieldsValue({
          parent_id: value,
        });
      }
    );
  };

  render() {
    const {
      dialogTitle,
      dialogData,
      dialogDisabledFields,
      dialogVisible,
    } = this.props;
    const { form } = this.state;
    console.log("Dialog[render][props]", this.props);

    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 18,
      },
    };

    const { dict } = this.props;

    const footerBtns = [
      <Button key="back" onClick={this.handleCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" onClick={this.handleOk}>
        确认
      </Button>,
    ];
    const arr = this.props.departmentList;
    arr.forEach((item) => {
      if (item.value == dialogData.department_id) {
        item.disabled = true;
      }else{
        item.disabled = false;
      }
    });
    const departmentList = [{ title: "无", key: "0", value: "0" }, ...arr];
    return (
      <>
        <div>
          <Modal
            width="600px"
            visible={dialogVisible}
            title={dialogTitle}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            afterClose={this.handleAfterClose}
            footer={footerBtns}
          >
            <Form
              onSubmit={this.handleSubmit}
              {...formItemLayout}
              className="dialogForm"
              ref={this.formRef}
            >
              <Form.Item
                label="department_id"
                name="department_id"
                style={{ display: "none" }}
              >
                <Input disabled></Input>
              </Form.Item>
              <Form.Item
                label="部门名称"
                name="name"
                rules={[
                  {
                    required: true,
                    trigger: "blur",
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error("请输入部门名称"));
                      } else if (value.length < 2 || value.length > 20) {
                        return Promise.reject(new Error("请输入2-20个字符"));
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input
                  maxLength={50}
                  style={{ width: "100%" }}
                  placeholder="请输入"
                ></Input>
              </Form.Item>
              <Form.Item
                label="部门类型"
                style={{ display: "none" }}
                name="type"
              >
                <Select>
                  {dict.departmentTypeOptions.map((item) => {
                    return (
                      <Select.Option value={item.value} key={item.value}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="上级部门"
                name="parent_id"
                rules={[
                  {
                    required: true,
                    message: "请选择上级部门",
                  },
                ]}
              >
                <Input style={{ display: "none" }} placeholder="请输入"></Input>
                <div>
                  <TreeSelect
                    treeData={departmentList || []}
                    value={this.state.form.parent_id}
                    onChange={this.handleTreeSelectChange.bind(
                      this,
                      "parent_id"
                    )}
                    placeholder="请选择"
                    style={{ width: "100%" }}
                  ></TreeSelect>
                </div>
              </Form.Item>
              <Form.Item label="描述" name="remark">
                <Input.TextArea
                  maxLength={1000}
                  rows={5}
                  style={{ width: "100%" }}
                  placeholder="请输入"
                ></Input.TextArea>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    );
  }
}

export default App;
