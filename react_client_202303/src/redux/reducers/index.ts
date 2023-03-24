import { combineReducers } from "redux";
import userReducer from "./user";
import globalReducer from "./global";

const allReducers = {
  user: userReducer,
  global: globalReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;

