import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Icon } from "../../utils/general";

import "./taskbar.scss";

const Taskbar = () => {
  const tasks = useSelector((state) => state.taskbar);
  const apps = useSelector((state) => {
    const tmpApps = { ...state.apps };
    for (var i = 0; i < state.taskbar.apps.length; i++) {
      // 给taskbar栏的右四个app图标添加属性及属性值：task:true
      // 为了区分后续点击除taskbar栏有的app外做准备
      tmpApps[state.taskbar.apps[i].icon].task = true;
    }
    return tmpApps;
  });
  return (
    <div className="taskbar">
      <div className="taskcont">
        <div className="tasksCont" data-side={tasks.align}>
          <div className="tsbar">
            <Icon className="tsIcon" src="home" width={22} click="STARTOGG" />
            <Icon className="tsIcon" src="search" width={22} click="STARTSRC" />
            <Icon className="tsIcon" src="widget" width={22} click="WIDGTOGG" />
            {tasks.apps.map((task, i) => {
              return (
                <Icon
                  key={i}
                  className="tsIcon"
                  src={task.icon}
                  width={22}
                  open={apps[task.icon].hide ? null : true}
                  active={apps[task.icon].z == apps.hz}
                  click={task.action}
                  payload="togg"
                />
              );
            })}
            {Object.keys(apps).map((key, i) => {
              return key != "hz" && !apps[key].task && !apps[key].hide ? (
                <Icon
                  key={i}
                  className="tsIcon"
                  width={22}
                  active={apps[key].z == apps.hz}
                  click={apps[key].action}
                  payload="togg"
                  open="true"
                  src={apps[key].icon}
                />
              ) : null;
            })}
          </div>
        </div>
        <div className="taskright">
          <Icon className="taskIcon" fafa="faChevronUp" width={10} />
          <Icon className="taskIcon" src="wifi" ui width={14} />
          <Icon className="taskIcon" src="battery" ui width={16} />
          <Icon className="taskIcon" src="audio" ui width={22} />
          <div className="taskDate">
            <div>
              {new Date().toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "numeric",
              })}
            </div>
            <div>
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
          <Icon
            className="taskIcon mr-2"
            ui
            src="sidepane"
            width={16}
            invert
            click="PANETOGG"
          />
          <Icon className="graybd" ui width={6} click="SHOWDSK" pr />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
