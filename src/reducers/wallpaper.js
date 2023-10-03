//默认壁纸设置
const defState = {
  theme: "default",
  src: "img0.jpg",
  locked: true,
  booted: false,
  dir: 0, //-1为转圈圈效果
  act: "",
};

const wallReducer = (state = defState, action) => {
  switch (action.type) {
    case "WALLUNLOCK":
      return { ...state, locked: false };
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
    default:
      return state;
  }
};

export default wallReducer;
