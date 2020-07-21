import {combineReducers} from "redux";
import {reducer as step} from "./step/step.js";
import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.STEP]: step,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
