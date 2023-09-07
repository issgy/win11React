import React from "react";

import Background from "./containers/background";
import Taskbar from "./components/taskbar";
import { StartMenu, DesktopApp, SidePane, WidPane } from "./components/start";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Background />
      <div className="desktop">
        <DesktopApp />
        <StartMenu />
        <SidePane />
        <WidPane />
      </div>
      <Taskbar />
    </div>
  );
}

export default App;
