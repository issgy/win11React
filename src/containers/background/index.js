import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./back.scss";
import { Image, Icon } from "../../utils/general";
import Battery from "../../components/shared/battery";

// 桌面背景图片
export const Background = () => {
  const wallpaper = useSelector((state) => state.wallpaper);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(/img/wallpaper/${wallpaper.src})`,
      }}
    ></div>
  );
};

// 加载界面
export const BootScreen = (props) => {
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();
  const [blackout, setBlackout] = useState(false); //是否黑屏

  useEffect(() => {
    if (props.dir < 0) {
      console.log("转圈3s");
      setTimeout(() => {
        setBlackout(true);
      }, 3000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        //blackout值变为true时转圈动画及图像被隐藏，因此呈现黑屏
        console.log("黑屏2s，如果是shutdown则一直黑屏");
        if (wall.act == "restart") {
          setTimeout(() => {
            //2秒后取消黑屏，并且转圈4s后去掉BootScreen组件
            setBlackout(false);
            console.log("转圈4s");
            setTimeout(() => {
              //4s后去掉组件，在此期间组件内有转圈动画
              dispatch({ type: "WALLBOOTED" });
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout]);

  return (
    <div className="bootscreen">
      <div className={blackout ? "hidden" : ""}>
        <Image src="asset/bootlogo" w={180} />
        <div className="mt-48" id="loader">
          {/* <div className="circledots">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div> */}
          <img src="img\asset\loader.gif" alt="loading" width={100} />
        </div>
      </div>
    </div>
  );
};

// 锁屏界面
export const LockScreen = (props) => {
  const dispatch = useDispatch();
  const [lock, setLock] = useState(false);
  const [unlocked, setUnlock] = useState(false);
  const [password, setPassword] = useState("");
  const [passType, setPassType] = useState(1); //密码类型，1代表password，0代表PIN
  const [forgot, setForgot] = useState(false);

  const action = (e) => {
    e.stopPropagation();
    const action = e.target.dataset.action;

    if (action === "splash") setLock(true);
    else if (action === "inpass") {
      let value = e.target.value;
      if (!passType) {
        value = value.substring(0, 6);
        value = !Number(value) ? "" : value;
      }
      setPassword(value);
    } else if (action === "forgot") setForgot(true);
    else if (action === "pinlock") {
      setPassType(0);
      setPassword("");
      setForgot(false);
    } else if (action === "passkey") {
      setPassType(1);
      setPassword("");
      setForgot(false);
    }
  };

  const proceed = () => {
    setUnlock(true);
    setTimeout(() => {
      dispatch({ type: "WALLUNLOCK" });
    }, 1000);
  };
  const debounce = (func, timer) => {};

  return (
    <div
      className={"lockscreen " + (props.dir == -1 ? "slowfadein" : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url(${`/img/wallpaper/lock.jpg`})`,
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className="splashScreen mt-40" data-faded={lock}>
        <div className="text-6xl font-semibold text-gray-100">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {new Date().toLocaleDateString("zh-CN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="fadeinScreen" data-faded={!lock} data-unlock={unlocked}>
        <Image
          className="rounded-full overflow-hidden"
          src="/img/asset/issgy.png"
          w={200}
          ext
        />
        <div className="mt-2 text-xl font-medium text-gray-200">issgy</div>
        <div className="flex items-center mt-6 signInBtn" onClick={proceed}>
          Sign in
        </div>
        {/* <div className="flex items-center mt-6">
          <input
            type={passType ? "text" : "password"}
            value={password}
            onChange={action}
            data-action="inpass"
            placeholder={passType ? "密码" : "PIN"}
          />
          <Icon
            className="-ml-6 handcr"
            fafa="faArrowRight"
            width={14}
            color="rgba(170,170,170,0.6)"
            onClick={proceed}
          />
        </div>
        <div
          className="text-xs text-gray-400 mt-4 handcr"
          onClick={action}
          data-action="forgot"
        >
          {!forgot
            ? `我忘记了我的 ${passType ? "password" : "PIN"}`
            : `这也能忘？${"\uD83D\uDE05"}`}
        </div>
        <div className="text-xs text-gray-400 mt-6">登录选项</div>
        <div className="lockOpt flex">
          <Icon
            src="pinlock"
            onClick={action}
            ui
            width={36}
            click="pinlock"
            payload={passType === 0}
          />
          <Icon
            src="passkey"
            onClick={action}
            ui
            width={36}
            click="passkey"
            payload={passType === 1}
          />
        </div> */}
      </div>
      <div className="bottomInfo flex">
        <Icon className="mx-2" src="wifi" ui width={14} invert />
        <Battery />
      </div>
    </div>
  );
};
