import { desktopApps } from "../utils";

const defState = {
  apps: desktopApps,
  hide: false,
  size: 1,
};

const desktopReducer = (state = defState, action) => {
  switch (action.type) {
    case "DESKSHOW":
      return {
        ...state,
        hide: false,
      };
    case "DESKHIDE":
      return {
        ...state,
        hide: true,
      };
    case "DESKTOGG":
      return {
        ...state,
        hide: !state.hide,
      };
    case "DESKSIZE":
      return {
        ...state,
        size: action.payload,
      };
    default:
      return state;
  }
};

export default desktopReducer;
