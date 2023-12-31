import { allApps } from "../utils";

const defState = {};
// 遍历allApps，(每个app的icon都不同）
for (let i = 0; i < allApps.length; i++) {
  // 原先allApps数组的icon属性为新defState对象的属性名字
  defState[allApps[i].icon] = allApps[i];
  // 右上角三个图标  最小化  切换  最大化
  //full/mini  full为界面最大（当界面最大时点击最小化值仍为full），mini为界面没那么大（即当界面由最大点击切换后的中屏）
  defState[allApps[i].icon].size = "full";
  //true/false  true为未点击过图标，，false为点击过，即该界面有（最小化或全屏状态或中屏）
  defState[allApps[i].icon].hide = true;
  //null/true/false  null为未点击过该图标，即hide为true，true为界面是最大化或者中屏，false为界面最小化
  defState[allApps[i].icon].max = null;
  // 有不同值，-1时为 app未打开 或 打开了但界面被最小化
  defState[allApps[i].icon].z = 0;

  // 刷新页面自动出现的app界面
  if (allApps[i].icon === "") {
    defState[allApps[i].icon].size = "full";
    defState[allApps[i].icon].hide = false;
    defState[allApps[i].icon].max = true;
    defState[allApps[i].icon].z = 1;
  }
}

// 代表屏幕上能看到的app界面数量（最大屏/中屏），被最小化的界面不算
defState.hz = 2;

const isOverlaped = (tmpState, key) => {
  var obj = tmpState[key];
  var arr = [];
  for (var i = 0; i < 100; i++) {
    arr.push([]);
    for (var j = 0; j < 100; j++) arr[i].push(-1);
  }

  var pbf = [];
  Object.keys(tmpState).forEach((k) => {
    if (!tmpState[k].max) return;

    var bf = [0, 0, 100, 100];
    if (tmpState[k].size == "cstm" && tmpState[k].dim) {
      if (tmpState[k].dim.top) {
        bf[0] = Number(tmpState[k].dim.top.replace("%", ""));
      }
      if (tmpState[k].dim.left) {
        bf[1] = Number(tmpState[k].dim.left.replace("%", ""));
      }
      if (tmpState[k].dim.height) {
        bf[2] = Number(tmpState[k].dim.height.replace("%", ""));
      }
      if (tmpState[k].dim.width) {
        bf[3] = Number(tmpState[k].dim.width.replace("%", ""));
      }
    }

    if (k == obj.icon) {
      pbf = [...bf];
    }

    for (var dx = bf[0]; dx < bf[0] + bf[2]; dx++) {
      for (var dy = bf[1]; dy < bf[1] + bf[3]; dy++) {
        arr[dx][dy] = Math.max(arr[dx][dy], tmpState[k].z);
      }
    }
  });

  for (var dx = pbf[0]; dx < pbf[0] + pbf[2]; dx++) {
    for (var dy = pbf[1]; dy < pbf[1] + pbf[3]; dy++) {
      if (arr[dx][dy] != obj.z) return true;
    }
  }

  return false;
};

