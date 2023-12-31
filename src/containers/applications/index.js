import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./tabs.scss";
import "./tab2.scss";
import "./wnapp.scss";

export * from "./apps/edge";

export * from "./apps/store";

export * from "./apps/terminal";

export * from "./apps/notepad";

export * from "./apps/calculator";

export * from "./apps/vscode";

export * from "./apps/explorer";

export * from "./apps/whiteboard";

export * from "./apps/about";

export * from "./apps/spotify";

export * from "./apps/camera";

export * from "./apps/settings";

//app被最小化后鼠标覆盖出现的小屏
export const ScreenPreview = () => {
  const tasks = useSelector((state) => state.taskbar);

  useEffect(() => {
    if (tasks.prevApp != "" && tasks.prev) {
      var wnapp = document.getElementById(tasks.prevApp + "App");
      if (wnapp) {
        var clone = wnapp.cloneNode(true);
        clone.id = "prevsc";
        clone.dataset.hide = "false";
        clone.dataset.max = "true";
        clone.dataset.size = "full";
        clone.style.zIndex = "1";
      }
      var parentDiv = document.getElementById("prevApp");
      var prevsc = document.getElementById("prevsc");

      parentDiv.replaceChild(clone, prevsc);
    }
  });

  return (
    <div className="prevCont" style={{ left: tasks.prevPos + "%" }}>
      <div className="prevScreen" id="prevApp" data-show={tasks.prev}>
        <div id="prevsc"></div>
      </div>
    </div>
  );
};
