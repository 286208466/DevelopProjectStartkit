import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import createSagaMiddleware from 'redux-saga';
// import { setCollapsed } from "@/redux/actions";
// import { setUserInfo } from "./reducers";

//在localStorge中生成key为root的值
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["temporary"], //设置某个reducer数据不持久化，
};

let middleware = [];

// const sagaMiddleware = createSagaMiddleware(); // 调用异步接口
const loggerMiddleware = createLogger();

middleware.push(thunk);
// middleware.push(sagaMiddleware)
middleware.push(loggerMiddleware);
//redux-logger一定要放在最后，否则输出结果会不正确

const myPersistReducer = persistReducer(persistConfig, reducers);

let store = null;
if (process.env.NODE_ENV === "development") {
  store = createStore(myPersistReducer, applyMiddleware(...middleware));
} else {
  store = createStore(myPersistReducer, applyMiddleware(thunk));
}

const persistor = persistStore(store);

store.subscribe(() => console.log("store.subscribe", store.getState()));
// store.dispatch(setCollapsed(true))
// store.dispatch(
//   setUserInfo({
//     token: ""
//   })
// );

export { store, persistor };