const appReducer = (state = defState, action) => {
  // searchmenu的搜索框内
  if (action.type === "EDGELINK") {
    var tmpState = { ...state };
    var obj = { ...tmpState.edge };
    if (action.payload && action.payload.startsWith("http")) {
      obj.url = action.payload;
    } else if (action.payload && action.payload.length !== 0) {
      obj.url = "https://www/bing.com/search?q=" + action.payload;
    } else {
      obj.url = null;
    }

    obj.size = "full";
    obj.hide = false;
    obj.max = true;
    tmpState.hz += 1;
    obj.z = tmpState.hz;

    tmpState.edge = obj;
    return tmpState;
  } else if (action.type === "SHOWDSK") {
    const tmpState = { ...state };
    const keys = Object.keys(tmpState);

    for (let i = 0; i < keys.length; i++) {
      const obj = tmpState[keys[i]];
      if (obj.hide == false) {
        //hide为false有两种情况，1、界面被最小化（不是关闭） 2、界面全屏/中屏
        obj.max = false; //将界面最小化（不是关闭）
        if (obj.z === tmpState.hz) {
          //tmpState.hz为0时
          tmpState.hz -= 1;
        }
        obj.z = -1;
        tmpState[keys[i]] = obj;
      }
    }
    return tmpState;
  } else if (action.type === "EXTERNAL") {
    window.open(action.payload, "_blank");
    return state;
  } else if (action.type === "OPENTERM") {
    const tmpState = { ...state };
    let obj = {
      ...tmpState["terminal"],
    };

    obj.dir = action.payload;

    obj.size = "full";
    obj.hide = false;
    obj.max = true;
    tmpState.hz += 1;
    obj.z = tmpState.hz;

    tmpState["terminal"] = obj;

    return tmpState;
  } else if (action.type === "ADDAPP") {
    let tmpState = { ...state };
    tmpState[action.payload.icon] = action.payload;
    tmpState[action.payload.icon].size = "full";
    tmpState[action.payload.icon].hide = true;
    tmpState[action.payload.icon].max = null;
    tmpState[action.payload.icon].z = 0;

    return tmpState;
  } else if (action.type === "DELAPP") {
    let tmpState = { ...state };
    delete tmpState[action.payload];
    return tmpState;
  } else {
    const keys = Object.keys(state); //state的每个key遍历装在一个叫keys的数组里

    for (let i = 0; i < keys.length; i++) {
      const obj = state[keys[i]];
      //如果 action.type 不为 'EDGELINK'或'SHOWDSK'或'EXTERNAL'，且是遍历到的对象的action属性
      if (action.type == obj.action) {
        const tmpState = { ...state };

        //payload为full的action：桌面图标点击、startmenu的pinned里的图标点击、allApps里的图标点击
        // 点击后会打开相应的app界面
        if (action.payload === "full") {
          console.log("full");
          obj.size = "full";
          obj.hide = false;
          obj.max = true;
          tmpState.hz += 1;
          obj.z = tmpState.hz;
        }
        // payload为togg的action：taskbar栏的应用图标的点击
        else if (action.payload === "togg") {
          console.log("togg");
          // 首次打开或者界面由最小化变为中屏或者全屏
          if (obj.z != tmpState.hz) {
            obj.hide = false;
            // 界面最小化与恢复之间切换的逻辑
            if (!obj.max || isOverlaped(tmpState, obj.icon)) {
              tmpState.hz += 1;
              obj.z = tmpState.hz;
              obj.max = true;
            } else {
              obj.z = -1;
              obj.max = false;
            }
          }
          // 界面由中屏/全屏被最小化（被最小化不是被关闭）
          else {
            obj.max = !obj.max;
            obj.hide = false;
            if (obj.max) {
              tmpState.hz += 1;
              obj.z = tmpState.hz;
            } else {
              obj.z = -1;
              tmpState.hz -= 1;
            }
          }
        }
        //
        else if (action.payload === "mnmz") {
          console.log("mnmz");
          obj.max = false;
          obj.hide = false;
          if (obj.z == tmpState.hz) {
            tmpState.hz -= 1;
          }
          obj.z = -1;
        } else if (action.payload === "mxmz") {
          console.log("mxmz");
          obj.size = ["mini", "full"][obj.size != "full" ? 1 : 0];
          obj.hide = false;
          obj.max = true;
          tmpState.hz += 1;
          obj.z = tmpState.hz;
        } else if (action.payload === "resize") {
          console.log("resize");
          obj.size = "cstm";
          obj.hide = false;
          obj.max = true;
          if (obj.z != tmpState.hz) tmpState.hz += 1;
          obj.z = tmpState.hz;
          obj.dim = action.dim;
        } else if (action.payload === "close") {
          console.log("close");
          obj.hide = true;
          obj.max = null;
          obj.z = -1;
          tmpState.hz -= 1;
        } else if (action.payload === "front") {
          obj.hide = false;
          obj.max = true;
          if (obj.z != tmpState.hz) {
            tmpState.hz += 1;
            obj.z = tmpState.hz;
          }
        }

        tmpState[keys[i]] = obj;
        return tmpState;
      }
    }
    return state;
  }
};

export default appReducer;
