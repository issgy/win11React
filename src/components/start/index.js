import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import "./startmenu.scss";
import "./sidepane.scss";
import "./searchpane.scss";

import * as Actions from "../../actions";
import Battery from "../shared/battery";

export * from "./start";
export * from "./widget";

export const DesktopApp = () => {
  const deskApps = useSelector((state) => {
    const desktop = { ...state.desktop };

    if (desktop.sort === "name") {
      desktop.apps.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    } else if (desktop.sort === "size") {
      desktop.apps.sort((a, b) => {
        const anm = a.name,
          bnm = b.name;

        return anm[bnm.charCodeAt(0) % anm.length] >
          bnm[anm.charCodeAt(0) % bnm.length]
          ? 1
          : -1;
      });
    } else if (desktop.sort === "date") {
      desktop.apps.sort((a, b) => {
        const anm = a.name,
          bnm = b.name;
        const anml = anm.length,
          bnml = bnm.length;

        return anm[(bnml * 13) % anm.length] > bnm[(anml * 17) % bnm.length]
          ? 1
          : -1;
      });
    }

    return desktop;
  });

  return (
    <div className="desktopCont">
      {!deskApps.hide &&
        deskApps.apps.map((desk, i) => {
          return (
            <div key={i} value={i} className="dskApp">
              <Icon
                className="dskIcon prtclk"
                src={desk.icon}
                width={Math.round(deskApps.size * 36)}
                click={desk.action}
                payload={desk.payload || "full"}
                menu="app"
                pr
              />
              <div className="appName">{desk.name}</div>
            </div>
          );
        })}
    </div>
  );
};

export const BandPane = () => {
  const sidepane = useSelector((state) => state.sidepane);

  return (
    <div
      className="bandpane dpShad"
      data-hide={sidepane.banhide}
      style={{ "--prefix": "BAND" }}
    >
      <div className="bandContainer">
        <Icon className="hvlight" src="defender" width={17} />
        <Icon className="hvlight" src="spotify" width={17} />
        <Icon className="hvlight" src="teams" width={17} />
      </div>
    </div>
  );
};

export const SidePane = () => {
  const paneApps = useSelector((state) => state.sidepane);
  const setting = useSelector((state) => state.settings);
  const tasks = useSelector((state) => state.taskbar);
  const dispatch = useDispatch();
  const [paneState, setPaneState] = useState([]); //记录sidepane的状态

  const clickDispatch = (event) => {
    event.stopPropagation();
    let action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };
    if (action.type) {
      if (action.type != action.type.toUpperCase()) {
        Actions[action.type](action.payload);
      } else {
        dispatch(action);
      }
    }
  };

  const setBrightness = (e) => {
    document.getElementById("brightoverlay").style.opacity =
      (100 - e.target.value) / 100;
  };

  const setVolume = (e) => {
    let volume = 3;
    if (e.target.value == 0) {
      volume = 0;
    } else if (e.target.value < 30 && e.target.value > 0) {
      volume = 1;
    } else if (e.target.value < 70 && e.target.value > 30) {
      volume = 2;
    }

    dispatch({ type: "TASKAUDIO", payload: volume });
  };

  useEffect(() => {
    //夜间模式逻辑
    if ((paneApps.quicks[5].src = "nightlight")) {
      if (paneState[5]) document.body.dataset.sepia = true;
      else document.body.dataset.sepia = false;
    }
  });

  const getQuicksValue = (setting, path) => {
    if (!path) return false;

    let tmp = { ...setting };
    path = path.split(".");
    for (let i = 0; i < path.length; i++) {
      tmp = tmp[path[i]];
    }

    return tmp;
  };

  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < paneApps.quicks.length; i++) {
      let val = getQuicksValue(setting, paneApps.quicks[i].state);
      if (paneApps.quicks[i].name == "主题") val = val == "dark";
      tmp.push(val);
    }
    setPaneState(tmp);
  }, [setting, paneApps]);

  return (
    <div
      className="sidePane dpShad"
      data-hide={paneApps.hide}
      style={{ "--prefix": "PANE" }}
    >
      <div className="quickSettings">
        <div className="quickCont">
          {paneApps.quicks.map((qk, i) => {
            return (
              <div className="actionCenter" key={i}>
                <div
                  className="qkbtn handcr prtclk"
                  onClick={clickDispatch}
                  data-action={qk.action}
                  data-payload={qk.payload || qk.state}
                  data-state={paneState[i]}
                >
                  <Icon
                    className="quickIcon"
                    ui={qk.ui}
                    src={qk.src}
                    width={14}
                    invert={paneState[i] ? true : null}
                  />
                </div>
                <div className="qktext">{qk.name}</div>
              </div>
            );
          })}
        </div>
        <div className="sliderCont">
          <Icon className="mx-2" src="brightness" ui width={20} />
          <input
            className="sliders"
            type="range"
            onChange={setBrightness}
            min="25"
            max="100"
            defaultValue="100"
          />
        </div>
        <div className="sliderCont">
          <Icon className="mx-2" src={"audio" + tasks.audio} ui width={18} />
          <input
            className="sliders"
            type="range"
            onChange={setVolume}
            min="0"
            max="100"
            defaultValue="100"
          />
        </div>
      </div>
      <div className="bottomBar p-1">
        <div className="px-3 battery-sidepane">
          <Battery pct />
        </div>
      </div>
    </div>
  );
};

export const CalnWid = () => {
  const sidepane = useSelector((state) => state.sidepane);
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoad(true);
      window.dycalendar.draw({
        target: "#dycalendar",
        type: "month",
        dayformat: "ddd",
        monthformat: "full",
        prevnextbutton: "show",
        highlighttoday: true,
      });
    }
  });
  return (
    <div
      className="calnpane dpShad"
      data-hide={sidepane.calhide}
      style={{ "--prefix": "CALN" }}
    >
      <div className="topBar">
        <div className="text-sm" style={{ textAlign: "center" }}>
          {new Date().toLocaleDateString("zh-CN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div id="dycalendar"></div>
    </div>
  );
};
