import React from "react";
import { useSelector } from "react-redux";

import "./index.css";
const Background = () => {
  const wallpaper = useSelector((state) => state.wallpaper);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${`/img/wallpaper/${wallpaper.theme}/${wallpaper.src}`})`,
      }}
    ></div>
  );
};

export default Background;
