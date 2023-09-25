import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar, Icon, Image } from "../../../utils/general";

import ReactPlayer from "react-player";

import data from "./assets/songs.json";
import jiosaavn from "./assets/jiosaavn";

const { round, max, floor, ceil } = Math;

export const Spotify = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.spotify);
  const [tab, setTab] = useState(5); //0-9代表左侧菜单从Home到English的切换

  const libr = [
    "Made For You",
    "Recently Played",
    "Favorite Songs",
    "Albums",
    "Artist",
  ];
  const plays = ["Hip Hop", "Hindi", "English"];

  const [playd, setPlay] = useState({}); // {type: "album",tdata: "23601363"}
  const [queue, setQueue] = useState([{}]); //播放的歌曲队列，默认为空
  const [curr, setCurr] = useState(0); //当前播放的歌曲序列
  const [shfle, setShfle] = useState(0); //当前播放模式（随机）
  const [mxqueque, setMxq] = useState([]);
  const [paused, setPause] = useState(true); //是否暂停
  const [repeat, setRepeat] = useState(0); //是否重复
  const [prog, setProg] = useState(0);
  const [perProg, setPerProg] = useState(0);
  const [volume, setVolume] = useState(50);

  const action = (e) => {
    const act = e.target.dataset.action,
      payload = e.target.dataset.payload;

    if (act === "discv") {
      setTab(payload);
    } else if (act === "shuffle") {
      const n = queue.length;
      if (shfle) setShfle(0);
      else {
        setShfle(1);
        setMxq(jiosaavn.mixQueue(n));
      }
    } else if (act === "prev") {
      setPause(false);
    }
  };

  const handleProg = (e) => {
    setProg(floor(e.playedSeconds));
    setPerProg(e.played);
    console.log(prog);
  };

  const handleFinish = () => {
    console.log(paused);
    setPause(true);
    if (repeat == 1) {
      action({ target: { dataset: { action: "next" } } });
    }
  };

  const handleChange = (e) => {
    console.log("change");
  };

  useEffect(() => {
    if (queue[curr].name == null) {
      jiosaavn
        .getDefault()
        .then((data) => setQueue(data))
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div
      className="spotify floatTab dpShad"
      id={wnapp.icon + "APP"}
      data-hide={wnapp.hide}
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size === "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        name="Spotify Music"
        invert
      />
      <div className="windowScreen flex flex-col">
        <div className="restWindow flex-grow flex">
          {/* 左侧菜单栏 */}
          <div className="w-50 spnav">
            <div className="mx-6">
              <div className="mt-16"></div>
              <div
                className="snav my-4 handcr font-semibold"
                data-act={tab == 0}
                onClick={action}
                data-action="discv"
                data-payload="0"
              >
                <Icon icon="home" width={24} />
                <div className="ml-4 text-sm">Home</div>
              </div>
              <div
                className="snav my-4 handcr font-semibold"
                data-act={tab == 1}
                onClick={action}
                data-action="discv"
                data-payload="1"
              >
                <Icon fafa="faCompactDisc" width={24} />
                <div className="ml-4 text-sm">Browse</div>
              </div>
              <div className="text-gray-500 text-xs font-semibold tracking-widest mt-10 mb-4">
                YOUR LIBRARY
              </div>
              <div className="w-full h-max">
                {libr.map((lib, i) => (
                  <div
                    className="snav mb-4 handcr text-sm font-semibold"
                    key={i}
                    data-act={tab == i + 2}
                    onClick={action}
                    data-action="discv"
                    data-payload={i + 2}
                  >
                    {lib}
                  </div>
                ))}
                <div className="text-gray-500 font-semibold text-xs tracking-widest mt-12 mb-4">
                  PLAYLISTS
                </div>
                {plays.map((play, i) => (
                  <div
                    className="snav mb-4 handcr text-sm font-semibold"
                    key={i}
                    data-act={tab == i + 2 + libr.length}
                    onClick={action}
                    data-action="discv"
                    data-payload={i + 2 + libr.length}
                  >
                    {play}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 点击菜单栏对应的右侧展示界面 */}
          <div className="spscreen thinScroll lightScroll" id="sphome">
            <div className="h-max relative">
              <div className="absolute w-full pb-8">
                {tab == 0 ? <Home tab={tab} action={action} /> : null}
                {tab > 1 && tab < 2 + libr.length ? (
                  <Home tab={tab} action={action} />
                ) : null}
                {tab > 6 && tab < 10 ? <Playlist /> : null}
                {tab == 39 ? <Playlist {...playd} /> : null}
              </div>
            </div>
          </div>
          {/* 下方的播放栏 */}
          <div className="splayer">
            <div className="snfo flex items-center">
              {queue[curr].albumArt ? (
                <Image src={queue[curr].albumArt} w={56} ext />
              ) : (
                <Icon src="./img/asset/album.png" ext width={56} />
              )}
              <div className="ml-3">
                <div className="text-sm mb-2 text-gray-100 font-semibold">
                  {queue[curr].name || "Album"}
                </div>
                <div className="text-xss tracking-wider text-gray-400">
                  {queue[curr].artist || "Artist"}
                </div>
              </div>
            </div>
            <div className="songAct" data-prtclk={!queue[curr].name}>
              <div className="flex items-center">
                <Icon
                  className="cticon sficon"
                  icon="shuffle"
                  onClick={action}
                  click="shuffle"
                  payload={(shfle != 0) | 0}
                />
                <Icon
                  className="cticon"
                  icon="previous"
                  onClick={action}
                  click="prev"
                />
                <div className="cborder handcr">
                  {paused ? (
                    <Icon
                      className="play"
                      icon="play"
                      onClick={action}
                      click="play"
                      width={18}
                      height={28}
                      invert
                    />
                  ) : (
                    <Icon
                      className="pause"
                      icon="pause"
                      onClick={action}
                      click="pause"
                      width={18}
                      height={28}
                      invert
                    />
                  )}
                </div>
                <Icon
                  className="cticon"
                  icon="next"
                  onClick={action}
                  click="next"
                />
                <Icon
                  className="cticon rpicon"
                  icon="repeat"
                  onClick={action}
                  click="repeat"
                  payload={repeat}
                />
              </div>
              <div className="w-full flex items-center mt-2 justify-center">
                <div className="progTime">{jiosaavn.formatTime(prog)}</div>
                <div className="sdivider">
                  <ReactPlayer
                    className="playbody"
                    url={queue[curr].src}
                    config={{
                      file: {
                        forceAudio: true,
                        attributes: { id: "audiosrc" },
                      },
                    }}
                    loop={repeat == 2}
                    playing={!paused}
                    volume={volume / 100}
                    onProgress={handleProg}
                    onEnded={handleFinish}
                  />
                  <input
                    className="cleanInput"
                    type="range"
                    min={0}
                    max={queue[curr].duration}
                    value={prog}
                    onChange={handleChange}
                  />
                  <div
                    className="songprog"
                    style={{ width: perProg * 100 + "%" }}
                  ></div>
                </div>
                <div className="progTime">
                  {jiosaavn.formatTime(queue[curr].duration)}
                </div>
              </div>
            </div>
            <div className="sctrl flex items-center justify-between">
              <div
                className="prtclk handcr mr-6"
                onClick={action}
                data-action="discv"
                data-payload="10"
              >
                <Icon
                  className="sficon"
                  fafa="faListUl"
                  width={14}
                  payload={tab == 10 ? 1 : 0}
                />
              </div>
              <div className="rctrl flex items-center">
                <Icon
                  className="sficon mr-2"
                  width={16}
                  fafa={
                    ["faVolumeMute", "faVolumeDown", "faVolumeUp"][
                      ceil(volume / 50)
                    ]
                  }
                  onClick={action}
                  click="mute"
                ></Icon>
                <div className="relative flex items-center">
                  <input
                    className="cleanInput volInp"
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={action}
                    data-action="volume"
                  />
                  <div
                    className="songprog"
                    style={{ width: floor(0.8 * volume) }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = ({ tab, action }) => {
  const randomHue = (j) => {
    const date = new Date();
    let val = date.getHours();
    val = val ** (date.getDay() + 2);

    return floor(((val * (j + 2)) % 350) / 1.6);
  };

  const scaction = (e) => {
    const txt = e.target.innerText;
    const toScroll = e.target.parentElement.parentElement;
    const val = round(toScroll.scrollLeft / 224);
    if (txt === "<") {
      toScroll.scrollLeft = max(0, 224 * (val - 4));
    } else {
      const wd = getComputedStyle(toScroll)
        .getPropertyValue("width")
        .replace("px", "");
      toScroll.scrollLeft = 224 * (val + 4) + (224 - (wd % 224));
    }
  };

  useEffect(() => {
    var prt = document.getElementById("sphome");
    if (prt) {
      prt.scrollTop = (80 + max(0, tab - 2) * 360) * (tab != 0);
    }
  });

  return (
    <div className="spHome mt-12">
      {data.home.map((bar, i) => (
        <div className="sitem w-full mb-8" id={"tab" + (i + 2)} key={i}>
          <div className="scbCont" data-var={!bar.desc}>
            <div className="mx-2" onClick={scaction}>
              {"<"}
            </div>
            <div className="mx-2" onClick={scaction}>
              {">"}
            </div>
          </div>
          <div className="text-gray-100 font-bold">{bar.name}</div>
          <div className="text-xs font-semibold tracking-wider">{bar.desc}</div>
          <div className="w-full h-px mt-2"></div>
          <div className="w-full pt-1 overflow-x-scroll thinScroll lightScroll -ml-3">
            <div className="w-max flex">
              {bar.cards.map((card, j) => (
                <div
                  className={
                    "scard pt-3 px-3" +
                    (card.type == "artist" ? " text-center" : "")
                  }
                  style={{
                    "--rot1": randomHue(j) + "deg",
                  }}
                  key={j}
                >
                  <Image
                    className={
                      (card.type == "mix" ? "coverImg" : " ") +
                      (card.type == "artist" ? "artImg" : " ")
                    }
                    src={card.img}
                    ext
                    w={200}
                    err="/img/asset/mixdef.jpg"
                    onClick={action}
                    click={card.type}
                    payload={JSON.stringify(card.data)}
                  />
                  <div className="sover p-4 nopt">
                    {card.type == "mix" ? card.name : null}
                  </div>
                  {card.type == "song" ? (
                    <div className="fplay">
                      <div className="tria"></div>
                    </div>
                  ) : null}
                  <div className="mt-4 mb-1 text-gray-100 text-sm font-semibold">
                    {card.name}
                  </div>
                  <div className="my-1 leading-5 text-xs font-semibold tracking-wider">
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Playlist = ({ type, tdata }) => {
  const [data, setData] = useState({ fake: true });
  const [loaded, setLoaded] = useState(false);
  const [ptype, setPtype] = useState(true);
  const [totTime, setTotime] = useState(0);
  const src =
    "https://i.scdn.co/image/ab67706c0000bebb5b59fe8de92d65b0becde7ef";
  const abart =
    "https://c.saavncdn.com/432/Raincoat-Hindi-2004-20210125130707-150x150.jpg";

  useEffect(() => {
    if (data.fake) {
      var prt = document.getElementById("sphome");
      if (prt) {
        prt.scrollTop = 0;
      }

      if (type == "album") {
        setPtype(false);
        jiosaavn
          .getAlbum(typeof tdata == "string" ? tdata : "")
          .then((res) => {
            setData(res);
            var tmptot = 0;
            for (var i = 0; i < res.songs.length; i++) {
              tmptot += parseInt(res.songs[i].song_duration);
            }

            setTotime(tmptot);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [data]);

  return (
    <div className="relative">
      <div className="playinfo">
        <Image
          className="dpShad"
          src={data.album_image || "/img/asset/mixdef.jpg"}
          ext
          w={232}
          h={232}
        />
        <div className="playdet ml-6 text-gray-100 flex flex-col justify-end">
          <div className="text-xs font-bold uppercase">{type}</div>
          <div className="playtitle">{data.album_name}</div>
          <div className="text-sm font-semibold">
            {(data.album_artist && data.album_artist.split(", ").join(" • ")) ||
              ""}{" "}
            <span className="text-gray-400 text-xs">
              • {data.year || "2020"} •{" "}
              {(data.songs && data.songs.length) || "0"} songs,{" "}
              {jiosaavn.formatPeriod(totTime)}
            </span>
          </div>
          <div className="playbtn">PLAY</div>
        </div>
      </div>
      <div className="infph"></div>
      <div className="alsongs">
        <div className="srow">
          <div className="font-bold text-right">#</div>
          <div className="scol1 text-xs">TITLE</div>
          <div className="text-xs">{ptype ? "ALBUM" : null}</div>
          <div className="text-xs">{ptype ? "DATE ADDED" : null}</div>
          <div className="flex justify-end">
            <Icon fafa="faClock" width={16} reg />
          </div>
        </div>
        <div className="hr"></div>
        {data.songs &&
          data.songs.map((song, i) => (
            <div className="srow handcr">
              <div className="sidx">{i + 1}</div>
              <div className="scol1">
                {ptype ? (
                  <Image
                    src={song.song_image}
                    w={40}
                    h={40}
                    ext
                    err="/img/asset/mixdef.jpg"
                  />
                ) : null}
                <div className="scolsong flex flex-col" data-play={ptype}>
                  <div className="font-semibold capitalize text-gray-100">
                    {song.song_name}
                  </div>
                  <div className="font-semibold capitalize text-xs mt-1">
                    {song.song_artist}
                  </div>
                </div>
              </div>
              <div className="scol2 font-semibold">
                {ptype ? "Raincoat" : null}
              </div>
              <div className="scol3 font-semibold">
                {ptype ? "Apr 14, 2021" : null}
              </div>
              <div className="font-semibold flex justify-end">
                {jiosaavn.formatTime(song.song_duration)}
              </div>
            </div>
          ))}
      </div>
      {type != "play" ? (
        <div className="text-xss font-semibold acol mt-6">
          {data.songs && data.songs[0] && data.songs[0].copyright}
        </div>
      ) : null}
    </div>
  );
};
