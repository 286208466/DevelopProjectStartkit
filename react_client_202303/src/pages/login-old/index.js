import React, { Component } from "react";
import { connect } from "react-redux";

import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { setUserInfo } from "@/redux/actions";
// import Cookies from "js-cookie";
import allRouters from "@/router/index";

import styles from "./index.module.less";
import axios from "@/axios";
import sha256 from "crypto-js/sha256";

class App extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      codeUrl: "",
      codeId: "",
    };
  }

  componentWillMount() {}
  componentDidMount() {}
  //   componentWillReceiveProps(nextProps) {}
  //   shouldComponentUpdate(nextProps, nextState) {}
  //   componentWillUpdate(nextProps, nextState) {}
  //   componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    // this.state = (state, callback) => {
    //   return;
    // };
  }

  //获取第一个菜单跳转
  getFirstPath() {
    return "/manage/home";
  }

  onFinish = (values) => {
    console.log("Success:", values);
    values.password = sha256(values.password).toString();
    this.setState({ loading: true });
    axios
      .post("/api/system/login", values)
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false });
          this.loginCallback(res.data);
        }, 2000);
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.changeCode();
      });
  };

  loginCallback(data) {
    // Cookies.set("token", data.token)
    let fistPath = this.getFirstPath();
    this.props.history.push(fistPath);
  }

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  getCode() {
    axios.post("/api/user/getCode").then((res) => {
      this.setState({
        codeUrl: "",
        codeId: "",
      });
    });
  }

  //验证码变更
  changeCode = () => {
    this.getCode();
    this.formRef.current.setFieldsValue({
      code: "",
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        {loading && (
          <div className={styles.loading}>
            <Spin spinning={true} tip="加载中"></Spin>
          </div>
        )}
        <div className={styles.loginContainer}>
          <h3>欢迎，登录</h3>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入账号!",
                },
                {
                  validator: (rule, value, callbacks) => {
                    if (value && value.length > 30) {
                      return Promise.reject("字符串过长");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
                {
                  validator: (rule, value, callbacks) => {
                    if (value && value.length > 30) {
                      return Promise.reject("字符串过长");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "请输入验证码!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                suffix={
                  <img
                    src={this.state.codeUrl}
                    width="82"
                    height="32"
                    alt=""
                    onClick={this.changeCode}
                  />
                }
                placeholder="请输入验证码"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <a className={styles.forgetBtn} href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = {
  setUserInfo: (params) => setUserInfo(params),
};
const mapStateToProps = (state /*,ownProps*/) => {
  return {
    collapsed: false,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
