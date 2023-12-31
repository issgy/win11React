import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as FaRegIcons from "@fortawesome/free-regular-svg-icons";
import * as AllIcons from "./icons";
import { debounce, throttle } from "lodash";

import "./general.scss";

// Icon图标
export const Icon = (props) => {
  const dispatch = useDispatch();

  var src = `img/icon/${props.ui != null ? "ui/" : ""}${props.src}.png`;
  if (props.ext != null || (props.src && props.src.includes("http"))) {
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
        data-menu={props.menu}
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
        data-menu={props.menu}
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
  } else if (props.msi != null) {
    return (
      <div
        className={`uicon prtclk ${props.className || ""}`}
        onClick={props.onClick || (props.click && clickDispatch) || null}
        data-action={props.click}
        data-payload={props.payload}
        data-menu={props.menu}
      >
        <i
          className={"ms-Icon ms-Icon--" + props.msi}
          style={{
            fontSize: props.width || "16px",
            margin: props.margin || null,
          }}
          aria-hidden="true"
          data-flip={props.flip != null}
          data-invert={!!props.invert}
        ></i>
      </div>
    );
  } else {
    return (
      <div
        className={`uicon ${props.className || ""} ${prtclk}`}
        data-open={props.open}
        data-action={props.click}
        data-active={props.active}
        data-payload={props.payload}
        data-menu={props.menu}
        data-pr={props.pr}
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
    // 拖拽界面移动松手后
    dispatch({
      type: props.app,
      payload: "front",
    });
  };

  let appStartOffsetTandL = [0, 0],
    mouseStartClientYandX = [0, 0],
    wnapp = {};
  let pressMouseAppHandW = [0, 0],
    op = 0,
    vec = [0, 0];

  const toolDrag = (e) => {
    e.preventDefault();
    // 鼠标按下时相对于浏览器窗口客户区域的垂直和水平坐标位置属性
    mouseStartClientYandX = [e.clientY, e.clientX];
    op = e.target.dataset.op;

    // 拖拽移动界面
    if (op == 0) {
      wnapp = e.target.parentElement && e.target.parentElement.parentElement;
    } else {
      //拖拽改变界面大小
      vec = e.target.dataset.vec.split(",");
      wnapp =
        e.target.parentElement &&
        e.target.parentElement.parentElement &&
        e.target.parentElement.parentElement.parentElement;
    }

    if (wnapp) {
      wnapp.classList.add("notrans");
      wnapp.classList.add("z9900");
      // 界面距离浏览器顶部和左部的距离
      appStartOffsetTandL = [wnapp.offsetTop, wnapp.offsetLeft];
      // 鼠标按下时的界面的高度和宽度
      pressMouseAppHandW = [
        parseFloat(getComputedStyle(wnapp).height.replaceAll("px", "")),
        parseFloat(getComputedStyle(wnapp).width.replaceAll("px", "")),
      ];
    }

    document.onmousemove = debounce(handleMouseMove, 10);
    document.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    let appEndOffsetTop =
        appStartOffsetTandL[0] + e.clientY - mouseStartClientYandX[0],
      appEndOffsetLeft =
        appStartOffsetTandL[1] + e.clientX - mouseStartClientYandX[1];
    let releaseMouseAppHeight =
        pressMouseAppHandW[0] + vec[0] * (e.clientY - mouseStartClientYandX[0]),
      releaseMouseAppWidth =
        pressMouseAppHandW[1] + vec[1] * (e.clientX - mouseStartClientYandX[1]);

    if (op == 0) {
      wnapp.style.top = appEndOffsetTop + "px";
      wnapp.style.left = appEndOffsetLeft + "px";
    } else {
      // 此处不可省略，因为拖拽一侧边框改变某一侧时，其余侧不可动，例如拉伸上侧边框，左右和下侧不可动
      appEndOffsetTop =
        appStartOffsetTandL[0] +
        Math.min(vec[0], 0) * (releaseMouseAppHeight - pressMouseAppHandW[0]);
      appEndOffsetLeft =
        appStartOffsetTandL[1] +
        Math.min(vec[1], 0) * (releaseMouseAppWidth - pressMouseAppHandW[1]);
      wnapp.style.top = appEndOffsetTop + "px";
      wnapp.style.left = appEndOffsetLeft + "px";
      // 界面宽度和高度最小不能小于360
      wnapp.style.height = Math.max(releaseMouseAppHeight, 360) + "px";
      wnapp.style.width = Math.max(releaseMouseAppWidth, 360) + "px";
    }
  };

  const handleMouseUp = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;

    wnapp.classList.remove("notrans");
    wnapp.classList.remove("z9900");

    let action = {
      type: props.app,
      payload: "resize",
      dim: {
        width: getComputedStyle(wnapp).width,
        height: getComputedStyle(wnapp).height,
        top: getComputedStyle(wnapp).top,
        left: getComputedStyle(wnapp).left,
      },
    };

    dispatch(action);
  };

  return (
    <>
      <div
        className="toolbar"
        style={{
          background: props.bg,
        }}
        data-float={props.float != null}
        data-noinvert={props.noinvert != null}
      >
        <div
          className="topInfo flex flex-grow items-center"
          data-float={props.float != null}
          onClick={toolClick}
          onMouseDown={toolDrag}
          data-op="0"
        >
          <Icon src={props.icon} width={14} />
          <div
            className="appFullName text-xss"
            data-white={props.invert != null}
          >
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
          <Icon
            invert={props.invert}
            click={props.app}
            payload="close"
            pr
            src="close"
            ui
            width={8}
          />
        </div>
      </div>
      {/* 可拖拽的四个方向的侧边 */}
      <div className="resizecont topone">
        <div className="flex">
          <div
            className="conrsz cursor-nw"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,-1"
          ></div>
          <div
            className="edgrsz cursor-n wdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="-1,0"
          ></div>
        </div>
      </div>
      <div className="resizecont leftone">
        <div className="h-full">
          <div
            className="edgrsz cursor-w hdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="0,-1"
          ></div>
        </div>
      </div>
      <div className="resizecont rightone">
        <div className="h-full">
          <div
            className="edgrsz cursor-w hdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="0,1"
          ></div>
        </div>
      </div>
      <div className="resizecont bottomone">
        <div className="flex">
          <div
            className="conrsz cursor-ne"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,-1"
          ></div>
          <div
            className="edgrsz cursor-n wdws"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,0"
          ></div>
          <div
            className="conrsz cursor-nw"
            data-op="1"
            onMouseDown={toolDrag}
            data-vec="1,1"
          ></div>
        </div>
      </div>
    </>
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
          loading={props.lazy ? "lazy" : null}
          onError={errorHandler}
        />
      ) : null}
    </div>
  );
};
