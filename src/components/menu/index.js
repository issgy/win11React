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
      if (action.type === action.type.toLowerCase()) {
        Actions[action.type](dispatch, action.payload);
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
            {opt.opts ? (
              <div className="minimenu">{menuobj(opt.opts)}</div>
            ) : null}
          </div>
        );
      }
    });

    return menu;
  };

  return (
    <div
      className="actmenu"
      style={{
        top: menu.top,
        left: menu.left,
        "--prefix": "MENU",
      }}
      data-hide={menu.hide}
    >
      {menuobj(menu.opts)}
    </div>
  );
};

export default ActMenu;
