import { desktopApps } from "../utils";

const defState = {
  apps: desktopApps,
  hide: false,
};

const desktopReducer = (state = defState, action) => {
  switch (action.type) {
    case "DESKSHOW":
      return {
        apps: state.apps,
        hide: false,
      };
    case "DESKHIDE":
      return {
        apps: state.apps,
        hide: true,
      };
    case "DESKTOGG":
      return {
        apps: state.apps,
        hide: !state.hide,
      };
    default:
      return state;
  }
};

export default desktopReducer;
