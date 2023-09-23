import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import "./menu.scss";

import * as Actions from "../../actions";

export const ActMenu = () => {
  const menu = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  const { abpos, isLeft } = useSelector((state) => {
    const acount = state.menus.menus[state.menus.opts].length;
    const tmpos = {
      top: state.menus.top,
      left: state.menus.left,
    };
    let tmpLeft = false;

    // 获取当前窗口的宽度和高度
    const wnwidth = window.innerWidth,
      wnheight = window.innerHeight;

    const ewidth = 200,
      eheight = acount * 18.8;

    // 根据窗口的宽度和菜单的宽度来判断是否要在左侧显示菜单。
    // 如果窗口的宽度减去菜单的左侧位置小于等于菜单的宽度，则菜单将在右侧显示
    tmpLeft = wnwidth - tmpos.left > 360;
    if (wnwidth - tmpos.left < ewidth) {
      tmpos.right = wnwidth - tmpos.left;
      tmpos.left = null;
    }
    if (wnheight - tmpos.top < eheight) {
      tmpos.bottom = wnheight - tmpos.top;
      tmpos.top = null;
    }

    return {
      abpos: tmpos,
      isLeft: tmpLeft,
    };
  });

  const clickDispatch = (event) => {
    event.stopPropagation();
    const action = {
      type: event.target.dataset.action,
      payload: event.target.dataset.payload,
    };

    if (action.type) {
      if (action.type !== action.type.toUpperCase()) {
        Actions[action.type](dispatch, action.payload, menu);
      } else {
        dispatch(action);
      }
      dispatch({ type: "MENUHIDE" });
    }
  };

  const menuobj = (data) => {
    let menu = [];
    data.map((opt, i) => {
      if (opt.type === "hr") {
        menu.push(<div className="menubar" key={i}></div>);
      } else {
        menu.push(
          <div
            className="menuopt"
            data-dsb={opt.dsb}
            onClick={clickDispatch}
            data-action={opt.action}
            data-payload={opt.payload}
            key={i}
          >
            {opt.name}
            {opt.icon ? <Icon src={opt.icon} width={14} /> : null}
            {opt.opts ? (
              <Icon fafa="faChevronRight" width={10} color="#999" />
            ) : null}
            {opt.dot ? (
              <Icon
                className="dotIcon"
                fafa="faCircle"
                width={4}
                height={4}
                color="#333"
              />
            ) : null}
            {opt.check ? (
              <Icon
                className="checkIcon"
                fafa="faCheck"
                width={8}
                height={8}
                color="#333"
              />
            ) : null}
            {opt.opts ? (
              <div className="minimenu">{menuobj(opt.opts)}</div>
            ) : null}
          </div>
        );
      }
    });
    return menu;
  };

  // const returnPos = () => {
  //   const tmpos = {
  //     top: menu.top,
  //     left: menu.left,
  //   },tmpLeft=false

  //   const wnwidth = window.innerWidth;
  //   const wnheight = window.innerHeight;

  //   const ele = document.getElementById("actmenu");
  //   if (ele) {
  //     var ewidth = getComputedStyle(ele)
  //       .getPropertyValue("width")
  //       .replace("px", "");
  //     var eheight = getComputedStyle(ele)
  //       .getPropertyValue("height")
  //       .replace("px", "");

  //     eheight = eheight == "auto" ? 0 : eheight;
  //     ewidth = parseInt(ewidth) + 2;
  //     eheight = parseInt(eheight) + 10;
  //   }

  //   if (wnwidth - tmpos.left < ewidth) {
  //     tmpos.right = wnwidth - tmpos.left;
  //     tmpos.left = null;
  //   }

  //   if (wnheight - tmpos.top < eheight) {
  //     tmpos.bottom = wnheight - tmpos.top;
  //     tmpos.top = null;
  //   }

  //   return tmpos;
  // };
  return (
    <div
      className="actmenu"
      id="actmenu"
      style={{
        ...abpos,
        "--prefix": "MENU",
      }}
      data-hide={menu.hide}
      data-left={isLeft}
    >
      {menuobj(menu.menus[menu.opts])}
    </div>
  );
};

export default ActMenu;
