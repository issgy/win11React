import { combineReducers } from "redux";
import wallReducer from "./wallpaper";
import taskReducer from "./taskbar";
import desktopReducer from "./desktop";
import menuReducer from "./startmenu";
import paneReducer from "./sidepane";
import widReducer from "./widpane";
import appReducer from "./apps";
import globalReducer from "./globals";
import menusReducer from "./menu";

const allReducers = combineReducers({
  wallpaper: wallReducer,
  taskbar: taskReducer,
  desktop: desktopReducer,
  startmenu: menuReducer,
  sidepane: paneReducer,
  widpane: widReducer,
  apps: appReducer,
  globals: globalReducer,
  menus: menusReducer,
});

export default allReducers;
