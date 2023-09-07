import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import "./startmenu.scss";

export const DesktopApp = () => {
  const deskApps = useSelector((state) => state.desktop);
  const dispatch = useDispatch();

  return (
    <div className="desktopCont">
      {deskApps.apps.map((desk, i) => {
        return (
          <div key={i} value={i} className="dskApp">
            <Icon className="dskIcon" src={desk.icon} width={36} />
            <div className="appName">{desk.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export const StartMenu = () => {
  // const deskApps = useSelector(state => {

  // })

  return <div>StartMenu</div>;
};

export const SidePane = () => {
  // const deskApps = useSelector(state => {

  // })

  return <div>SidePane</div>;
};

export const WidPane = () => {
  // const deskApps = useSelector(state => {

  // })

  return <div>WidPane</div>;
};
