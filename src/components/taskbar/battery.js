import React, { useRef, useEffect, memo } from "react";
import { Icon } from "../../utils/general";

export const Battery = memo(({ level, charging }) => {
  const batteryref = useRef(null);
  useEffect(() => {
    if (batteryref.current && !charging) {
      batteryref.current.style.width = `${level}%`;
    }

    return () => {};
  }, [level, charging]);

  if (charging) {
    return <Icon className="taskIcon" src={`battery`} ui width={19} />;
  }

  return (
    <div className="uicon taskIcon">
      <span className="battery">
        <i className="fa fa-battery-empty"></i>
        <i className="fa fa-battery-4 animate" ref={batteryref}></i>
      </span>
    </div>
  );
});
