let wps = localStorage.getItem("wps") || 0;
let locked = localStorage.getItem("locked");

const walls = [
  "default/img0.jpg",
  "dark/img0.jpg",
  "ThemeA/img0.jpg",
  "ThemeA/img1.jpg",
  "ThemeA/img2.jpg",
  "ThemeA/img3.jpg",
  "ThemeB/img0.jpg",
  "ThemeB/img1.jpg",
  "ThemeB/img2.jpg",
  "ThemeB/img3.jpg",
  "ThemeC/img0.jpg",
  "ThemeC/img1.jpg",
  "ThemeC/img2.jpg",
  "ThemeC/img3.jpg",
  "ThemeD/img0.jpg",
  "ThemeD/img1.jpg",
  "ThemeD/img2.jpg",
  "ThemeD/img3.jpg",
];

const themes = ["default", "dark", "ThemeA", "ThemeB", "ThemeD", "ThemeC"];

//默认壁纸设置
const defState = {
  wps: wps,
  src: walls[wps],
  themes: themes,
  locked: !(locked == false),
  booted: false,
  dir: 0, //-1为转圈圈效果
  act: "",
};

const wallReducer = (state = defState, action) => {
  switch (action.type) {
    case "WALLUNLOCK":
      localStorage.setItem("locked", false);
      return { ...state, locked: false, dir: 0 };
    case "WALLNEXT":
      let twps = (state.wps + 1) % walls.length;
      localStorage.setItem("wps", twps);
      return {
        ...state,
        wps: twps,
        src: walls[twps],
      };
    case "WALLBOOTED":
      return {
        ...state,
        booted: true,
        dir: 0,
        act: "",
      };
    case "WALLRESTART":
      return {
        ...state,
        booted: false,
        locked: true,
        dir: -1,
        act: "restart",
      };
    case "WALLSHUTDN":
      return {
        ...state,
        booted: false,
        locked: true,
        dir: -1,
        act: "shutdn",
      };
    case "WALLALOCK":
      return {
        ...state,
        locked: true,
        dir: -1,
      };
    case "WALLSET":
      let isIndex = !Number.isNaN(parseInt(action.payload)),
        wps = 0,
        src = "";

      if (isIndex) {
        wps = action.payload;
        src = walls[action.payload];
      } else {
        src = action.payload;
        wps = walls.indexOf(action.payload);
        localStorage.setItem("wps", wps);
      }

      return {
        ...state,
        wps: wps,
        src: src,
      };
    default:
      return state;
  }
};

export default wallReducer;
