import React from "react";
import Background from "./containers/background";
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
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const hideAll = (event) => {
    const ess = [
      ["START", "STARTHID"],
      ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CALN", "CALNHIDE"],
      ["MENU", "MENUHIDE"],
    ];

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
        dispatch({ type: item[1] });
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
        },
      });
    }
  });

  return (
    <div className="App">
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
  );
}

export default App;
