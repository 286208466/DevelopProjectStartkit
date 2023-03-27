export function SET_PAGELOADING(playload) {
  return (dispatch) => {
    dispatch({
      type: "SET_PAGELOADING",
      playload,
    });
  };
}
