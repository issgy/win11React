import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Icon } from "../../utils/general";
import { Battery } from "./battery";

import "./taskbar.scss";

const Taskbar = () => {
  const dispatch = useDispatch();
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
  const [batteryStatus, setBatteryStatus] = useState(null);

  const clickDispatch = (event) => {
    const action = {
      payload: event.target.dataset.payload,
      type: event.target.dataset.action,
    };

    if (action.type) {
      dispatch(action);
    }
  };

  const showPrev = (event) => {
    let ele = event.target;
    while (ele && ele.getAttribute("value") === null) {
      ele = ele.parentElement;
    }
    const appPrev = ele.getAttribute("value");
    const xpos = window.scrollX + ele.getBoundingClientRect().left;
    const offsetx = Math.round((xpos * 10000) / window.innerWidth) / 100;
    dispatch({
      type: "TASKPSHOW",
      payload: {
        app: appPrev,
        pos: offsetx,
      },
    });
  };

  const hidePrev = () => {
    dispatch({ type: "TASKPHIDE" });
  };

  const showBatteryStatus = (battery) => {
    let level = battery.level * 100;
    if (battery.charging) {
      setBatteryStatus("*");
      return;
    } else {
      if (level <= 10) {
        level += 10;
      } else if (level >= 80) {
        level -= 10;
      }
      setBatteryStatus(level);
    }
  };

  useEffect(() => {
    const updateBattery = (e) => {
      showBatteryStatus(e.target);
    };

    const getBatteryStatus = async () => {
      try {
        const battery = await navigator.getBattery();
        battery.addEventListener("chargingchange", updateBattery); //订阅电池状态变化
        battery.removeEventListener("levelchange", updateBattery); //订阅电池状态变化
        showBatteryStatus(battery);
      } catch (error) {
        console.error(error);
      }
    };

    if (window.BatteryManager) {
      getBatteryStatus();
    }

    return () => {
      // 取消订阅电池状态变化
      if (batteryStatus) {
        batteryStatus.removeEventListener("chargingchange", updateBattery);
        batteryStatus.removeEventListener("levelchange", updateBattery);
      }
    };
  }, []);

  return (
    <div className="taskbar">
      <div className="taskcont">
        {/* taskbar中间图标 */}
        <div className="tasksCont" data-side={tasks.align} data-menu="task">
          <div className="tsbar" onMouseOut={hidePrev}>
            <Icon className="tsIcon" src="home" width={22} click="STARTOGG" />
            {tasks.search ? (
              <Icon
                className="tsIcon"
                src="search"
                width={22}
                click="STARTSRC"
              />
            ) : null}
            {tasks.widgets ? (
              <Icon
                className="tsIcon"
                src="widget"
                width={22}
                click="WIDGTOGG"
              />
            ) : null}
            {tasks.apps.map((task, i) => {
              const isHidden = task.hide;
              const isActive = task.z === apps.hz;
              return (
                <div
                  onMouseOver={!isHidden && !isActive ? showPrev : undefined}
                  value={task.icon}
                  key={i}
                >
                  <Icon
                    key={i}
                    className="tsIcon"
                    src={task.icon}
                    width={22}
                    open={isHidden ? null : true}
                    active={isActive}
                    click={task.action}
                    payload="togg"
                  />
                </div>
              );
            })}
            {/* 点击其它app后taskbar栏出现的图标 */}
            {Object.keys(apps).map((key, i) => {
              if (key !== "hz") {
                var isActive = apps[key].z === apps.hz;
              }
              return key != "hz" && !apps[key].task && !apps[key].hide ? (
                <div
                  onMouseOver={!isActive ? showPrev : undefined}
                  value={apps[key].icon}
                  key={i}
                >
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
                </div>
              ) : null;
            })}
          </div>
        </div>
        {/* taskbar右侧图标 */}
        <div className="taskright">
          <Icon className="taskIcon" fafa="faChevronUp" width={10} />
          <Icon className="taskIcon" src="wifi" ui width={14} />
          <Battery
            level={batteryStatus}
            charging={batteryStatus === "*" ? true : false}
          />
          <Icon className="taskIcon" src="audio" ui width={22} />
          <div
            className="taskDate handcr prtclk hvdark"
            onClick={clickDispatch}
            data-action="CALNTOGG"
          >
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
                hour12: true,
              })}
            </div>
          </div>
          <Icon
            className="taskIcon mr-2 hvdark"
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
