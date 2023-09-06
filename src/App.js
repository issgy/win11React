import React from "react";
import Background from "./containers/background";
import Taskbar from "./components/taskbar";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Background />
      <Taskbar />
    </div>
  );
}

export default App;
