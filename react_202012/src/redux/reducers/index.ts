import { combineReducers } from "redux";
import systemReducer from "./system";

const allReducers = {
  system: systemReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
