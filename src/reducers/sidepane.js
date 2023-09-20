const defState = {
  quicks: [
    {
      ui: true,
      src: "location",
      name: "Location",
      state: false,
    },
    {
      ui: true,
      src: "saver",
      name: "Battery Saver",
      state: true,
    },
    {
      ui: true,
      src: "nightlight",
      name: "Night Light",
      state: false,
    },
    {
      ui: true,
      src: "bluetooth",
      name: "Bluetooth",
      state: false,
    },
    {
      ui: true,
      src: "airplane",
      name: "Offline mode",
      state: false,
    },
    {
      ui: true,
      src: "connect",
      name: "Connect",
      state: false,
    },
    {
      ui: true,
      src: "project",
      name: "Project",
      state: false,
    },
    {
      ui: true,
      src: "network",
      name: "Network",
      state: false,
    },
    {
      ui: true,
      src: "nearshare",
      name: "Sharing",
      state: false,
    },
    {
      ui: true,
      src: "tablet",
      name: "Tablet mode",
      state: false,
    },
    {
      ui: true,
      src: "shield",
      name: "Security",
      state: false,
    },
    {
      ui: true,
      src: "moon",
      name: "Focus assist",
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
