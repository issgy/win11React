import { desktopApps } from "../utils";

const defState = {
  apps: desktopApps,
  hide: false,
  size: 1,
  sort: "none",
  abOpen: false,
};

const desktopReducer = (state = defState, action) => {
  switch (action.type) {
    case "DESKREM":
      let arr = state.apps.filter(
        (x) =>
          x.action != action.payload.type || x.payload != action.payload.payload
      );
      localStorage.setItem("desktop", JSON.stringify(arr.map((x) => x.name)));
      return {
        ...state,
        apps: arr,
      };
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
    case "DESKSORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "DESKABOUT":
      return {
        ...state,
        abOpen: action.payload,
      };
    default:
      return state;
  }
};

export default desktopReducer;
