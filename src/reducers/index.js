import { combineReducers } from "redux";
import wallReducer from "./wallpaper";
import taskReducer from "./taskbar";
import desktopReducer from "./desktop";

const allReducers = combineReducers({
  wallpaper: wallReducer,
  taskbar: taskReducer,
  desktop: desktopReducer,
});

export default allReducers;
