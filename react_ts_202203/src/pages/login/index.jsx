import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
  FC,
} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/redux/actions";

import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import axios from "@/axios";
import md5 from "js-md5";

import styles from "./index.module.scss";

function App(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const codeUrl = "/api/v1/system/validate_code";
  const [loading, setLoading] = useState(false);
  const [codeImg, setCodeImg] = useState("");
  const [codeId, setCodeId] = useState("");

  let firstPath = "";
  const [form] = Form.useForm();

  useEffect(() => {
    renderBg();
    getCode();
    // form.setFieldsValue({
    //   account: "10000000001",
    //   password: "123456",
    // });
    window.addEventListener("resize", function () {
      renderBg();
    });
  }, []);

  const handleLogin = () => {
    form.validateFields().then((values) => {
      console.log("values", values);
      setLoading(true);
      const params = {
        phone: values.account,
        password: md5(values.password).toString(),
        digits: values.code,
        pic_tag: codeId,
      };
      axios
        .post("/api/v1/system/login", params)
        .then((res) => {
          setLoading(false);
          loginCallback(res.data);
        })
        .catch((err) => {
          setLoading(false);
          changeCode();
        });
    });
  };

  const loginCallback = (data) => {
    Cookies.set("token", data.token, { expires: 7 });

    // dispatch(await loginAsync(form));
    props.SET_USERINFO(data.userInfo);
    props.SET_AUTHS(data.auths);
    data.auths.forEach((item) => {
      getFirstPath(item);
    });
    alert(firstPath)
    navigate("/manage/dashboard")
    if (firstPath) {
      // navigate(firstPath);
    } else {
      message.info("您没有权限访问");
    }
  };

  //获取第一个菜单跳转
  const getFirstPath = (obj) => {
    if (!!firstPath) return;
    if (obj.type == 2) {
      firstPath = obj.path || "";
    }
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((item) => {
        getFirstPath(item);
      });
    }
  };

  const getCode = () => {
    axios
      .post(codeUrl + "?_t=" + new Date().getTime(), {})
      .then((res) => {
        res = res.data;
        setCodeImg(res.pic_byte);
        setCodeId(res.pic_tag);
      })
      .catch((err) => {});
  };

  const changeCode = () => {
    getCode();
    form.setFieldsValue({
      code: "",
    });
  };
  const renderBg = function () {
    var e = document.getElementById("bg-canvas"),
      i = document.documentElement.clientWidth,
      o = document.documentElement.clientHeight;
    e.width = i;
    e.height = o;
    var n = e.getContext("2d");
    n.strokeStyle = "#f6f6f6";
    n.lineWidth = 1;
    n.beginPath();
    n.translate(0.5, 0.5);
    for (var t = 20; t <= o; t += 20) {
      n.moveTo(0, t);
      n.lineTo(i, t);
    }
    for (t = 20; t <= i; t += 20) {
      n.moveTo(t, 0);
      n.lineTo(t, o);
    }
    n.closePath();
    n.stroke();
  };

  const formItemLayout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <div className={styles.loginContainer}>
      <canvas id="bg-canvas" width="899" height="936"></canvas>
      <div className={styles.mask}></div>
      <div className={styles.loginWrap}>
        <div className={styles.logoWrap}>
          <a>欢迎，登录</a>
        </div>
        <div className={styles.loginFormWrap}>
          <div>
            <Form {...formItemLayout} className="loginForm" form={form}>
              <Form.Item
                name="account"
                rules={[
                  {
                    required: true,
                    message: "请输入账号!",
                  },
                  {
                    validator: (rule, value, callbacks) => {
                      if (value && value.length > 100) {
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
                      if (value && value.length > 100) {
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
                      src={codeImg}
                      width="82"
                      height="32"
                      alt=""
                      onClick={changeCode}
                    />
                  }
                  placeholder="请输入验证码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  登录
                </Button>
              </Form.Item>
              <Form.Item>
                <a className={styles.forgetBtn}>忘记密码</a>
              </Form.Item>

              <Form.Item style={{ display: "none" }}>
                <a>注册账户</a>
              </Form.Item>
            </Form>
          </div>
          <div className={styles.copyright}>
            登录即表示您已阅读并同意《服务条款》
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  global: state.global,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
