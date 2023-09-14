import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as FaRegIcons from "@fortawesome/free-regular-svg-icons";

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
  return (
    <>
      {props.fafa == null ? (
        <div
          className={`uicon ${props.className || ""} ${prtclk}`}
          data-open={props.open != null}
          data-action={props.click}
          data-active={props.active != null}
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
            height={props.height || props.width}
            data-invert={props.invert != null ? "true" : "false"}
            data-rounded={props.rounded != null ? "true" : "false"}
            src={src}
            style={{
              margin: props.margin || null,
            }}
            alt=""
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export const ToolBar = (props) => {
  const dispatch = useDispatch();

  const [snap, setSnap] = useState(false);

  const openSnap = () => {
    setSnap(true);
  };

  const closeSnap = () => {
    setSnap(false);
  };

  return (
    <div
      className="toolbar"
      style={{
        background: props.bg,
      }}
    >
      <div
        className="topInfo flex items-center"
        data-float={props.float != null}
      >
        <Icon src={props.icon} width={12} />
        <div className="appFullName text-xss" data-white={false}>
          {props.name}
        </div>
      </div>
      <div className="actbtns flex items-center">
        {/* 缩小图标 */}
        <Icon click={props.app} payload="mnmz" pr src="minimize" ui width={8} />
        {/* 切换图标 */}
        <div
          className="snapbox h-full"
          data-hv={snap}
          onMouseOver={openSnap}
          onMouseLeave={closeSnap}
        >
          <Icon
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
