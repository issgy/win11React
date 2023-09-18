import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, ToolBar, Image } from "../../utils/general";
import dirs from "./dir.json";
import "./tabs.scss";
import "./wnapp.css";

// edge界面
export const EdgeMenu = () => {
  const wnapp = useSelector((state) => state.apps.edge);
  const [url, setUrl] = useState("http://bing.com");
  const [hist, setHist] = useState(["https://bing.com", "https://bing.com"]);
  const dispatch = useDispatch();

  // const clickDispatch = (event) => {
  //   var action = {
  //     type: event.target.dataset.action,
  //     payload: event.target.dataset.payload,
  //   };
  //   if (action.type) dispatch(action);
  // };

  const isValidURL = (string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  const action = (e) => {
    var iframe = document.getElementById("isite");
    var x = e.target && e.target.dataset.payload;
    console.log(x);
    if (iframe && x == 0) {
      iframe.src = iframe.src;
    } else if (iframe && x == 1) {
      setHist([url, "https://www.bing.com"]);
      setUrl("https://www.bing.com");
    } else if (iframe && x == 2) {
      setHist([url, "https://www.google.com/webhp?igu=1"]);
      setUrl("https://www.google.com/webhp?igu=1");
    } else if (iframe && x == 3) {
      if (e.key === "Enter") {
        var qry = e.target.value;

        if (isValidURL(qry)) {
          if (!qry.startsWith("http")) {
            qry = "https://" + qry;
          }
        } else {
          qry = "https://www.bing.com/search?q=" + qry;
        }

        e.target.value = qry;

        setHist([url, qry]);
        setUrl(qry);
      }
    } else if (x == 4) {
      setUrl(hist[0]);
    } else if (x == 5) {
      setUrl(hist[1]);
    }
  };

  useEffect(() => {
    if (wnapp.url) {
      setUrl(wnapp.url);
      dispatch({ type: "EDGELINK" });
    }
  }, [wnapp.url]);

  return (
    <div
      className="edgeBrowser floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
    >
      {/* tab栏 */}
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        name="Microsoft Edge"
        float
      />
      <div className="windowScreen flex flex-col">
        <div className="overTool flex">
          <Icon src={wnapp.icon} width={14} margin="0 6px" />
          <div className="btab bg-gray-100">
            <div>New Tab</div>
            <Icon
              fafa="faTimes"
              click={wnapp.action}
              payload="close"
              width={10}
            />
          </div>
        </div>
        <div className="restWindow flex-grow flex flex-col">
          {/* 地址栏 */}
          <div className="addressBar w-full bg-gray-100 h-10 flex items-center">
            <Icon
              src="left"
              onClick={action}
              payload={4}
              width={14}
              ui
              margin="0 8px"
            />
            <Icon
              src="right"
              onClick={action}
              payload={5}
              width={14}
              ui
              margin="0 8px"
            />
            <Icon
              fafa="faRedo"
              onClick={action}
              payload={0}
              width={14}
              color="#343434"
              margin="0 8px"
            />
            <Icon
              fafa="faHome"
              onClick={action}
              payload={1}
              width={18}
              color="#343434"
              margin="0 16px"
            />
            <div className="addCont relative">
              <input
                className="ltShad w-full bg-gray-0 h-6 px-4 text-gray-900"
                onKeyDown={action}
                data-payload={3}
                defaultValue={url}
                placeholder="Type url or a query to search"
                type="text"
              />
              <Icon
                className="absolute top-0 right-0 z-1 handcr"
                src="google"
                ui
                onClick={action}
                payload={2}
                width={16}
                margin="7px 10px"
              />
            </div>
          </div>
          {/* 内容框 */}
          <div className="siteFrame flex-grow overflow-hidden">
            <iframe
              title="edge"
              src={url}
              id="isite"
              className="w-full h-full"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

// store界面
export const MicroStore = () => {
  const wnapp = useSelector((state) => state.apps.store);
  const ribbon = useSelector((state) => state.globals.ribbon);
  const apprib = useSelector((state) => state.globals.apprib);
  const gamerib = useSelector((state) => state.globals.gamerib);
  const movrib = useSelector((state) => state.globals.movrib);
  const [tab, setTab] = useState("sthome");

  const action = (e) => {
    const x = e.target && e.target.dataset.action;
    if (x) {
      let target = document.getElementById(x);
      if (target) {
        setTab(x);
        target.parentNode.parentNode.scrollTop = target.offsetTop;
      }
    }
  };

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
    >
      <ToolBar app={wnapp.action} icon={wnapp.icon} name="Microsoft Store" />
      <div className="windowScreen flex">
        {/* 左侧栏的四个图标 */}
        <div className="storeNav h-full w-16 flex flex-col">
          <Icon
            fafa="faHome"
            onClick={action}
            click="sthome"
            width={20}
            payload={tab == "sthome"}
          />
          <Icon
            fafa="faThLarge"
            onClick={action}
            click="apprib"
            width={18}
            payload={tab == "apprib"}
          />
          <Icon
            fafa="faGamepad"
            onClick={action}
            click="gamerib"
            width={20}
            payload={tab == "gamerib"}
          />
          <Icon
            fafa="faFilm"
            onClick={action}
            click="movrib"
            width={20}
            payload={tab == "movrib"}
          />
        </div>
        {/* 右侧对应的内容 */}
        <div className="restWindow msfull thinScroll">
          <div className="storeSection w-full absolute top-0">
            <Image
              id="sthome"
              className="frontPage w-full"
              src="store/lucacover"
            />
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
            {/* app */}
            <div
              id="apprib"
              className="frontCont amzApps my-8 py-20 w-auto mx-8 flex justify-between noscroll overflow-x-scroll overflow-y-hidden"
            >
              <div className="flex w-64 flex-col text-gray-100 h-full px-8">
                <div className="text-xl">Windows Apps</div>
                <div className="text-xs mt-2">
                  Take your windows experience to new heights with these
                  must-have apps
                </div>
              </div>
              <div className="flex w-max pr-8">
                {apprib &&
                  apprib.map((x, i) => {
                    const stars = 3 + ((x.charCodeAt(0) + x.charCodeAt(1)) % 3);
                    return (
                      <div className="ribcont rounded my-auto p-2 pb-2" key={i}>
                        <Image
                          className="mx-1 mb-4 rounded overflow-hidden"
                          w={120}
                          dir="store/apps"
                          src={x}
                        />
                        <div className="capitalize text-xs font-semibold">
                          {x}
                        </div>
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
                          className="mx-1 mb-4 rounded overflow-hidden"
                          w={120}
                          dir="store/games"
                          src={x}
                        />
                        <div className="capitalize text-xs font-semibold">
                          {x}
                        </div>
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
                          className="mx-1 mb-4 rounded overflow-hidden"
                          w={120}
                          dir="store/movies"
                          src={x}
                        />
                        <div className="capitalize text-xs font-semibold">
                          {x}
                        </div>
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
        </div>
      </div>
    </div>
  );
};

// terminal界面
export const WnTerminal = () => {
  const dispatch = useDispatch();
  const tmapp = useSelector((state) => state.apps.terminal);
  const [tmtitle, setTmtitle] = useState("Windows Terminal");
  const [stack, setStack] = useState([
    "Microsoft Windows [版本 10.0.22000.51]",
    "(c) Microsoft Corporation。 保留所有权利。",
    "",
  ]);
  const [pwd, setPwd] = useState("C:\\Users\\issgy");
  const [lastCmd, setLsc] = useState(0);

  const dirFolders = (isFile = "") => {
    let tdir = { ...dirs };
    const curr = pwd === "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");
    if (pwd !== "C:\\") {
      for (let i = 0; i < curr.length; i++) {
        tdir = tdir[curr[i]];
      }
    }
    if (isFile === "") {
      return Object.keys(tdir);
    } else {
      return tdir[isFile] || {};
    }
  };

  const cmdTool = (cmd) => {
    let tmpStack = [...stack];
    tmpStack.push(pwd + ">" + cmd);

    const cmdArr = cmd.split(" ");
    const type = cmdArr[0].trim();
    // 截取命令后面的内容
    const arg = (cmdArr.splice(1, cmdArr.length).join(" ") || "").trim();

    if (type === "echo") {
      if (arg.length) {
        tmpStack.push(arg);
      } else {
        tmpStack.push("ECHO is on.");
      }
    } else if (type === "cd") {
      if (arg.length) {
        let errp = true;
        const curr = pwd === "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");

        if (arg === ".") {
          errp = false;
        } else if (arg === "..") {
          errp = false;
          curr.pop();
          setPwd("C:\\" + curr.join("\\"));
        } else if (!arg.includes(".")) {
          const tdir = dirFolders();
          for (let i = 0; i < tdir.length; i++) {
            if (arg == tdir[i] && errp) {
              curr.push(tdir[i]);
              errp = false;
              setPwd("C:\\" + curr.join("\\"));
              break;
            }
          }
        } else {
          errp = false;
          tmpStack.push("The directory name is invalid.");
        }
        if (errp) {
          tmpStack.push("The system cannot find the path specified.");
        }
      } else {
        tmpStack.push(pwd);
      }
    } else if (type === "dir") {
      tmpStack.push(" Directory of " + pwd);
      tmpStack.push("");
      tmpStack.push("<DIR>    .");
      tmpStack.push("<DIR>    ..");
    } else if (type == "cls") {
      tmpStack = [];
    } else if (type == "type") {
      var errp = true;

      if (arg.includes(".")) {
        var tdir = dirFolders();

        for (var i = 0; i < tdir.length; i++) {
          if (arg == tdir[i] && errp) {
            errp = false;
            var file = dirFolders(tdir[i]);
            var content = file.content || "";
            content = content.split("\n");
            for (var i = 0; i < content.length; i++) {
              tmpStack.push(content[i]);
            }
            break;
          }
        }
      }

      if (errp) {
        tmpStack.push("The system cannot find the file specified.");
      }
    } else if (type == "start") {
      dispatch({ type: "EDGELINK", payload: arg });
    } else if (type == "date") {
      tmpStack.push("The current date is: " + new Date().toLocaleDateString());
    } else if (type == "time") {
      tmpStack.push(
        "The current time is: " +
          new Date()
            .toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replaceAll(":", ".") +
          "." +
          Math.floor(Math.random() * 100)
      );
    } else if (type == "exit") {
      tmpStack = [
        "Microsoft Windows [Version 10.0.22000.51]",
        "(c) Microsoft Corporation. All rights reserved.",
        "",
      ];
      dispatch({ type: tmapp.action, payload: "close" });
    } else if (type == "title") {
      setTmtitle(arg.length ? arg : "Windows Terminal");
    } else if (type == "hostname") {
      tmpStack.push("issgy");
    } else if (type == "ver") {
      tmpStack.push("Microsoft Windows [Version 10.0.22000.51]");
    } else if (type == "systeminfo") {
      var dvInfo = [
        "Host Name:                 issgy",
        "OS Name:                   Microsoft Windows 11 Home Single Language",
        "OS Version:                10.0.22000 N/A Build 22000.51",
        "OS Manufacturer:           Microsoft Corporation",
        "OS Configuration:          Standalone Workstation",
        "OS Build Type:             Multiprocessor Free",
        "Registered Owner:          issgy",
        "Registered Organization:   N/A",
        "Product ID:                7H1S1-5AP1R-473DV-3R5I0N",
      ];

      for (var i = 0; i < dvInfo.length; i++) {
        tmpStack.push(dvInfo[i]);
      }
    } else if (type == "help") {
      var helpArr = [
        "CD             Displays the name of or changes the current directory.",
        "CLS            Clears the screen.",
        "DATE           Displays or sets the date.",
        "DIR            Displays a list of files and subdirectories in a directory.",
        "ECHO           Displays messages, or turns command echoing on or off.",
        "EXIT           Quits the CMD.EXE program (command interpreter).",
        "HELP           Provides Help information for Windows commands.",
        "START          Starts a separate window to run a specified program or command.",
        "SYSTEMINFO     Displays machine specific properties and configuration.",
        "TIME           Displays or sets the system time.",
        "TITLE          Sets the window title for a CMD.EXE session.",
        "TYPE           Displays the contents of a text file.",
        "VER            Displays the Windows version.",
      ];

      for (var i = 0; i < helpArr.length; i++) {
        tmpStack.push(helpArr[i]);
      }
    } else {
      tmpStack.push(
        `'${type}' is not recognized as an internal or external command,`
      );
      tmpStack.push("operable program or batch file.");
      tmpStack.push("");
      tmpStack.push('Type "help" for available commands');
    }

    tmpStack.push("");
    setStack(tmpStack);
  };

  const action = (event) => {
    const cmdline = document.getElementById("curcmd");
    const action = event.target.dataset.action;

    if (cmdline) {
      if (action === "hover") {
        const crline = cmdline.parentNode;
        const cmdcont = document.getElementById("cmdcont");
        if (crline && cmdcont) {
          cmdcont.scrollTop = crline.offsetTop;
        }
        cmdline.focus();
      } else if (action === "enter") {
        //按任意键 action都为enter
        if (event.key === "Enter") {
          //回车键
          console.log("Enter");
          event.preventDefault();
          // ......
          const tmpStack = [...stack];
          const cmd = event.target.innerText.trim();
          event.target.innerText = "";
          setLsc(tmpStack.length + 1);
          cmdTool(cmd);
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          //向上或向下键
          console.log("ArrowUp");
          let i = lastCmd + [1, -1][Number(event.key == "ArrowUp")];

          while (i >= 0 && i < stack.length) {
            if (stack[i].startsWith("C:\\") && stack[i].includes(">")) {
              var tp = stack[i].split(">");
              event.target.innerText = tp[1] || "";
              setLsc(i);
              break;
            }

            i += [1, -1][Number(event.key == "ArrowUp")];
          }

          cmdline.focus();
        } else if (event.key === "Tab") {
          console.log("Tab");
          event.preventDefault();
          const cmd = event.target.innerText.trim();
          const cmdArr = cmd.split(" ");
          const arg = cmdArr.splice(1, cmdArr.length).join(" ") || "";

          const tdir = dirFolders();
          for (let i = 0; i < tdir.length; i++) {
            if (
              arg.length &&
              tdir[i].toLowerCase().startsWith(arg.toLowerCase())
            ) {
              event.target.innerText = cmdArr[0] + " " + tdir[i];
              break;
            }
          }
        }
      }
      cmdline.focus();
    }
  };

  return (
    <div
      className="wnterm floatTab apShad"
      data-size={tmapp.size}
      data-max={tmapp.max}
      style={{
        ...(tmapp.size == "cstm" ? tmapp.dim : null),
        zIndex: tmapp.z,
      }}
      data-hide={tmapp.hide}
    >
      <ToolBar
        app={tmapp.action}
        icon={tmapp.icon}
        name={tmtitle}
        invert
        bg="#060606"
      />
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow h-full flex-grow text-gray-100">
          <div
            className="cmdcont w-full box-border overflow-y-scroll thinScroll prtclk"
            id="cmdcont"
            onMouseOver={action}
            onClick={action}
            data-action="hover"
          >
            <div className="w-full h-max pb-12">
              {stack.map((x, i) => {
                return (
                  <div key={i} className="cmdLine">
                    {x}
                  </div>
                );
              })}
              <div className="cmdLine actmd">
                {pwd}
                <div
                  className="ipcmd"
                  id="curcmd"
                  contentEditable
                  data-action="enter"
                  onKeyDown={action}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
