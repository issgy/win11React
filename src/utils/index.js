import icons from "./icons";

let iconIdx = {
  taskbar: [3, 4, 5, 6], //任务栏的倒数四个图标
  desktop: [8, 7, 4, 6, 5], //桌面的图标
  pinned: [
    5, 51, 37, 31, 21, 48, 6, 35, 15, 28, 33, 10, 11, 44, 39, 13, 46, 54,
  ], //Pinned内的图标
  recent: [21, 44, 46, 54, 13, 39], //Recommended内的图标
};

// 导出不同部分的icon对象数组。
export const desktopApps = iconIdx.desktop.map((x) => {
  return icons[x];
});

export const pinnedApps = iconIdx.pinned.map((x) => {
  return icons[x];
});

export const recentApps = iconIdx.recent.map((x) => {
  let obj = icons[x];
  // 得到一个范围在-40到359之间的随机整数。将这个随机整数赋值给obj的lastUsed属性
  obj.lastUsed = Math.floor(Math.random() * 400) - 40;
  return obj;
});

export const allApps = icons.filter((app) => {
  // taskbar栏的icon筛掉
  return app.type === "app";
});

export const taskApps = iconIdx.taskbar.map((x) => {
  return icons[x];
});
