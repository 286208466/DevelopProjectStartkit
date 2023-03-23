import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

// import createSagaMiddleware from 'redux-saga';

let middleware = [];

// const sagaMiddleware = createSagaMiddleware(); // 调用异步接口
const loggerMiddleware = createLogger();

// import { setUserInfo } from "./reducers";

middleware.push(thunk);
// middleware.push(sagaMiddleware)
middleware.push(loggerMiddleware);
//redux-logger一定要放在最后，否则输出结果会不正确


const store = createStore(reducers, applyMiddleware(...middleware));

store.subscribe(() => console.log("store.subcribe", store.getState()));

// store.dispatch(
//   setUserInfo({
//     token: ""
//   })
// );
export default store;
