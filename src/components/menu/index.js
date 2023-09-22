import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import "./menu.scss";

import * as Actions from "../../actions";

export const ActMenu = () => {
  const menu = useSelector((state) => state.menus);
  const dispatch = useDispatch();

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

  const returnPos = () => {
    const tmpos = {
      top: menu.top,
      left: menu.left,
    };

    const wnwidth = window.innerWidth;
    const wnheight = window.innerHeight;

    const ele = document.getElementById("actmenu");
    if (ele) {
      var ewidth = getComputedStyle(ele)
        .getPropertyValue("width")
        .replace("px", "");
      var eheight = getComputedStyle(ele)
        .getPropertyValue("height")
        .replace("px", "");

      eheight = eheight == "auto" ? 0 : eheight;
      ewidth = parseInt(ewidth) + 2;
      eheight = parseInt(eheight) + 10;
    }

    if (wnwidth - tmpos.left < ewidth) {
      tmpos.right = wnwidth - tmpos.left;
      tmpos.left = null;
    }

    if (wnheight - tmpos.top < eheight) {
      tmpos.bottom = wnheight - tmpos.top;
      tmpos.top = null;
    }

    return tmpos;
  };

  return (
    <div
      className="actmenu"
      id="actmenu"
      style={{
        ...returnPos(),
        "--prefix": "MENU",
      }}
      data-hide={menu.hide}
    >
      {menuobj(menu.menus.desk)}
    </div>
  );
};

export default ActMenu;
