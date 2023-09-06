import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faBatteryThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";
import "./taskbar.css";

const Taskbar = () => {
  return (
    <div className="taskbar">
      <div className="taskcont">
        <div className="taskright">
          <FontAwesomeIcon icon={faChevronUp} />
          <FontAwesomeIcon icon={faBatteryThreeQuarters} />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
