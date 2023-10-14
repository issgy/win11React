import React, { useEffect } from "react";
import { Background, LockScreen, BootScreen } from "./containers/background";
import Taskbar from "./components/taskbar";
import {
  StartMenu,
  DesktopApp,
  SidePane,
  WidPane,
  CalnWid,
} from "./components/start";
import ActMenu from "./components/menu";
import * as Applications from "./containers/applications";
import "./index.css";
import "./short.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSettings } from "./actions";
import store from "./reducers";

function App() {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);
  const wall = useSelector((state) => state.wallpaper);

  const hideAll = (event) => {
    const ess = [
      ["START", "STARTHID"], //startmenu
      ["PANE", "PANEHIDE"], //sidepane.hide
      ["WIDG", "WIDGHIDE"], //widpane
      ["CALN", "CALNHIDE"], //sidepane.calhide
      ["MENU", "MENUHIDE"], //menu
    ];

    ess[0].push(store.getState().startmenu.hide);
    ess[1].push(store.getState().sidepane.hide);
    ess[2].push(store.getState().widpane.hide);
    ess[3].push(store.getState().sidepane.calhide);
    ess[4].push(store.getState().menus.hide);

    let actionType;
    try {
      actionType = event.target.dataset.action || "";
    } catch (err) {
      actionType = "";
    }

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix"
    );

    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        if (!item[2]) {
          dispatch({ type: item[1] });
        }
      }
    });
  };

  window.addEventListener("click", (e) => {
    hideAll(e);
  });

  window.addEventListener("contextmenu", (e) => {
    hideAll(e);
    e.preventDefault();
    if (e.target.dataset.menu != null) {
      dispatch({
        type: "MENUSHOW",
        payload: {
          top: e.clientY,
          left: e.clientX,
          menu: e.target.dataset.menu,
          attr: e.target.dataset.attributes,
          dataset: e.target.dataset,
        },
      });
    }
  });

  window.addEventListener("load", (e) => {
    dispatch({ type: "WALLBOOTED" });
  });

  useEffect(() => {
    if (!window.onstart) {
      loadSettings();
      window.onstart = setTimeout(() => {
        dispatch({ type: "WALLBOOTED" });
      }, 5000);
    }
  });

  return (
    <div className="App">
      {!wall.booted ? <BootScreen dir={wall.dir} /> : null}
      {wall.locked ? <LockScreen dir={wall.dir} /> : null}
      <div className="appwrap">
        <Background />
        <div className="desktop" data-menu="desk">
          <DesktopApp />
          {Object.keys(Applications).map((key, i) => {
            const WinApp = Applications[key];
            return <WinApp key={i} />;
            // or:
            // return <div>{Applications[key]()}</div>;
          })}
          <StartMenu />
          <SidePane />
          <WidPane />
          <CalnWid />
        </div>
        <Taskbar />
        <ActMenu />
      </div>
    </div>
  );
}

export default App;
