import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../utils/general";
import "./menu.scss";

import * as Actions from "../../actions";

export const ActMenu = () => {
  const menu = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  const menudata = menu.data[menu.opts];

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

    const ewidth = 312,
      eheight = acount * 28;

    // 根据窗口的宽度和菜单的宽度来判断是否要在左侧显示菜单。
    // 如果窗口的宽度减去菜单的左侧位置小于等于菜单的宽度，则菜单将在右侧显示
    tmpLeft = wnwidth - tmpos.left > 360;
    if (wnwidth - tmpos.left < ewidth) {
      tmpos.left = wnwidth - ewidth;
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
        Actions[action.type](action.payload, menu);
      } else {
        dispatch(action);
      }
      dispatch({ type: "MENUHIDE" });
    }
  };

  const menuobj = (data) => {
    //处理menu reducer中menus.opts,处理后是
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
            {menudata.ispace != false ? (
              <div className="spcont">
                {opt.icon && opt.type == null ? (
                  <Icon src={opt.icon} width={16} />
                ) : null}
                {opt.icon && opt.type == "svg" ? (
                  <Icon icon={opt.icon} width={16} />
                ) : null}
                {opt.icon && opt.type == "fa" ? (
                  <Icon fafa={opt.icon} width={16} />
                ) : null}
              </div>
            ) : null}
            <div className="nopt">{opt.name}</div>
            {opt.opts ? (
              <Icon
                className="micon rightIcon"
                fafa="faChevronRight"
                width={10}
                color="#999"
              />
            ) : null}
            {opt.dot ? (
              <Icon
                className="micon dotIcon"
                fafa="faCircle"
                width={4}
                height={4}
              />
            ) : null}
            {opt.check ? (
              <Icon
                className="micon checkIcon"
                fafa="faCheck"
                width={8}
                height={8}
              />
            ) : null}
            {opt.opts ? (
              <div className="minimenu" style={{ minWidth: menudata.secwid }}>
                {menuobj(opt.opts)}
              </div>
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
      id="actmenu"
      style={{
        ...abpos,
        "--prefix": "MENU",
        width: menudata.width,
      }}
      data-hide={menu.hide}
      data-left={isLeft}
    >
      {menuobj(menu.menus[menu.opts])}
    </div>
  );
};

export default ActMenu;
