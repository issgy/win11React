import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import "./startmenu.scss";
import "./sidepane.scss";
import "./searchpane.scss";

import axios from "axios";

export const DesktopApp = () => {
  const deskApps = useSelector((state) => state.desktop);

  return (
    <div className="desktopCont">
      {deskApps.apps.map((desk, i) => {
        return (
          <div key={i} value={i} className="dskApp">
            <Icon
              className="dskIcon"
              src={desk.icon}
              width={36}
              click={desk.action}
              payload="full"
            />
            <div className="appName">{desk.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export const StartMenu = () => {
  const start = useSelector((state) => {
    var arr = state.startmenu;
    /* 确保 pnApps 数组的长度是6的倍数，如果不是，就补充添加足够的空元素使其长度达到6的倍数。
    为了在绘制开始菜单时，保持布局的整齐和一致性*/
    var length = (6 - (arr.pnApps.length % 6)) % 6;

    for (let j = 0; j < length; j++) {
      arr.pnApps.push({ empty: true });
    }

    for (let i = 0; i < arr.rcApps.length; i++) {
      if (arr.rcApps[i].lastUsed < 0) {
        arr.rcApps[i].lastUsed = "Recently Added";
      } else if (arr.rcApps[i].lastUsed < 10) {
        arr.rcApps[i].lastUsed = "Just Now";
      } else if (arr.rcApps[i].lastUsed < 60) {
        arr.rcApps[i].lastUsed += "m ago";
      } else if (arr.rcApps[i].lastUsed < 360) {
        arr.rcApps[i].lastUsed =
          Math.floor(arr.rcApps[i].lastUsed / 60) + "h ago";
      }
    }

    let tmpApps = [...arr.allApps];
    let allApps = [];
    // 按字母从A-Z排序
    tmpApps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    // 一个包含27个空数组的数组
    for (let i = 0; i < 27; i++) {
      allApps[i] = [];
    }

    for (let i = 0; i < tmpApps.length; i++) {
      // t1为不同app名字的首字母对应的ASCII码
      const t1 = tmpApps[i].name.trim().toUpperCase().charCodeAt(0);
      if (t1 > 64 && t1 < 91) {
        //相同首字母开头的会被push进同一数组
        allApps[t1 - 64].push(tmpApps[i]);
      }
    }

    arr.contApps = allApps;
    return arr;
  });

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [match, setMatch] = useState({});

  const clickDispatch = (event) => {
    var action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };

    if (action.type) {
      dispatch(action);
      if (action.payload === "full" || action.type === "EDGELINK") {
        dispatch({ type: "STARTHID" });
      }
    }

    if (action.type === "STARTALPHA") {
      let target = document.getElementById("char" + action.payload);
      if (target) {
        target.parentNode.parentNode.scrollTop = target.offsetTop;
      } else {
        target = document.getElementById("charA");
        target.parentNode.parentNode.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    if (query.length) {
      for (let i = 0; i < start.allApps.length; i++) {
        if (start.allApps[i].name.toLowerCase().includes(query.toLowerCase())) {
          setMatch(start.allApps[i]);
          console.log(match);
          break;
        }
      }
    }
  }, [query]);

  return (
    <div
      className="startMenu dpShad"
      data-hide={start.hide}
      style={{ "--prefix": "START" }}
    >
      {start.menu ? (
        <>
          <div className="stmenu" data-allapps={start.showAll}>
            <div className="menuUp">
              {/* Pinned apps */}
              <div className="pinnedApps">
                <div className="stAcbar">
                  <div className="gpname">Pinned</div>
                  <div
                    className="gpbtn prtclk"
                    onClick={clickDispatch}
                    data-action="STARTALL"
                  >
                    <div>All apps</div>
                    <Icon fafa="faChevronRight" width={8} />
                  </div>
                </div>
                <div className="pnApps">
                  {start.pnApps.map((app, i) => {
                    return app.empty ? (
                      <div key={i} className="pnApp pnEmpty"></div>
                    ) : (
                      <div key={i} className="pnApp">
                        <Icon
                          className="pnIcon"
                          src={app.icon}
                          width={24}
                          payload={app.payload ? app.payload : "full"}
                          onClick={clickDispatch}
                          click={app.action}
                        />
                        <div className="appName">{app.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Recommended apps */}
              <div className="recApps">
                <div className="stAcbar">
                  <div className="stAcbar">
                    <div className="gpname">Recommended</div>
                    {/* <div className="gpbtn none">
                  <div>More</div>
                  <Icon fafa="faChevronRight" width={8} />
                </div> */}
                  </div>
                </div>
                <div className="reApps">
                  {start.rcApps.slice(0, 6).map((app, i) => {
                    return app.name ? (
                      <div key={i} className="rnApp">
                        <Icon className="pnIcon" src={app.icon} width={22} />
                        <div className="acInfo">
                          <div className="appName">{app.name}</div>
                          <div className="timeUsed">{app.lastUsed}</div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="allCont" data-allapps={start.showAll}>
            <div className="appCont">
              <div className="stAcbar">
                <div className="gpname">All apps</div>
                <div
                  className="gpbtn prtclk"
                  onClick={clickDispatch}
                  data-action="STARTALL"
                >
                  <Icon className="chevLeft" fafa="faChevronLeft" width={8} />
                  <div>Back</div>
                </div>
              </div>
              {/* 按字母排序的所有app */}
              <div className="allApps" data-alpha={start.alpha}>
                {start.contApps.map((contapp, i) => {
                  if (contapp.length === 0) return null;

                  return (
                    <div key={i} value={i}>
                      <div
                        className="allApp prtclk"
                        data-action="STARTALPHA"
                        onClick={clickDispatch}
                        id={`char${
                          i === 0 ? "#" : String.fromCharCode(i + 64)
                        }`}
                      >
                        <div className="ltName">
                          {i === 0 ? "#" : String.fromCharCode(i + 64)}
                        </div>
                      </div>
                      {contapp.map((item, j) => {
                        return (
                          <div
                            key={j}
                            value={j}
                            className="allApp prtclk"
                            onClick={clickDispatch}
                            data-action={item.action}
                            data-payload={item.payload ? item.payload : "full"}
                          >
                            <Icon
                              className="pnIcon"
                              src={item.icon}
                              width={20}
                            />
                            <div className="appName">{item.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              {/* 选择字母的方框 */}
              <div className="alphaBox" data-alpha={start.alpha}>
                <div className="alphaCont">
                  <div className="dullApp allApp">
                    <div className="ltName">&</div>
                  </div>
                  {start.contApps.map((app, i) => {
                    return (
                      <div
                        key={i}
                        value={i}
                        className={
                          app.length === 0 ? "dullApp allApp" : "allApp prtclk"
                        }
                        data-action="STARTALPHA"
                        onClick={app.length === 0 ? null : clickDispatch}
                        data-payload={
                          i === 0 ? "#" : String.fromCharCode(i + 64)
                        }
                      >
                        <div className="ltName">
                          {i === 0 ? "#" : String.fromCharCode(i + 64)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="menuBar">
            <div className="profile">
              <Icon
                src="issgy"
                ui
                rounded
                width={26}
                click="EXTERNAL"
                payload="https://github.com/issgy"
              />
              <div className="usName">issgy</div>
            </div>
            <div className="powerCrtl">
              <Icon src="power" ui width={14} invert />
            </div>
          </div>
        </>
      ) : (
        <div className="searchMenu">
          <div className="searchBar">
            <Icon src="search" ui width={16} />
            <input
              type="text"
              onChange={(event) => {
                setQuery(event.target.value.trim());
              }}
              defaultValue={query}
            />
          </div>
          <div className="flex py-4 px-1 text-xs">
            <div className="opts w-1/2 text-gray-700 flex justify-between">
              <div className="border-b-2">All</div>
              <div>Apps</div>
              <div>Documents</div>
              <div>Web</div>
              <div>More</div>
            </div>
          </div>
          <div className="shResult w-full flex justify-between">
            <div
              className="leftSide flex-col px-1"
              data-width={query.length != 0}
            >
              <div className="text-xss font-semibold mb-4">
                {query.length ? "Best match" : "Top apps"}
              </div>
              {query.length ? (
                <div className="textResult h-16">
                  <div className="smatch flex my-2 bg-gray-100 p-3 rounded">
                    <Icon src={match.icon} width={24} />
                    <div className="matchInfo flex-col px-2">
                      <div className="font-semibold text-xs">{match.name}</div>
                      <div className="text-xss">App</div>
                    </div>
                  </div>
                  <div
                    className="smatch flex my-2 bg-gray-100 p-3 rounded prtclk"
                    onClick={clickDispatch}
                    data-action="EDGELINK"
                    data-payload={query}
                  >
                    <Icon src="search" ui width={20} />
                    <div className="matchInfo flex-col px-2">
                      <div className="font-semibold text-xs">Search online</div>
                      <div className="text-xss">Web</div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="topApps flex w-full justify-between">
                    {start.rcApps.slice(0, 5).map((app, i) => {
                      return (
                        <div
                          key={i}
                          className="topApp pt-4 py-2 bg-gray-100 ltShad"
                        >
                          <Icon
                            src={app.icon}
                            width={24}
                            click={app.action}
                            onClick={clickDispatch}
                            payload={app.payload ? app.payload : "full"}
                          />
                          <div className="text-xs mt-2">{app.name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xss font-semibold mt-8">
                    Quick Searches
                  </div>
                  <div className="quickSearches pl-4 mt-2">
                    {start.qksrch.map((srch, i) => {
                      return (
                        <div
                          className="qksrch flex align-center py-3 handcr prtclk"
                          key={i}
                          data-action="EDGELINK"
                          onClick={clickDispatch}
                          data-payload={srch[2]}
                        >
                          <Icon fafa={srch[0]} reg={srch[1]} />
                          <div className="ml-4 text-xs">{srch[2]}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            {query.length ? (
              <div className="w-2/3 rightSide rounded">
                <Icon className="mt-6" src={match.icon} width={64} />
                <div className="">{match.name}</div>
                <div className="text-xss mt-2">App</div>
                <div className="hline mt-8 mb-3"></div>
                <div
                  className="openlink w-4/5 flex prtclk handcr pt-3"
                  onClick={clickDispatch}
                  data-action={match.action}
                  data-payload="full"
                >
                  <Icon src="link" ui width={16} />
                  <div className="text-xss ml-3">Open</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export const SidePane = () => {
  const paneApps = useSelector((state) => state.sidepane);
  const dispatch = useDispatch();

  const clickDispatch = (event) => {
    const action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };

    dispatch(action);
  };
  return (
    <div
      className="sidePane dpShad"
      data-hide={paneApps.hide}
      style={{ "--prefix": "PANE" }}
    >
      <div className="notifArea">
        <div className="managentf btnText">Manage notifications</div>
        <div className="nonewnotif">No new notifications</div>
      </div>
      <div className="quickSetting">
        <div className="btnText">Collapse</div>
        <div className="quickCont">
          {paneApps.quicks.map((qk, i) => {
            return (
              <div
                key={i}
                className="qkbtn handcr prtclk"
                onClick={clickDispatch}
                data-action="PANEQBTN"
                data-payload={i}
                data-state={qk.state}
              >
                <Icon
                  className="quickIcon"
                  ui={qk.ui}
                  src={qk.src}
                  width={14}
                  invert={qk.state ? true : null}
                />
                <div className="qktext">{qk.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const WidPane = () => {
  const widget = useSelector((state) => state.widpane);
  const dispatch = useDispatch();

  const getRandom = (x = 0) => {
    return `hsl(${Math.floor(Math.random() * 360)}deg 36% 84%)`;
  };

  useEffect(() => {
    // 防止竞态状态
    if (process.env.REACT_APP_DEVELOPEMENT != "development") {
      async function fetchData() {
        if (!widget.updated) {
          var tmpWdgt = await fetchApi(widget);
          console.log("Fetching Api's");
          if (tmpWdgt.updated) {
            dispatch({
              type: "WIDGREST",
              payload: tmpWdgt,
            });
          }
        }
      }

      fetchData();
    }
  });

  return (
    <div
      className="widPaneCont"
      data-hide={widget.hide}
      style={{ "--prefix": "WIDG" }}
    >
      <div className="WidPane">
        <div className="widtop">
          <Icon fafa="faEllipsisH" width={12} />
        </div>
        <div className="widTime">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>
        <div className="widgetCont">
          <div className="topWidgets">
            <div className="weatherCont ltShad">
              <div className="wthtop">WEATHER</div>
              <div className="wthcity">
                <Icon fafa="faMapMarkerAlt" width={8} />
                {widget.data.weather.city}, {widget.data.weather.country}
              </div>
              <div className="wthInfo">
                <div className="wthTemp">
                  <Icon
                    src={`https://www.metaweather.com/static/img/weather/png/64/${widget.data.weather.icon}.png`}
                    ext
                    width={32}
                  />
                  <div className="wthdeg">{widget.data.weather.temp}</div>
                  <div className="wthunit">ºC</div>
                </div>
                <div className="moreWinfo">
                  <div className="wcontext">{widget.data.weather.wstate}</div>
                  <div className="rainProb">
                    <div className="chanceOfRain">
                      <Icon fafa="faTint" width={10} />
                      {widget.data.weather.rain}%
                    </div>
                    <div className="chanceOfRain">
                      <Icon fafa="faWind" width={10} />
                      {widget.data.weather.wind}
                    </div>
                  </div>
                </div>
              </div>
              <div className="weekWthCont">
                {widget.data.weather.days.map((item, i) => {
                  return (
                    <div className="weekDay" key={i}>
                      <div>{i == 0 ? "Today" : item.day}</div>
                      <Icon
                        src={`https://www.metaweather.com/static/img/weather/png/64/${item.icon}.png`}
                        ext
                        width={24}
                      />

                      <div className="tempCont">{item.min}º</div>
                      <div className="tempCont">{item.max}º</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="shortCont">
              <div className="short0 ltShad">
                <div className="shName">MONEY | MARKET</div>
                <div className="shEntry">
                  <div className="stockName">
                    <Icon src="google" ui width={12} />
                    <div className="stName">GOOGL</div>
                  </div>
                  <div className="stockValue">
                    <div>{widget.data.stock[0][0]}</div>
                    <div
                      className="stRes"
                      data-pos={widget.data.stock[0][2] == 1}
                    >
                      {widget.data.stock[0][2] ? "+" : "-"}
                      {widget.data.stock[0][1]}%
                    </div>
                  </div>
                </div>
                <div className="shEntry">
                  <div className="stockName">
                    <Icon src="tesla" ui width={12} />
                    <div className="stName">TSLA</div>
                  </div>
                  <div className="stockValue">
                    <div>{widget.data.stock[1][0]}</div>
                    <div
                      className="stRes"
                      data-pos={widget.data.stock[1][2] == 1}
                    >
                      {widget.data.stock[1][2] ? "+" : "-"}
                      {widget.data.stock[1][1]}%
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="short1 ltShad"
                style={{
                  "--afterBack": `url(${
                    widget.data.event.pages[0].thumbnail &&
                    widget.data.event.pages[0].thumbnail.source
                  })`,
                  backgroundImage: `url(${
                    widget.data.event.pages[0].thumbnail &&
                    widget.data.event.pages[0].thumbnail.source
                  })`,
                }}
              >
                <div className="shName">
                  <div className="flex">
                    <Icon fafa="faLandmark" width={8} />
                    &nbsp;ON THIS DAY
                  </div>
                  <div>{widget.data.date}</div>
                </div>
                <div className="infotextCont">
                  <div className="dayInfo">{widget.data.event.text}</div>
                  <a
                    href={widget.data.event.pages[0].content_urls.desktop.page}
                    target="_blank"
                    className="wikiref"
                    rel="noreferrer"
                  >
                    more on wiki
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="newsCont">
            <div className="topStories ltShad">
              <div className="topNewsText">TOP STORIES</div>
              <div className="topNewsCont">
                {[...widget.data.news].splice(0, 4).map((article, i) => {
                  return (
                    <div className="tpNews" key={i}>
                      <div className="tpSource">{article.source.name}</div>
                      <div className="tpArticle">{article.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="allNewsCont">
              {[...widget.data.news]
                .splice(4, widget.data.news.length)
                .map((article, i) => {
                  return (
                    <div
                      className="articleCont ltShad"
                      key={i}
                      style={{
                        "--backgrad": getRandom(2),
                        backgroundImage: `url(${article.urlToImage})`,
                      }}
                    >
                      <div className="tpNews">
                        <div className="tpSource">{article.source.name}</div>
                        <div className="tpArticle">{article.title}</div>
                        {i % 5 == 4 ? (
                          <div className="tpdesc">{article.content}</div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchApi = async (widget) => {
  var tmpWdgt = { ...widget };
  var date = new Date();

  await axios
    .get(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${date.getMonth()}/${date.getDay()}`
    )
    .then((res) => res.data)
    .then((data) => {
      console.log("Fetched");
      var event = data.events[Math.floor(Math.random() * data.events.length)];
      date.setYear(event.year);

      tmpWdgt.data.date = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      tmpWdgt.data.event = event;
    })
    .catch((error) => {
      console.log("Fetch failed");
    });

  console.log("fetching NEWS");
  await axios
    .get(`https://saurav.tech/NewsAPI/top-headlines/category/general/in.json`)
    .then((res) => res.data)
    .then((data) => {
      console.log("NEWS Fetched");
      var newsList = [];
      for (var i = 0; i < data.totalResults; i++) {
        var item = {
          ...data.articles[i],
        };
        item.title = item.title
          .split("-")
          .reverse()
          .splice(1)
          .reverse()
          .join("-")
          .trim();
        newsList.push(item);
      }

      tmpWdgt.data.news = newsList;
    })
    .catch((error) => {
      console.log("Fetch failed");
    });

  tmpWdgt.updated = true;
  return tmpWdgt;
};
