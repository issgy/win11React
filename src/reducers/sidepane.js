const defState = {
  quicks: [
    {
      ui: true,
      src: "wifi",
      name: "网络",
      state: true,
    },
    {
      ui: true,
      src: "bluetooth",
      name: "蓝牙",
      state: false,
    },
    {
      ui: true,
      src: "airplane",
      name: "飞行模式",
      state: false,
    },
    {
      ui: true,
      src: "saver",
      name: "节电模式",
      state: false,
    },
    {
      ui: true,
      src: "moon",
      name: "专注助手",
      state: false,
    },
    {
      ui: true,
      src: "location",
      name: "定位",
      state: false,
    },
    {
      ui: true,
      src: "nightlight",
      name: "夜间模式",
      state: false,
    },
    {
      ui: true,
      src: "connect",
      name: "连接",
      state: false,
    },
    {
      ui: true,
      src: "project",
      name: "投影",
      state: false,
    },
  ],
  hide: true,
  calhide: true,
};

const paneReducer = (state = defState, action) => {
  switch (action.type) {
    case "PANEQBTN": {
      const tmpState = { ...state };
      tmpState.quicks[action.payload].state =
        !tmpState.quicks[action.payload].state;
      return tmpState;
    }
    case "PANETOGG":
      return {
        ...state,
        hide: !state.hide,
      };
    case "PANEHIDE":
      return {
        ...state,
        hide: true,
      };
    case "CALNTOGG":
      return {
        ...state,
        calhide: !state.calhide,
      };
    case "CALNHIDE":
      return {
        ...state,
        calhide: true,
      };
    default:
      return state;
  }
};

export default paneReducer;
