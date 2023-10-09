import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, ToolBar, Image } from "../../../utils/general";

import storedata from "./assets/store.json";
import { installApp } from "../../../actions";
import "./assets/store.scss";

const geneStar = (item, rv = 0) => {
  var url = item.data.url,
    stars = 0;

  for (var i = 0; i < url.length; i++) {
    if (rv) stars += url[i].charCodeAt() / (i + 3);
    else stars += url[i].charCodeAt() / (i + 2);
  }

  if (rv) {
    stars = stars % 12;
    stars = Math.round(stars * 1000);
  } else {
    stars = stars % 4;
    stars = Math.round(stars * 10) / 10;
  }

  return 1 + stars;
};

const emap = (v) => {
  v = Math.min(1 / v, 10);
  return v / 11;
};

// store界面
export const MicroStore = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.store);
  const [tab, setTab] = useState("sthome");
  const [page, setPage] = useState(1);
  const [opapp, setOpapp] = useState(storedata[0]);

  const action = (e) => {
    const action = e.target && e.target.dataset.action,
      payload = e.target && e.target.dataset.payload;

    if (action == "page1") {
      setPage(action[4]);
    } else if (action == "page2") {
      setPage(2);
      for (let i = 0; i < storedata.length; i++) {
        if (storedata[i].data.url == payload) {
          setOpapp(storedata[i]);
          break;
        }
      }
    }
  };

  const toTab = (e) => {
    const x = e.target && e.target.dataset.action;
    if (x) {
      setTab(x);
      setPage(0);
    }
  };

  useEffect(() => {
    if (page == 0) {
      const target = document.getElementById(tab);
      if (target) {
        target.parentNode.parentNode.scrollTop = target.offsetTop;
      }
    }
  }, [tab]);

  return (
    <div
      className="wnstore floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar app={wnapp.action} icon={wnapp.icon} name="Microsoft Store" />
      <div className="windowScreen flex">
        {/* 左侧栏的五个图标 */}
        <div className="storeNav h-full w-16 flex flex-col">
          <Icon
            fafa="faHome"
            onClick={toTab}
            click="sthome"
            width={20}
            payload={page == 0 && tab == "sthome"}
          />
          <Icon
            fafa="faThLarge"
            onClick={toTab}
            click="apprib"
            width={18}
            payload={page == 0 && tab == "apprib"}
          />
          <Icon
            fafa="faGamepad"
            onClick={toTab}
            click="gamerib"
            width={20}
            payload={page == 0 && tab == "gamerib"}
          />
          <Icon
            fafa="faFilm"
            onClick={toTab}
            click="movrib"
            width={20}
            payload={page == 0 && tab == "movrib"}
          />
          <Icon
            fafa="faDownload"
            onClick={action}
            click="page1"
            width={20}
            payload={page == 1}
          />
        </div>
        {/* 右侧对应的内容 */}
        <div className="restWindow msfull thinScroll">
          {page == 0 ? <FrontPage /> : null}
          {page == 1 ? <DownPage action={action} /> : null}
          {page == 2 ? <DetailPage app={opapp} /> : null}
        </div>
      </div>
    </div>
  );
};

