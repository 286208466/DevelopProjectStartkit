/**
 * 改变左侧菜单栏宽度（展开或者收缩）
 *
 *
 */
export function SET_COLLAPSED(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_COLLAPSED",
      playload,
    });
  };
}

export function SET_THEME(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_THEME",
      playload,
    });
  };
}

export function SET_LOCALE(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_LOCALE",
      playload,
    });
  };
}



export function SET_TABS(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_TABS",
      playload,
    });
  };
}

export function ADD_TAB(playload) {
  return (dispatch) => {
    dispatch({
      type: "ADD_TAB",
      playload,
    });
  };
}

export function REMOVE_TAB(playload) {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_TAB",
      playload,
    });
  };
}

export function REMOVEALL_TABS(playload) {
  return (dispatch) => {
    dispatch({
      type: "REMOVEALL_TABS",
      playload,
    });
  };
}


export function SET_ACTIVETAB(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_ACTIVETAB",
      playload,
    });
  };
}

export function SET_DICT(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_DICT",
      playload,
    });
  };
}
