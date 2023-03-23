import * as React from "react";
import * as ReactDOM from "react-dom";
import { FC } from "react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
} from "react";

import styles from "./index.module.scss";

const App = (props) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <div>11111111111111111111</div>
    </>
  );
};

// const mapStateToProps = (state) => ({
//   global: state.global,
// });
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(actions, dispatch);
// };
// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
