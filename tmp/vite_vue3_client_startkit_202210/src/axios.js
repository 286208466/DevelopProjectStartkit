import axios from "axios";

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  timeout: 5000,
  withCredentials: true,
  baseURL: "",
});

// service.defaults.headers.post= {
//   "Content-Type":"application/x-www-form-urlencoded"
// }

service.interceptors.request.use(
  (config) => {
    config.headers["X-Token"] = "my token";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const errorHandle = (res) => {
  switch (res.status) {
    case 401:
      console.log("认证失败");
      break;
    case 403:
      console.log("token校验失败");
      break;
    default:
      console.log(res.message)
      break;
  }
};
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      errorHandle(response);
      Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
