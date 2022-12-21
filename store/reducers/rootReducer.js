import currentAuthReducer from "./currentAuthReducer";
import { combineReducers } from "redux";

//Combine all the sub reducers
const rootReducer = combineReducers({
  currentAuth: currentAuthReducer,
});

export default rootReducer;
