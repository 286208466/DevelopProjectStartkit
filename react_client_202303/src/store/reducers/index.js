import { combineReducers } from "redux";
import userReducer from "./user";
import globalReducer from "./global";
import temporaryReducer from "./temporary";

const allReducers = {
  user: userReducer,
  global: globalReducer,
  temporary: temporaryReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
