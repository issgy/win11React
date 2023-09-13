import React from "react";
import Background from "./containers/background";
import Taskbar from "./components/taskbar";
import { StartMenu, DesktopApp, SidePane, WidPane } from "./components/start";
import * as Applications from "./containers/applications";
import "./index.css";
import "./short.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  window.addEventListener("click", (event) => {
    const ess = [
      ["START", "STARTHID"],
      ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
    ];

    try {
      var actionType = event.target.dataset.action || "";
    } catch (err) {
      var actionType = "";
    }

    var actionType0 = getComputedStyle(event.target).getPropertyValue(
      "--prefix"
    );

    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        dispatch({ type: item[1] });
      }
    });
  });
  return (
    <div className="App">
      <Background />
      <div className="desktop">
        <DesktopApp />
        {Object.keys(Applications).map((key, i) => {
          return <div key={i}>{Applications[key]()}</div>;
        })}
        <StartMenu />
        <SidePane />
        <WidPane />
      </div>
      <Taskbar />
    </div>
  );
}

export default App;