const FrontPage = memo(() => {
  const ribbon = useSelector((state) => state.globals.ribbon);
  const apprib = useSelector((state) => state.globals.apprib);
  const gamerib = useSelector((state) => state.globals.gamerib);
  const movrib = useSelector((state) => state.globals.movrib);
  return (
    <div className="pagecont w-full absolute top-0">
      <Image id="sthome" className="frontPage w-full" src="store/lucacover" />
      <div className="panelName absolute m-6 text-xl top-0">Home</div>
      <div className="w-full overflow-x-scroll noscroll overflow-y-hidden -mt-16">
        <div className="storeRibbon">
          {ribbon &&
            ribbon.map((x, i) => {
              return x == "unescape" ? (
                <a
                  key={i}
                  href="https://github.com/issgy"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    className="mx-1 dpShad rounded overflow-hidden"
                    var={x}
                    h={100}
                    dir="store/float"
                    src={x}
                  />
                </a>
              ) : (
                <Image
                  key={i}
                  className="mx-1 dpShad rounded overflow-hidden"
                  var={x}
                  h={100}
                  dir="store/float"
                  src={x}
                />
              );
            })}
        </div>
      </div>
      {/* apps */}
      <div
        id="apprib"
        className="frontCont amzApps my-8 py-20 w-auto mx-8 flex justify-between noscroll overflow-x-scroll overflow-y-hidden"
      >
        <div className="flex w-64 flex-col text-gray-100 h-full px-8">
          <div className="text-xl">Windows Apps</div>
          <div className="text-xs mt-2">
            Take your windows experience to new heights with these must-have
            apps
          </div>
        </div>
        <div className="flex w-max pr-8">
          {apprib &&
            apprib.map((x, i) => {
              const stars = 3 + ((x.charCodeAt(0) + x.charCodeAt(1)) % 3);
              return (
                <div className="ribcont rounded my-auto p-2 pb-2" key={i}>
                  <Image
                    className="mx-1 mb-2 py-1 rounded overflow-hidden"
                    w={120}
                    dir="store/apps"
                    src={x}
                  />
                  <div className="capitalize text-xs font-semibold">{x}</div>
                  <div className="flex mt-2 items-center">
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon
                      className={stars > 3 ? "bluestar" : ""}
                      fafa="faStar"
                      width={6}
                    />
                    <Icon
                      className={stars > 4 ? "bluestar" : ""}
                      fafa="faStar"
                      width={6}
                    />
                    <div className="text-xss text-gray-800">
                      {1 + (x.charCodeAt(3) % 5)}k
                    </div>
                  </div>
                  <div className="text-xss mt-8">
                    {x.charCodeAt(4) % 2 ? "Free" : "Owned"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* game */}
      <div
        id="gamerib"
        className="frontCont amzGames my-8 py-20 w-auto mx-8 flex justify-between noscroll overflow-x-scroll overflow-y-hidden"
      >
        <div className="flex w-64 flex-col text-gray-100 h-full px-8">
          <div className="text-xl">Featured Games</div>
          <div className="text-xs mt-2">
            Explore fun to play xbox games and find a new favorite
          </div>
        </div>
        <div className="flex w-max pr-8">
          {gamerib &&
            gamerib.map((x, i) => {
              var stars = 3 + ((x.charCodeAt(0) + x.charCodeAt(1)) % 3);
              return (
                <div className="ribcont rounded my-auto p-2 pb-2" key={i}>
                  <Image
                    className="mx-1 mb-2 py-1 rounded overflow-hidden"
                    w={120}
                    dir="store/games"
                    src={x}
                  />
                  <div className="capitalize text-xs font-semibold">{x}</div>
                  <div className="flex mt-2 items-center">
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon
                      className={stars > 3 ? "bluestar" : ""}
                      fafa="faStar"
                      width={6}
                    />
                    <Icon
                      className={stars > 4 ? "bluestar" : ""}
                      fafa="faStar"
                      width={6}
                    />
                    <div className="text-xss text-gray-800">
                      {1 + (x.charCodeAt(3) % 5)}k
                    </div>
                  </div>
                  <div className="text-xss mt-8">
                    {x.charCodeAt(4) % 2 ? "Free" : "Owned"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* movie */}
      <div
        id="movrib"
        className="frontCont amzMovies my-8 py-20 w-auto mx-8 flex justify-between noscroll overflow-x-scroll overflow-y-hidden"
      >
        <div className="flex w-64 flex-col text-gray-100 h-full px-8">
          <div className="text-xl">Featured Games</div>
          <div className="text-xs mt-2">
            Explore fun to play xbox games and find a new favorite
          </div>
        </div>
        <div className="flex w-max pr-8">
          {movrib &&
            movrib.map((x, i) => {
              var stars = 3 + ((x.charCodeAt(0) + x.charCodeAt(1)) % 3);
              return (
                <div className="ribcont rounded my-auto p-2 pb-2" key={i}>
                  <Image
                    className="mx-1 mb-2 py-1 rounded overflow-hidden"
                    w={120}
                    dir="store/movies"
                    src={x}
                  />
                  <div className="capitalize text-xs font-semibold">{x}</div>
                  <div className="flex mt-2 items-center">
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon className="bluestar" fafa="faStar" width={6} />
                    <Icon
                      className={stars > 3 ? "bluestar" : ""}
                      fafa="faStar"
                      width={6}
                    />
                    <Icon
                      className={stars > 4 ? "bluestar" : ""}
                      fafa="faStar"
                      width={6}
                    />
                    <div className="text-xss text-gray-800">
                      {1 + (x.charCodeAt(3) % 5)}k
                    </div>
                  </div>
                  <div className="text-xss mt-8">
                    {x.charCodeAt(4) % 2 ? "Free" : "Owned"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
});

const DownPage = ({ action }) => {
  const [catg, setCatg] = useState("all");
  return (
    <div className="pagecont w-full absolute top-0 box-border p-12">
      <div className="flex">
        <div
          className="catbtn handcr"
          value={catg == "all"}
          onClick={() => setCatg("all")}
        >
          All
        </div>
        <div
          className="catbtn handcr"
          value={catg == "app"}
          onClick={() => setCatg("app")}
        >
          Apps
        </div>
        <div
          className="catbtn handcr"
          value={catg == "game"}
          onClick={() => setCatg("game")}
        >
          Games
        </div>
      </div>
      <div className="appscont mt-8">
        {storedata.map((item, i) => {
          if (item.type != catg && catg != "all") return;

          const stars = geneStar(item);
          var reviews = Math.round(geneStar(item, 1) / 100) / 10;

          return (
            <div
              className="ribcont p-4 pt-8 ltShad prtclk"
              onClick={action}
              data-action="page2"
              data-payload={item.data.url}
              key={i}
            >
              <Image
                className="mx-4 mb-6 rounded"
                w={100}
                h={100}
                src={item.icon}
                err="img/asset/mixdef.jpg"
                ext
              />
              <div className="capitalize text-xs font-semibold">
                {item.name}
              </div>
              <div className="capitalize text-xss text-gray-600">
                {item.type}
              </div>
              <div className="flex items-center">
                <Icon
                  className={stars > 1 ? "bluestar" : ""}
                  fafa="faStar"
                  width={6}
                />
                <Icon
                  className={stars > 1.5 ? "bluestar" : ""}
                  fafa="faStar"
                  width={6}
                />
                <Icon
                  className={stars > 2.5 ? "bluestar" : ""}
                  fafa="faStar"
                  width={6}
                />
                <Icon
                  className={stars > 3.5 ? "bluestar" : ""}
                  fafa="faStar"
                  width={6}
                />
                <Icon
                  className={stars > 4.5 ? "bluestar" : ""}
                  fafa="faStar"
                  width={6}
                />
                <div className="text-xss text-gray-800">{reviews}k</div>
              </div>
              <div className="text-xss mt-8">{"免费"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DetailPage = ({ app }) => {
  const apps = useSelector((state) => state.apps);
  const dispatch = useDispatch();
  const [downState, setDownState] = useState(0);
  const stars = geneStar(app);
  const reviews = geneStar(app, 1);

  const download = () => {
    setDownState(1);
    setTimeout(() => {
      installApp(app);
      setDownState(3);
    }, 2000);
  };

  const refresh = () => window.location.reload();

  const openApp = () => {
    dispatch({ type: apps[app.icon].action, payload: "full" });
  };
  useEffect(() => {
    let installed = JSON.parse(localStorage.getItem("installed"));
    if (installed && installed.some((item) => item.name == app.name)) {
      setDownState(3);
    }
  }, []);

  return (
    <div className="detailpage w-full absolute top-0 flex">
      <div className="detailcont">
        <Image
          className="rounded"
          ext
          w={100}
          h={100}
          src={app.icon}
          err="img/asset/mixdef.jpg"
        />
        <div className="flex flex-col items-center text-center relative">
          <div className="text-2xl font-semibold mt-6">{app.name}</div>
          <div className="text-xs text-blue-800">Community</div>
          {downState == 0 ? (
            <div className="instbtn mt-12 mb-8 handcr" onClick={download}>
              Get
            </div>
          ) : null}
          {downState == 1 ? <div className="downbar mt-12 mb-8"></div> : null}
          {downState == 2 ? (
            <div className="instbtn mt-12 mb-8 handcr" onClick={refresh}>
              Refresh
            </div>
          ) : null}
          {downState == 3 ? (
            <div className="instbtn mt-12 mb-8 handcr" onClick={openApp}>
              Open
            </div>
          ) : null}
          <div className="flex mt-4">
            <div>
              <div className="flex items-center text-sm font-semibold">
                {stars}
                <Icon
                  className="text-orange-600 ml-1"
                  fafa="faStar"
                  width={14}
                />
              </div>
              <span className="text-xss">Average</span>
            </div>
            <div className="w-px bg-gray-300 mx-4"></div>
            <div>
              <div className="text-sm font-semibold">
                {Math.round(reviews / 100) / 10}K
              </div>
              <div className="text-xss mt-px pt-1">Ratings</div>
            </div>
          </div>
          <div className="descnt text-xs relative w-0">{app.data.desc}</div>
        </div>
      </div>
      <div className="growcont flex flex-col">
        <div className="briefcont py-2 pb-3">
          <div className="text-xs font-semibold">Screenshots</div>
          <div className="overflow-x-scroll medScroll mt-4">
            <div className="w-max flex">
              {app.data.gallery &&
                app.data.gallery.map((x, i) => (
                  <Image
                    className="mr-2 rounded"
                    h={250}
                    src={x}
                    ext
                    err="img/asset/mixdef.jpg"
                    key={i}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="briefcont py-2 pb-3">
          <div className="text-xs font-semibold">Description</div>
          <div className="text-xs mt-4">
            <pre>{app.data.desc}</pre>
          </div>
        </div>
        <div className="briefcont py-2 pb-3">
          <div className="text-xs font-semibold">Ratings and reviews</div>
          <div className="flex mt-4 items-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl text-gray-900 font-bold">{stars}</div>
              <div className="text-xss">
                {Math.round(reviews / 100) / 10}K RATINGS
              </div>
            </div>
            <div className="text-xss ml-6">
              {"54321".split("").map((x, i) => {
                return (
                  <div className="flex items-center" key={i}>
                    <div className="h-4">{x}</div>
                    <Icon
                      className="text-orange-500 ml-1"
                      fafa="faStar"
                      width={8}
                    />
                    <div className="w-48 ml-2 bg-orange-200 rounded-full">
                      <div
                        style={{
                          width: emap(Math.abs(stars - x)) * 100 + "%",
                          padding: "3px 0",
                        }}
                        className="rounded-full bg-orange-500"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="briefcont py-2 pb-3">
          <div className="text-xs font-semibold">Features</div>
          <div className="text-xs mt-4">
            <pre>{app.data.feat}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
