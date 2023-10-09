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
    case "DESKDEL":
      let arrdel = state.apps.filter((x) => x.name != action.payload);
      localStorage.setItem(
        "desktop",
        JSON.stringify(arrdel.map((x) => x.name))
      );
      return {
        ...state,
        apps: arrdel,
      };
    case "DESKADD": //更新桌面图标
      let arradd = [...state.apps];
      arradd.push(action.payload);
      return {
        ...state,
        apps: arradd,
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
