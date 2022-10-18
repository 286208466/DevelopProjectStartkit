import React, { Component } from "react";

import { Form, Input, Button, Modal, message, Select, InputNumber } from "antd";
import authType from "../resources/dict";
import axios from "@/axios";
const { TextArea } = Input;
const { Option } = Select;

const authTypeOptions = [];
for (let key in authType) {
  authTypeOptions.push({
    label: authType[key],
    value: key,
  });
}

class App extends React.Component {
  formRef = React.createRef();

  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    const { handleDialogCancel, fetch } = this.props;
    this.formRef.current.validateFields().then((values) => {
      console.log("values", values);
      this.setState({ loading: true });
      axios
        .post("/api/v1/auth/save", values)
        .then((res) => {
          this.setState({ loading: false });
          message.success("操作成功");
          handleDialogCancel && handleDialogCancel();
          fetch && fetch();
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

  setForm = (formValues) => {
    this.formRef.current.setFieldsValue({
      auth_id: "",
      name: "",
      key: "",
      parent_id: "",
      type: "",
      sort_value: "0",
      path: "",
      ...formValues,
    });
  };
  handleAfterClose = () => {
    this.setForm();
  };

  render() {
    const {
      dialogTitle,
      dialogData,
      dialogDisabledFields,
      dialogVisible,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    const footerBtns = [
      <Button key="back" onClick={this.handleCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" onClick={this.handleOk}>
        确认
      </Button>,
    ];
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
              <Form.Item label="auth_id" name="auth_id">
                <Input disabled></Input>
              </Form.Item>

              <Form.Item
                label="name"
                name="name"
                rules={[
                  {
                    required: true,
                    trigger: "blur",
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error("请输入name"));
                      } else if (value.length < 2 || value.length > 50) {
                        return Promise.reject(new Error("请输入2-50个字符"));
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
                label="key"
                name="key"
                rules={[
                  {
                    required: true,
                    trigger: "blur",
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error("请输入key"));
                      } else if (value.length < 2 || value.length > 50) {
                        return Promise.reject(new Error("请输入2-50个字符"));
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
              <Form.Item label="parent_id" name="parent_id">
                <Input
                  maxLength={100}
                  disabled={
                    dialogDisabledFields.indexOf("parent_id") > -1
                      ? true
                      : false
                  }
                  style={{ width: "100%" }}
                  placeholder="请输入"
                ></Input>
              </Form.Item>
              <Form.Item label="type" name="type">
                <Select
                  disabled={
                    dialogDisabledFields.indexOf("type") > -1 ? true : false
                  }
                >
                  {authTypeOptions.map((item) => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="sort_value" name="sort_value">
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                  placeholder="请输入"
                ></InputNumber>
              </Form.Item>

              <Form.Item label="path/接口" name="path">
                <Input
                  maxLength={1000}
                  disabled={
                    dialogDisabledFields.indexOf("path") > -1 ? true : false
                  }
                  style={{ width: "100%" }}
                  placeholder="请输入"
                ></Input>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    );
  }
}

export default App;
