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

      if (desktop.indexOf(action.payload.name) == -1) {
        console.log(111111);
        desktop.push(action.payload.name);
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
