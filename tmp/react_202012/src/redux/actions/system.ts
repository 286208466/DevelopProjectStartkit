import api from "@/axios";

const setUserInfo = (playload) => (dispatch) => {
  dispatch({
    type: "SET_USERINFO",
    playload: playload,
  });
};

const delUserInfo = () => (dispatch) => {
  dispatch({
    type: "DELETE_USERINFO",
  });
};

const getUserInfo = () => (dispatch) => {
  return new Promise((reslove) => {
    api.post("/getUserInfo").then((res) => {
      // 获取用户信息成功，将用户信息保存到全局状态树
      if ((res.data.code = "0")) {
        dispatch({
          type: "SET_USERINFO",
          playload: res.data,
        });
      }
      reslove(res.data);
    });
  });
};

// 改变左侧菜单栏宽度（展开或者收缩）
const setCollapsed = (playload) => ({
  type: "SET_COLLAPSED",
  playload,
});

//数据字典
export function setDictInfo(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_DICTINFO",
      playload: playload,
    });
  };
}

export function delDictInfo() {
  return (dispatch) => {
    dispatch({
      type: "DELETE_DICTINFO",
    });
  };
}

export { getUserInfo, delUserInfo, setUserInfo, setCollapsed };
