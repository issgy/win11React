const menuStates = {
  desk: [
    {
      name: "查看",
      opts: [
        {
          name: "大图标",
          action: "DESKSIZE",
          payload: 1.5,
        },
        {
          name: "中等图标",
          action: "DESKSIZE",
          payload: 1.2,
        },
        {
          name: "小图标",
          action: "DESKSIZE",
          payload: 1,
        },
        {
          type: "hr",
        },
        {
          name: "显示桌面图标",
          action: "DESKTOGG",
        },
      ],
    },
    {
      name: "排序方式",
      dsb: true,
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
  ],
};

const defState = {
  hide: true,
  top: 300,
  left: 500,
  opts: menuStates.desk,
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
      };
    default:
      return state;
  }
};

export default menusReducer;
