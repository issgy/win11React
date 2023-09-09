import { pinnedApps, recentApps, allApps } from "../utils";

const defState = {
  pnApps: pinnedApps,
  rcApps: recentApps,
  allApps: allApps,
  hide: true,
  showAll: false,
  alpha: false, //是否为字母表页面
  curAlpha: "A", //应用所在的字母，默认为'A'
};

const menuReducer = (state = defState, action) => {
  switch (action.type) {
    case "STARTSHW":
      return {
        ...state,
        hide: false,
      };
    case "STARTHID":
      return {
        ...state,
        hide: true,
      };
    case "STARTOGG":
      return {
        ...state,
        hide: !state.hide,
      };
    case "STARTALL":
      return {
        ...state,
        showAll: !state.showAll,
        alpha: false,
        curAlpha: "A",
      };
    case "STARTALPHA":
      return {
        ...state,
        alpha: !state.alpha,
        curAlpha: action.payload || "A",
      };
    default:
      return state;
  }
};

export default menuReducer;
