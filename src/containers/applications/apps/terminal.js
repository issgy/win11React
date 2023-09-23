import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

import dirs from "./dir.json";

// terminal界面
export const WnTerminal = () => {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);
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
    const type = cmdArr[0].trim().toLowerCase();
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

  useEffect(() => {
    if (tmapp.dir && tmapp.dir != pwd) {
      setPwd(tmapp.dir);
    }
  });

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
      id={tmapp.icon + "App"}
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
