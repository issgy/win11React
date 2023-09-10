import { combineReducers } from "redux";
import wallReducer from "./wallpaper";
import taskReducer from "./taskbar";
import desktopReducer from "./desktop";
import menuReducer from "./startmenu";
import sidePane from "./sidepane";

const allReducers = combineReducers({
  wallpaper: wallReducer,
  taskbar: taskReducer,
  desktop: desktopReducer,
  startmenu: menuReducer,
  sidepane: sidePane,
});

export default allReducers;
