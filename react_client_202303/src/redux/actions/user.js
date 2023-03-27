// import api from "@/axios";

export function SET_USERINFO(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_USERINFO",
      playload,
    });
  };
}

export function REMOVE_USERINFO(playload) {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_USERINFO",
      playload,
    });
  };
}

const getUserInfo = () => (dispatch) => {
  return new Promise((reslove) => {
    // api.post("/getUserInfo").then((res) => {
    //   // 获取用户信息成功，将用户信息保存到全局状态树
    //   if ((res.data.code = "0")) {
    //     dispatch({
    //       type: "SET_USERINFO",
    //       playload: res.data,
    //     });
    //   }
    //   reslove(res.data);
    // });
  });
};

//权限
export function SET_AUTHS(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_AUTHS",
      playload: playload,
    });
  };
}

//权限key
export function SET_AUTHKEYS(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_AUTHKEYS",
      playload: playload,
    });
  };
}

export { getUserInfo };
