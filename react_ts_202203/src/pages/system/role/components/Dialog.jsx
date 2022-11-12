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
        auth_ids: "",
        department_ids: "0",
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
    const { handleDialogCancel, fetch } = this.props;
    this.formRef.current.validateFields().then((values) => {
      delete values.auth_ids2;
      console.log("values", values);
      this.setState({ loading: true });
      axios
        .post("/api/v1/position/role/save", values)
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

  setForm = (form) => {
    this.formRef.current.setFieldsValue({
      role_id: "",
      name: "",
      type: "",
      remark: "",
      auth_ids2: "",
      ...form,
    });
    this.setState({
      form: {
        department_ids: form.department_ids || "0",
        auth_ids: form.auth_ids || "",
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
          department_ids: value,
        });
      }
    );
  };

  onCheck = (checkedKeys, info) => {
    // console.log("onCheck", checkedKeys, info);
    let checkedAuthList = "";
    if (checkedKeys.checked.length > 0) {
      checkedAuthList = checkedKeys.checked.join(",");
    }
    this.formRef.current.setFieldsValue({
      auth_ids: checkedAuthList,
    });
    this.setCheckedAuths(checkedAuthList);
  };

  setCheckedAuths = (ids) => {
    const { form } = this.state;
    form["auth_ids"] = ids;
    this.setState({
      form: { ...form },
    });
  };

  render() {
    const {
      authList,
      dialogTitle,
      dialogData,
      dialogDisabledFields,
      dialogVisible,
      dict,
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

    const footerBtns = [
      <Button key="back" onClick={this.handleCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" onClick={this.handleOk}>
        确认
      </Button>,
    ];
    const departmentList = [
      { title: "无", key: "0", value: "0" },
      ...this.props.departmentList,
    ];
    const checkedAuthList = !!form.auth_ids ? form.auth_ids.split(",") : [];

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
                label="role_id"
                name="role_id"
                style={{ display: "none" }}
              >
                <Input disabled></Input>
              </Form.Item>
              <Form.Item
                label="角色名称"
                name="name"
                rules={[
                  {
                    required: true,
                    trigger: "blur",
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error("请输入角色名称"));
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
                label="角色类别"
                name="type"
                style={{ display: "none" }}
              >
                <Select>
                  {/* {dict.positionTypeOptions &&
                    dict.positionTypeOptions.map((item) => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    })} */}
                </Select>
              </Form.Item>
              <Form.Item
                label="所属部门"
                name="department_ids"
                // rules={[
                //   {
                //     required: true,
                //     message: "请选择所属部门",
                //   },
                // ]}
                style={{ display: "none" }}
              >
                <div>
                  <TreeSelect
                    treeData={departmentList}
                    value={this.state.form.department_ids}
                    onChange={this.handleTreeSelectChange.bind(
                      this,
                      "department_ids"
                    )}
                    placeholder="请选择"
                    style={{ width: "100%" }}
                  ></TreeSelect>
                </div>
              </Form.Item>
              <Form.Item
                label="角色权限"
                name="auth_ids"
                style={{ display: "none" }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item label="角色权限" name="auth_ids2">
                <div>
                  <div
                    style={{
                      border: "1px solid #d9d9d9",
                      padding: "10px 10px",
                      borderRadius: "2px",
                      height: "200px",
                      overflowY: "auto",
                    }}
                  >
                    <Tree
                      checkable
                      selectable={false}
                      multiple
                      checkStrictly
                      onExpand={this.onExpand}
                      autoExpandParent={true}
                      onCheck={this.onCheck}
                      checkedKeys={checkedAuthList}
                      treeData={authList}
                    ></Tree>
                  </div>
                </div>
              </Form.Item>
              <Form.Item label="备注" name="remark">
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
