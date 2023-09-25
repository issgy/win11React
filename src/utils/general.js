import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as FaRegIcons from "@fortawesome/free-regular-svg-icons";
import * as AllIcons from "./icons";

import "./general.scss";

// Icon图标
export const Icon = (props) => {
  const dispatch = useDispatch();

  var src = `img/icon/${props.ui != null ? "ui/" : ""}${props.src}.png`;
  if (props.ext != null) {
    src = props.src;
  }

  var prtclk = "";
  if (props.src) {
    if (props.onClick != null || props.pr != null) {
      prtclk = "prtclk";
    }
  }

  const clickDispatch = (event) => {
    const action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };

    if (action.type) {
      dispatch(action);
    }
  };

  if (props.fafa != null) {
    return (
      <div
        className={`uicon prtclk ${props.className || ""}`}
        onClick={props.onClick || (props.click && clickDispatch) || null}
        data-action={props.click}
        data-payload={props.payload}
      >
        <FontAwesomeIcon
          data-flip={props.flip != null}
          data-invert={props.invert != null ? "true" : "false"}
          data-rounded={props.rounded != null ? "true" : "false"}
          style={{
            width: props.width,
            height: props.height || props.width,
            color: props.color || null,
            margin: props.margin || null,
          }}
          icon={
            props.reg == null ? FaIcons[props.fafa] : FaRegIcons[props.fafa]
          }
        />
      </div>
    );
  } else if (props.icon != null) {
    var CustomIcon = AllIcons[props.icon];
    return (
      <div
        className={`uicon prtclk ${props.className || ""}`}
        onClick={props.onClick || (props.click && clickDispatch) || null}
        data-action={props.click}
        data-payload={props.payload}
      >
        <CustomIcon
          data-flip={props.flip != null}
          data-invert={props.invert != null ? "true" : "false"}
          data-rounded={props.rounded != null ? "true" : "false"}
          style={{
            width: props.width,
            height: props.height || props.width,
            fill: props.color || null,
            margin: props.margin || null,
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`uicon ${props.className || ""} ${prtclk}`}
        data-open={props.open != null}
        data-action={props.click}
        data-active={props.active}
        data-payload={props.payload}
        onClick={props.onClick || (props.pr && clickDispatch) || null}
      >
        <img
          width={props.width}
          data-action={props.click}
          data-payload={props.payload}
          data-click={props.click != null}
          onClick={props.click != null ? clickDispatch : null}
          data-flip={props.flip != null}
          height={props.height}
          data-invert={props.invert != null ? "true" : "false"}
          data-rounded={props.rounded != null ? "true" : "false"}
          src={src}
          style={{
            margin: props.margin || null,
          }}
          alt=""
        />
      </div>
    );
  }
};

// 界面最上部的栏
export const ToolBar = (props) => {
  const dispatch = useDispatch();
  // const [snap, setSnap] = useState(false);

  // const openSnap = () => {
  //   setSnap(true);
  // };

  // const closeSnap = () => {
  //   setSnap(false);
  // };
  const toolClick = () => {
    dispatch({
      type: props.app,
      payload: "front",
    });
  };

  return (
    <div
      className="toolbar"
      style={{
        background: props.bg,
      }}
      data-float={props.float != null}
    >
      <div
        className="topInfo flex items-center"
        data-float={props.float != null}
        onClick={toolClick}
      >
        <Icon src={props.icon} width={14} />
        <div className="appFullName text-xss" data-white={props.invert != null}>
          {props.name}
        </div>
      </div>
      <div className="actbtns flex items-center">
        {/* 缩小图标 */}
        <Icon
          invert={props.invert}
          click={props.app}
          payload="mnmz"
          pr
          src="minimize"
          ui
          width={8}
        />
        {/* 切换图标 */}
        <div className="snapbox h-full" data-hv={false}>
          <Icon
            invert={props.invert}
            click={props.app}
            payload="mxmz"
            pr
            src="maximize"
            ui
            width={8}
          />
          {/* <SnapScreen app={props.app} snap={snap} closeSnap={closeSnap} /> */}
          {/* {snap?<SnapScreen app={props.app} closeSnap={closeSnap}/>:null} */}
        </div>
        {/* 关闭图标 */}
        <Icon click={props.app} payload="close" pr src="close" ui width={8} />
      </div>
    </div>
  );
};

export const Image = (props) => {
  const dispatch = useDispatch();
  let src = `/img/${(props.dir ? props.dir + "/" : "") + props.src}.png`;

  if (props.ext != null) {
    src = props.src;
  }

  const errorHandler = (e) => {
    e.target.src = props.err;
  };

  const clickDispatch = (e) => {
    const action = {
      type: e.target.dataset.action,
      payload: e.target.dataset.payload,
    };

    if (action.type) {
      dispatch(action);
    }
  };

  return (
    <div
      className={`imageCont prtclk ${props.className || ""}`}
      id={props.id}
      style={{
        backgroundImage: props.back && `url(${src})`,
      }}
      data-back={props.back != null}
      data-var={props.var}
      onClick={props.onClick || (props.click && clickDispatch)}
      data-action={props.click}
      data-payload={props.payload}
    >
      {!props.back ? (
        <img
          width={props.w}
          height={props.h}
          data-free={props.free != null}
          data-var={props.var}
          src={src}
          alt=""
          onError={errorHandler}
        />
      ) : null}
    </div>
  );
};
