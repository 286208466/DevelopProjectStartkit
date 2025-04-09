// eslint-disable-next-line
const initialState = {
  userInfo: {},
  dictInfo: {},
  collapsed: false,
  taglist: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_USERINFO":
      return {
        ...state,
        userInfo: action.playload,
      };
    case "DELETE_USERINFO":
      return {
        ...state,
        userInfo: initialState.userInfo,
      };
    case "SET_DICTINFO":
      return {
        ...state,
        dictInfo: action.playload,
      };
    case "DELETE_DICTINFO":
      return {
        ...state,
        dictInfo: initialState.userInfo,
      };
    case "SET_COLLAPSED":
      return {
        ...state,
        collapsed: action.playload,
      };
    default:
      return state;
  }
}
