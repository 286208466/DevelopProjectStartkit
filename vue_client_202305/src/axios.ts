import axios from "axios";
import cookie from "js-cookie"
const service = axios.create({
  //   baseURL: import.meta.env.VITE_APP_API,
  timeout: 30000,
});

// 请求拦截
service.interceptors.request.use(
  (config: any) => {
    // => 如果是GET请求追加时间戳
    if (config.method && /get/i.test(config.method)) {
      config.params = {
        ...config.params,
        timeState: Math.random() + Date.now(),
      };
    }
    // => 配置请求头
    const token = cookie.get("token");
    config.headers = {
      "Content-Type": "application/json",
      Authorization: token,
      token: token,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const { code, msg } = response.data;
    switch (code) {
      case 200:
        return response.data;
      default:
        console.log(msg);
        return response.data;
    }
  },
  (error: any) => {
    if (/timeout/.test(error.message)) {
      console.log("请求超时，请检查网络");
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default service;
