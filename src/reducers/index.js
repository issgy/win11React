import { combineReducers, createStore } from "redux";
import wallReducer from "./wallpaper";
import taskReducer from "./taskbar";
import desktopReducer from "./desktop";
import menuReducer from "./startmenu";
import paneReducer from "./sidepane";
import widReducer from "./widpane";
import appReducer from "./apps";
import globalReducer from "./globals";
import menusReducer from "./menu";
import settingReducer from "./settings";

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
  settings: settingReducer,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
