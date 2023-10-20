import { Bin } from "../utils/bin";
import fileData from "./dir.json";

const defState = {
  cdir: "%onedrive%",
  history: [],
  hide: 0,
  view: 1,
};

defState.history.push(defState.cdir);
defState.data = new Bin();
defState.data.parse(fileData);

const fileReducer = (state = defState, action) => {
  let tmp = { ...state };
  let navHist = false;

  if (action.type === "FILEDIR") {
    tmp.cdir = action.payload;
  } else if (action.type === "FILEPATH") {
    let pathid = tmp.data.parsePath(action.payload);
    //更新cdir
    if (pathid) tmp.cdir = pathid;
    tmp.path = action.payload;
    return tmp;
  } else if (action.type === "FILEPREV") {
    //回退操作
    tmp.hide--;
    if (tmp.hide < 0) tmp.hide = 0;
    navHist = true;
  } else if (action.type === "FILENEXT") {
    tmp.hide++;
    if (tmp.hide > tmp.history.length - 1) tmp.hide = tmp.history.length - 1;
    navHist = true;
  } else if (action.type === "FILEBACK") {
    //返回文件夹上一层
    let item = tmp.data.getId(tmp.cdir);
    if (item.host) tmp.cdir = item.host.id;
  }

  if (!navHist && tmp.cdir != tmp.history[tmp.hide]) {
    tmp.history.splice(tmp.hide + 1);
    tmp.history.push(tmp.cdir);
    tmp.hide = tmp.history.length - 1;
  }

  tmp.cdir = tmp.history[tmp.hide];
  // 如果cdir格式是%xxx%的格式，则根据special对象内的映射关系，转为对应的id格式
  if (tmp && tmp.cdir && tmp.cdir.includes("%")) {
    if (tmp.data.special[tmp.cdir] != null) {
      tmp.cdir = tmp.data.special[tmp.cdir];
      tmp[tmp.hide] = tmp.cdir;
    }
  }

  // 调用getPath方法通过cdir返回路径
  tmp.cpath = tmp.data.getPath(tmp.cdir);
  return tmp;
};

export default fileReducer;
