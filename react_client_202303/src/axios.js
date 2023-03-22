import axios from "axios";
// import Cookies from "js-cookie";

import { cloneDeep } from 'lodash'
const { parse, compile } = require("path-to-regexp")


const { CancelToken } = axios
window.cancelRequest = new Map()



import { message } from "antd";
message.config({
  maxCount: 1,
});
const api = axios.create({
  //   baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

function toLoginPage() {
  window.location.href = "#/login";
}

//请求拦截
api.interceptors.request.use(
  function (config) {
    // const token = Cookies.get("token");
    // config.headers["Authorization"] = token;
    // config.headers["token"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  function (response) {
    console.log(response.config.url, response.data);
    if (response.data.code !== 200) {
      if (response.data.code == "2100") {
        sessionStorage.clear();
        localStorage.clear();
        // Cookies.remove("token");
        message.error(response.data.message);
        toLoginPage();
      } else {
        message.error(response.data.message);
        return Promise.reject(response);
      }
    }

    return response.data;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        toLoginPage();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
