import store from "../reducers";
import { dfApps } from "../utils";
import { gene_name } from "../utils/apps";

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
        store.dispatch({ type: "DESKDEL", payload: app.name });
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
      let apps = store.getState().apps;
      let app = Object.keys(apps).filter((x) => apps[x].action == data.type);

      if (app) {
        app = apps[app];
        if (app.pwa == true) {
          //只有在store安装的应用才可删除
          store.dispatch({ type: "DELAPP", payload: app.icon });

          let installed = JSON.parse(localStorage.getItem("installed"));
          installed = installed.filter((x) => x.icon != app.icon);
          localStorage.setItem("installed", JSON.stringify(installed));
          store.dispatch({ type: "DESKDEL", payload: app.name });
        }
      }
    }
  }
};

export const installApp = (data) => {
  const app = { ...data, type: "app", pwa: true }; //pwa属性标记在store安装的应用

  let installed = localStorage.getItem("installed");
  if (!installed) installed = "[]";

  installed = JSON.parse(installed);

  let desktop = localStorage.getItem("desktop");
  if (!desktop) desktop = dfApps.desktop;
  else desktop = JSON.parse(desktop);

  desktop.push(app.name);
  localStorage.setItem("desktop", JSON.stringify(desktop));
  installed.push(app);
  localStorage.setItem("installed", JSON.stringify(installed));

  app.action = gene_name();
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

export const changeTheme = () => {
  let theme = store.getState().settings.person.theme;
  theme = theme == "light" ? "dark" : "light";
  let icon = theme == "light" ? "sun" : "moon";

  document.body.dataset.theme = theme;
  store.dispatch({ type: "STNGTHEME", payload: theme });
  store.dispatch({ type: "PANETHEME", payload: icon });
};

export const loadSettings = () => {
  let setting = localStorage.getItem("setting") || "{}";
  setting = JSON.parse(setting);

  if (setting.person == null) setting = store.getState().settings;

  if (setting.person.theme != "light") changeTheme();

  store.dispatch({ type: "SETTINGLOAD", payload: setting });
};

export const hideApps = () => {
  /*
      ["START", "STARTHID"], //startmenu
      ["PANE", "PANEHIDE"], //sidepane.hide
      ["WIDG", "WIDGHIDE"], //widpane
      ["CALN", "CALNHIDE"], //sidepane.calhide
      ["MENU", "MENUHIDE"], //menu
  */
  let arr = [
    ["START", "STARTHID"], //startmenu
    ["PANE", "PANEHIDE"], //sidepane.hide
    ["WIDG", "WIDGHIDE"], //widpane
    ["CALN", "CALNHIDE"], //sidepane.calhide
    ["MENU", "MENUHIDE"], //menu
  ];

  arr[0].push(store.getState().startmenu.hide);
  arr[1].push(store.getState().sidepane.hide);
  arr[2].push(store.getState().widpane.hide);
  arr[3].push(store.getState().sidepane.calhide);
  arr[4].push(store.getState().menus.hide);

  console.log(arr);
};
