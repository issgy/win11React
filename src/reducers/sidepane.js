const defState = {
  quicks: [
    {
      ui: true,
      src: "wifi",
      name: "网络",
      state: "network.wifi.state",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "bluetooth",
      name: "蓝牙",
      state: "devices.bluetooth",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "airplane",
      name: "飞行模式",
      state: "network.airplane",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "saver",
      name: "节电模式",
      state: "system.power.saver.state",
      action: "STNGTOGG",
    },
    {
      ui: true,
      src: "sun",
      name: "主题",
      state: "person.theme",
      action: "changeTheme",
    },
    {
      ui: true,
      src: "nightlight",
      name: "夜间模式",
      state: "system.display.nightlight.state",
      action: "STNGTOGG",
    },
  ],
  hide: true,
  calhide: true,
  banhide: true,
};

const paneReducer = (state = defState, action) => {
  switch (action.type) {
    case "PANETHEME":
      let tmpState = { ...state };
      tmpState.quicks[4].src = action.payload;
      return tmpState;
    case "BANDTOGG":
      return { ...state, banhide: !state.banhide };
    case "BANDHIDE":
      return { ...state, banhide: true };
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
