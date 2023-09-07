import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const DesktopApp = () => {
  const deskApps = useSelector((state) => state.desktop);
  const dispatch = useDispatch();

  return <div>desktop</div>;
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
