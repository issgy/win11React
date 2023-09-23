const defState = {
  hide: true,
  top: 300,
  left: 500,
  opts: "desk",
  menus: {
    desk: [
      {
        name: "查看",
        opts: [
          {
            name: "大图标",
            action: "changeIconSize",
            payload: "large",
          },
          {
            name: "中等图标",
            action: "changeIconSize",
            payload: "medium",
          },
          {
            name: "小图标",
            action: "changeIconSize",
            payload: "small",
            dot: true,
          },
          {
            type: "hr",
          },
          {
            name: "显示桌面图标",
            action: "deskHide",
            check: true,
          },
        ],
      },
      {
        name: "排序方式",
        opts: [
          {
            name: "名称",
            action: "changeSort",
            payload: "name",
          },
          {
            name: "大小",
            action: "changeSort",
            payload: "size",
          },
          {
            name: "修改日期",
            action: "changeSort",
            payload: "date",
          },
        ],
      },
      {
        name: "刷新",
        action: "refresh",
      },
      {
        type: "hr",
      },
      {
        name: "粘贴",
        dsb: true,
      },
      {
        name: "粘贴快捷方式",
        dsb: true,
      },
      {
        name: "打开 Windows 终端",
        icon: "terminal",
        action: "OPENTERM",
        payload: "C:\\Users\\issgy\\Desktop",
      },
      {
        type: "hr",
      },
      {
        name: "新建",
        dsb: true,
      },
      {
        type: "hr",
      },
      {
        name: "个性化",
        icon: "win/themes",
        dsb: true,
      },
      {
        name: "关于",
        action: "DESKABOUT",
        icon: "win/info",
        payload: true,
      },
    ],
    task: [
      {
        name: "Align icons",
        opts: [
          {
            name: "Left",
            action: "changeTaskAlign",
            payload: "left",
          },
          {
            name: "Center",
            action: "changeTaskAlign",
            payload: "center",
            dot: true,
          },
        ],
      },
      {
        type: "hr",
      },
      {
        name: "Search",
        opts: [
          {
            name: "Show",
            action: "TASKSRCH",
            payload: true,
          },
          {
            name: "Hide",
            action: "TASKSRCH",
            payload: false,
          },
        ],
      },
      {
        name: "Widgets",
        opts: [
          {
            name: "Show",
            action: "TASKWIDG",
            payload: true,
          },
          {
            name: "Hide",
            action: "TASKWIDG",
            payload: false,
          },
        ],
      },
      {
        type: "hr",
      },
      {
        name: "Show Desktop",
        action: "SHOWDSK",
      },
    ],
  },
};

const menusReducer = (state = defState, action) => {
  switch (action.type) {
    case "MENUHIDE":
      return {
        ...state,
        hide: true,
      };
    case "MENUSHOW":
      return {
        ...state,
        hide: false,
        top: (action.payload && action.payload.top) || 272,
        left: (action.payload && action.payload.left) || 430,
        opts: (action.payload && action.payload.menu) || "desk",
      };
    case "MENUCHNG":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default menusReducer;
