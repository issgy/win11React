import { pinnedApps, recentApps, allApps } from "../utils";

const defState = {
  pnApps: pinnedApps,
  rcApps: recentApps,
  allApps: allApps,
  hide: true,
  // 点击allApps变为true
  showAll: false,
  alpha: false, //是否为字母表页面
  curAlpha: "A", //应用所在的字母，默认为'A'
  menu: false,
  pwcrtl: false, //是否出现电源操作选项
  //点击taskbar栏的搜索图标后出现的卡片的Quick Searches
  qksrch: [
    ["faClock", 1, "Today in history"],
    ["faFilm", null, "New movies"],
    ["faNewspaper", 1, "Top news"],
    ["faChartLine", null, "Markets today"],
  ],
};

const menuReducer = (state = defState, action) => {
  switch (action.type) {
    case "STARTSHW":
      return {
        ...state,
        hide: false,
        pwcrtl: false,
      };
    case "STARTHID":
      return {
        ...state,
        hide: true,
        showAll: false,
        pwcrtl: false,
      };
    case "STARTOGG":
      return {
        ...state,
        hide: !(state.hide || !state.menu),
        menu: true,
        alpha: false,
        curAlpha: "A",
        showAll: state.menu && state.showAll ? true : null,
        pwcrtl: false,
      };
    case "STARTALL":
      return {
        ...state,
        showAll: !state.showAll,
        alpha: false,
        curAlpha: "A",
        pwcrtl: false,
      };
    case "STARTALPHA":
      return {
        ...state,
        alpha: !state.alpha,
        curAlpha: action.payload || "A",
        pwcrtl: false,
      };
    case "STARTSRC":
      return {
        ...state,
        hide: !(state.hide || state.menu),
        menu: false,
        pwcrtl: false,
      };
    case "STARTPWC":
      return {
        ...state,
        pwcrtl: !state.pwcrtl,
      };
    default:
      return state;
  }
};

export default menuReducer;
