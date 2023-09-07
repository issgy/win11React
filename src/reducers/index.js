import { combineReducers } from "redux";
import wallReducer from "./wallpaper";
import taskReducer from "./taskbar";

const allReducers = combineReducers({
  wallpaper: wallReducer,
  taskbar: taskReducer,
  // desktop:
});

export default allReducers;
