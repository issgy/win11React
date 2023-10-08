import { dfApps } from "../utils";

const defState = {};

const storeReducer = (state = defState, action) => {
  switch (action.type) {
    case "APPDOWNLOAD":
      let installed = localStorage.getItem("installed");
      if (!installed) installed = "[]";

      let desktop = localStorage.getItem("desktop");
      if (!desktop) desktop = dfApps.desktop;
      else desktop = JSON.parse(desktop);

      // 不能出现重复的
      if (
        desktop.indexOf(action.payload.name) == -1 &&
        installed.indexOf(action.payload.name) == -1
      ) {
        desktop.push(action.payload.name);
        console.log(desktop);
        localStorage.setItem("desktop", JSON.stringify(desktop));
        installed = JSON.parse(installed);
        installed.push(action.payload);
        localStorage.setItem("installed", JSON.stringify(installed));
      }
      return state;
    default:
      return state;
  }
};

export default storeReducer;
