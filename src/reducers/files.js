import { Bin } from "../utils/bin";
import fileData from "./dir.json";

const defState = {
  cdir: "%user%",
};

defState.data = new Bin();
defState.data.parse(fileData);

const fileReducer = (state = defState, action) => {
  let tmp = { ...state };
  if (action.type === "FILEDIR") {
    tmp.cdir = action.payload;
  } else if (action.type === "FILEPATH") {
    let pathid = tmp.data.parsePath(action.payload);
    //更新cdir
    if (pathid) tmp.cdir = pathid;
    tmp.path = action.payload;
    return tmp;
  }

  // 如果cdir格式是%xxx%的格式，则根据special对象内的映射关系，转为对应的id格式
  if (tmp && tmp.cdir && tmp.cdir.includes("%")) {
    if (tmp.data.special[tmp.cdir] != null) {
      tmp.cdir = tmp.data.special[tmp.cdir];
    }
  }

  // 调用getPath方法通过cdir返回路径
  tmp.cpath = tmp.data.getPath(tmp.cdir);
  return tmp;
};

export default fileReducer;
