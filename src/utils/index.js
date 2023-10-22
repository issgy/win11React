import icons from "./apps";

let { taskbar, desktop, pinned, recent } = {
  taskbar: (localStorage.getItem("taskbar") &&
    JSON.parse(localStorage.getItem("taskbar"))) || [
    "Settings",
    "File Explorer",
    "Edge",
    "Store",
    "Spotify",
  ],
  desktop: (localStorage.getItem("desktop") &&
    JSON.parse(localStorage.getItem("desktop"))) || [
    "issgy",
    "Recycle Bin",
    "File Explorer",
    "Store",
    "Edge",
    "VS Studio Code",
    "Spotify",
  ],
  pinned: (localStorage.getItem("pinned") &&
    JSON.parse(localStorage.getItem("pinned"))) || [
    "Edge",
    "Word",
    "PowerPoint",
    "OneNote",
    "Mail",
    "To Do",
    "Store",
    "Photos",
    "Your Phone",
    "Notepad",
    "White Board",
    "Calculator",
    "Spotify",
    "Twitter",
    "VS Studio Code",
    "Terminal",
    "Github",
    "Discord",
  ],
  recent: (localStorage.getItem("recent") &&
    JSON.parse(localStorage.getItem("recent"))) || [
    "Mail",
    "Twitter",
    "Terminal",
    "Github",
    "VS Studio Code",
    "Spotify",
    "Edge",
  ],
};
// 导出不同部分的icon对象数组。
export const desktopApps = icons
  .filter((x) => desktop.includes(x.name))
  .sort((a, b) => {
    return desktop.indexOf(a.name) > desktop.indexOf(b.name) ? 1 : -1;
  });

export const pinnedApps = icons
  .filter((x) => pinned.includes(x.name))
  .sort((a, b) => {
    return pinned.indexOf(a.name) > pinned.indexOf(b.name) ? 1 : -1;
  });

export const recentApps = icons
  .filter((x) => recent.includes(x.name))
  .sort((a, b) => {
    return recent.indexOf(a.name) > recent.indexOf(b.name) ? 1 : -1;
  });

export const allApps = icons.filter((app) => {
  // taskbar栏的icon筛掉
  return app.type === "app";
});

export const taskApps = icons.filter((x) => taskbar.includes(x.name));

export const dfApps = {
  taskbar,
  desktop,
  pinned,
  recent,
};
