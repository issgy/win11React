import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar } from "../../../utils/general";
import "./assets/settings.scss";

import data from "./assets/settingsData.json";
import { changeTheme } from "../../../actions";

export const Settings = () => {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.settings);
  const theme = useSelector((state) => state.settings.person.theme);
  const wall = useSelector((state) => state.wallpaper);

  const [nav, setNav] = useState("");
  const [page, setPage] = useState("System");

  const themechecker = {
    default: "light",
    dark: "dark",
    ThemeA: "dark",
    ThemeB: "dark",
    ThemeD: "light",
    ThemeC: "light",
  };

  const handleWallAndTheme = (e) => {
    let payload = e.target.dataset.payload;
    let theme_nxt = themechecker[payload.split("/")[0]];
    let src = payload;

    dispatch({
      type: "WALLSET",
      payload: src,
    });

    if (theme_nxt != theme) {
      changeTheme();
    }
  };

  return (
    <div
      className="settingsApp floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Settings"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <nav className={nav}>
            <div className="nav_top">
              <div className="account" onClick={() => setPage("Accounts")}>
                <img
                  src="img/settings/defAccount.webp"
                  alt=""
                  height={60}
                  width={60}
                />
                <div>
                  <p>issgy</p>
                  <p>Local Account</p>
                </div>
              </div>
              <input
                type="text"
                className="search"
                placeholder="查找设置"
                name="search"
              />
            </div>
            <div className="nav_bottom win11Scroll">
              {Object.keys(data).map((e) => {
                return (
                  <div
                    key={e}
                    className={`navLink ${e === page ? "selected" : ""}`}
                    onClick={() => {
                      setPage(e);
                    }}
                  >
                    <img
                      src={`img/settings/${e}.webp`}
                      alt=""
                      height={16}
                      width={16}
                    />
                    {e}
                  </div>
                );
              })}
            </div>
          </nav>

          {Object.keys(data).map((e) => {
            return (
              page === e && (
                <main key={e}>
                  <h1>{e}</h1>
                  <div className="tilesCont win11Scroll">
                    {data[e].map((e) => {
                      switch (e.type) {
                        case "sysTop":
                          return (
                            <div className={e.type}>
                              <div className="left">
                                <img
                                  src={`img/wallpaper/${wall.src}`}
                                  alt=""
                                  className="device_img"
                                />
                                <div className="column_device">
                                  <p className="device_name">Liber-V</p>
                                  <p className="device_model">NS14A8</p>
                                  <p className="device_rename">Rename</p>
                                </div>
                              </div>
                              <div className="right">
                                <div className="column">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/94/M_box.svg"
                                    height={20}
                                    alt=""
                                  />
                                  <p>
                                    Microsoft 365
                                    <br />
                                    <span className="column_lower">
                                      View benefits
                                    </span>
                                  </p>
                                </div>
                                <div
                                  className="column"
                                  onClick={() => setPage("Windows Update")}
                                >
                                  <img
                                    src="img/settings/Windows Update.webp"
                                    alt=""
                                    height={20}
                                  />
                                  <p>
                                    Windows Update
                                    <br />
                                    <span className="column_lower">
                                      You're up to date
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        case "netTop":
                          return (
                            <div className="netTop">
                              <div>
                                <img
                                  src="img/settings/wifi.png"
                                  alt=""
                                  height={100}
                                />
                                <div>
                                  <h2 className="font-medium text-lg">WiFi</h2>
                                  <p>Connected,secured</p>
                                </div>
                              </div>
                              <div className="box">
                                <span className="settingsIcon"></span>
                                <div>
                                  <h3>Properties</h3>
                                  <p>Public network 5 Ghz</p>
                                </div>
                              </div>
                              <div className="box">
                                <span className="settingsIcon"></span>
                                <div>
                                  <h3>Data Usage</h3>
                                  <p>
                                    {Math.round(Math.random() * 100)}GB, last 30
                                    days
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        case "personaliseTop":
                          return (
                            <div className="personaliseTop">
                              <img
                                className="mainImg"
                                src={`img/wallpaper/${wall.src}`}
                                alt=""
                              />
                              <div>
                                <h3>Select a theme to apply</h3>
                                <div className="bgBox">
                                  {wall.themes.map((e) => {
                                    return (
                                      <Image
                                        className={
                                          wall.src.includes(e) ? "selected" : ""
                                        }
                                        src={`img/wallpaper/${e}/img0.jpg`}
                                        ext
                                        onClick={handleWallAndTheme}
                                        click="WALLSET"
                                        payload={`${e}/img0.jpg`}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        case "accountsTop":
                          return (
                            <div className="accountsTop">
                              <img
                                src="img/settings/defAccount.webp"
                                alt=""
                                width={90}
                              />
                              <div>
                                <p>issgy</p>
                                <p>Local Account</p>
                                <p>Administrator</p>
                              </div>
                            </div>
                          );
                        case "updateTop":
                          return (
                            <div className="updateTop">
                              <div className="left">
                                <img
                                  src="img/settings/update.png"
                                  width={90}
                                  alt=""
                                />
                                <div>
                                  <h2>You're up to date</h2>
                                  <p>Last checked: Today</p>
                                </div>
                              </div>
                              <div className="right">
                                <div className="btn">Check for updates</div>
                              </div>
                            </div>
                          );
                        case "subHeading":
                        case "spacer":
                          return <div className={e.type}>{e.name}</div>;
                        case "tile":
                        case "tile square":
                        case "tile thin-blue":
                          return (
                            <div key={e.name} className={e.type}>
                              <span className="settingsIcon">{e.icon}</span>
                              <div>
                                <p>{e.name}</p>
                                <p className="tile_desc">{e.desc}</p>
                              </div>
                            </div>
                          );
                        default:
                          return console.log(
                            `error - type ${e.type} not found`
                          );
                      }
                    })}
                  </div>
                </main>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
