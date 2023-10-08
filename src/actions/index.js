import store from "../reducers";
import { dfApps } from "../utils";

export const refresh = (payload, menu) => {
  // 刷新操作
  if (menu.menus.desk[0].opts[4].check) {
    store.dispatch({ type: "DESKHIDE" });
    setTimeout(() => store.dispatch({ type: "DESKSHOW" }), 100);
  }
};

export const changeIconSize = (size, menu) => {
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

  refresh("", tmpMenu);
  store.dispatch({ type: "DESKSIZE", payload: isize });
  store.dispatch({ type: "MENUCHNG", payload: tmpMenu });
};

export const deskHide = (payload, menu) => {
  const tmpMenu = { ...menu };
  tmpMenu.menus.desk[0].opts[4].check ^= 1;

  store.dispatch({ type: "DESKTOGG" });
  store.dispatch({ type: "MENUCHNG", payload: tmpMenu });
};

export const changeSort = (sort, menu) => {
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

  refresh("", tmpMenu);
  store.dispatch({ type: "DESKSORT", payload: sort });
  store.dispatch({ type: "MENUCHNG", payload: tmpMenu });
};

export const changeTaskAlign = (align, menu) => {
  const tmpMenu = { ...menu };

  if (tmpMenu.menus.task[0].opts[align === "left" ? 0 : 1].dot) return;

  tmpMenu.menus.task[0].opts[0].dot = false;
  tmpMenu.menus.task[0].opts[1].dot = false;

  if (align === "left") {
    tmpMenu.menus.task[0].opts[0].dot = true;
  } else tmpMenu.menus.task[0].opts[1].dot = true;

  store.dispatch({ type: "TASKTOG" });
  store.dispatch({ type: "MENUCHNG", payload: tmpMenu });
};

export const performApp = (act, menu) => {
  const data = {
    type: menu.dataset.action,
    payload: menu.dataset.payload,
  };
  if (act == "open") {
    store.dispatch(data);
  } else if (act == "delshort") {
    if (data.type) {
      let apps = store.getState().apps;
      let app = Object.keys(apps).filter(
        (x) =>
          apps[x].action == data.type ||
          (apps[x].payload == data.payload && apps[x].payload != null)
      );

      app = apps[app];
      if (app) {
        store.dispatch({ type: "DESKREM", payload: app.name });
      }
    }
  }
};

export const delApp = (act, menu) => {
  let data = {
    type: menu.dataset.action,
    payload: menu.dataset.payload,
  };

  if (act == "delete") {
    if (data.type) {
      console.log(data.type);
    }
  }
};

export const installApp = (data) => {
  const app = { ...data, type: "app" };
  // store.dispatch({ type: "APPDOWNLOAD", payload: data });
  let installed = localStorage.getItem("installed");
  if (!installed) installed = "[]";

  installed = JSON.parse(installed);

  let desktop = localStorage.getItem("desktop");
  if (!desktop) desktop = dfApps.desktop;
  else desktop = JSON.parse(desktop);
  // 不能出现重复的
  if (desktop.indexOf(app.name) == -1 && installed.indexOf(app.name) == -1) {
    desktop.push(app.name);
    localStorage.setItem("desktop", JSON.stringify(desktop));
    installed.push(app);
    localStorage.setItem("installed", JSON.stringify(installed));
  }

  store.dispatch({ type: "ADDAPP", payload: app });
  store.dispatch({
    type: "DESKADD",
    payload: app,
  });
  store.dispatch({
    type: "WNSTORE",
    payload: "mnmz",
  });
};
