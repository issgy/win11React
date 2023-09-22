export const refresh = (dispatch, payload, menu) => {
  // 刷新操作
  if (menu.menus.desk[0].opts[4].check) {
    dispatch({ type: "DESKHIDE" });
    setTimeout(() => dispatch({ type: "DESKSHOW" }), 100);
  }
};

export const changeIconSize = (dispatch, size, menu) => {
  const tmpMenu = { ...menu };
  tmpMenu.menus.desk[0].opts[0].dot = false;
  tmpMenu.menus.desk[0].opts[1].dot = false;
  tmpMenu.menus.desk[0].opts[2].dot = false;
  let isize = 1;

  if (size === "large") {
    tmpMenu.menus.desk[0].opts[0].dot = true;
    isize = 1.5;
  } else if (size === "medium") {
    tmpMenu.menus.desk[0].opts[1].dot = true;
    isize = 1.2;
  } else {
    tmpMenu.menus.desk[0].opts[2].dot = true;
  }

  dispatch({ type: "DESKSIZE", payload: isize });
  dispatch({ type: "MENUCHNG", payload: tmpMenu });
};

export const deskHide = (dispatch, payload, menu) => {
  const tmpMenu = { ...menu };
  tmpMenu.menus.desk[0].opts[4].check ^= 1;

  dispatch({ type: "DESKTOGG" });
  dispatch({ type: "MENUCHNG", payload: tmpMenu });
};

export const changeSort = (dispatch, sort, menu) => {
  const tmpMenu = { ...menu };
  tmpMenu.menus.desk[1].opts[0].dot = false;
  tmpMenu.menus.desk[1].opts[1].dot = false;
  tmpMenu.menus.desk[1].opts[2].dot = false;
  if (sort === "name") {
    tmpMenu.menus.desk[1].opts[0].dot = true;
  } else if (sort === "size") {
    tmpMenu.menus.desk[1].opts[1].dot = true;
  } else {
    tmpMenu.menus.desk[1].opts[2].dot = true;
  }

  refresh(dispatch, "", tmpMenu);
  dispatch({ type: "DESKSORT", payload: sort });
  dispatch({ type: "MENUCHNG", payload: tmpMenu });
};
