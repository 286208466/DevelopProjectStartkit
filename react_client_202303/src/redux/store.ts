import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

// import { setCollapsed } from "@/redux/actions";
// store.dispatch(setCollapsed(true))

const loggerMiddleware = createLogger();

let store: any = null;
if (process.env.NODE_ENV === "development") {
  store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}
// const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));
store.subscribe(() => console.log("store.subscribe", store.getState()));

export default store;
