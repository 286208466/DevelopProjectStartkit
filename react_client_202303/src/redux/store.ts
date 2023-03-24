import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

// import createSagaMiddleware from 'redux-saga';

// import { setCollapsed } from "@/redux/actions";
// import { setUserInfo } from "./reducers";
// store.dispatch(setCollapsed(true))

let middleware = [];

// const sagaMiddleware = createSagaMiddleware(); // 调用异步接口
const loggerMiddleware = createLogger();

middleware.push(thunk);
// middleware.push(sagaMiddleware)
middleware.push(loggerMiddleware);
//redux-logger一定要放在最后，否则输出结果会不正确

let store: any = null;
if (process.env.NODE_ENV === "development") {
  store = createStore(reducers, applyMiddleware(...middleware));
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}
store.subscribe(() => console.log("store.subscribe", store.getState()));

export default store;
