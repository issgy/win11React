const defState = {
  hide: true,
  top: 300,
  left: 500,
  opts: "desk",
  attr: null,
  dataset: null,
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
        name: "切换桌面壁纸",
        action: "WALLNEXT",
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
        name: "排列图标",
        opts: [
          {
            name: "居左",
            action: "changeTaskAlign",
            payload: "left",
          },
          {
            name: "居中",
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
        name: "搜索",
        opts: [
          {
            name: "显示",
            action: "TASKSRCH",
            payload: true,
          },
          {
            name: "隐藏",
            action: "TASKSRCH",
            payload: false,
          },
        ],
      },
      {
        name: "小部件",
        opts: [
          {
            name: "展示",
            action: "TASKWIDG",
            payload: true,
          },
          {
            name: "隐藏",
            action: "TASKWIDG",
            payload: false,
          },
        ],
      },
      {
        type: "hr",
      },
      {
        name: "显示桌面",
        action: "SHOWDSK",
      },
    ],
    app: [
      {
        name: "打开",
        action: "performApp",
        payload: "open",
      },
      {
        type: "hr",
      },
      {
        name: "打开文件位置",
        dsb: true,
      },
      {
        name: "以管理员身份运行",
        action: "performApp",
        payload: "open",
        icon: "win/shield",
      },
      {
        type: "hr",
      },
      {
        name: "从开始取消固定",
        dsb: true,
      },
      {
        name: "固定至任务栏",
        dsb: true,
      },
      {
        name: "删除快捷方式",
        action: "performApp",
        payload: "delshort",
      },
      {
        name: "删除",
      },
      {
        name: "重命名",
        dsb: true,
      },
      {
        name: "属性",
        dsb: true,
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
        attr: action.payload && action.payload.attr,
        dataset: action.payload && action.payload.dataset,
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
