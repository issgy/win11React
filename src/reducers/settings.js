const defState = {
  system: {
    power: {
      saver: {
        state: false,
      },
      battery: 100,
    },
    display: {
      brightness: 100,
      nightlight: {
        state: false,
      },
      connect: false,
    },
  },
  person: {
    theme: "light",
    color: "issgy",
  },
  devices: {
    bluetooth: false,
  },
  network: {
    wifi: {
      state: true,
    },
    airplane: false,
  },
  privacy: {
    location: {
      state: false,
    },
  },
};

document.body.dataset.theme = defState.person.theme;

const changeVal = (tmpState, path, val = "togg") => {
  let obj = tmpState;
  path = path.split(".");
  for (let i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
  }

  if (val == "togg") {
    obj[path[path.length - 1]] = !obj[path[path.length - 1]];
  } else {
    obj[path[path.length - 1]] = val;
  }

  return tmpState;
};
const settingReducer = (state = defState, action) => {
  let tmpState = { ...state },
    changed = false;

  switch (action.type) {
    case "STNGTOGG":
      changed = true;
      tmpState = changeVal(tmpState, action.payload);
      break;
    case "STNGTHEME":
      changed = true;
      tmpState.person.theme = action.payload;
      break;
    case "STNGSETV":
      changed = true;
      tmpState = changeVal(tmpState, action.payload.path, action.payload.value);
      break;
    case "SETTINGLOAD":
      tmpState = { ...action.payload };
  }
  if (changed) localStorage.setItem("setting", JSON.stringify(tmpState));
  return tmpState;
};

export default settingReducer;
