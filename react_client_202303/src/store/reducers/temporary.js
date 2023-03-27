// eslint-disable-next-line

const initialState = {
  pageLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_PAGELOADING":
      return {
        ...state,
        pageLoading: action.playload,
      };

    default:
      return state;
  }
}
