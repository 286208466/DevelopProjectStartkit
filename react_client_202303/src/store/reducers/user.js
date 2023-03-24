// eslint-disable-next-line

const initialState = {
  userinfo: {},
  auths: [],
  authKeys: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_USERINFO":
      return {
        ...state,
        user: {
          ...initialState.user,
          ...action.playload,
        },
      };

    case "SET_AUTHS":
      return {
        ...state,
        auths: [...initialState.auths, ...action.playload],
      };
    case "SET_AUTHKEYS":
      return {
        ...state,
        authKeys: [...initialState.authKeys, ...action.playload],
      };

    default:
      return state;
  }
}
