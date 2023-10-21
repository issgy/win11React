export class Item {
  constructor({ type, name, info, data, host }) {
    this.type = type || "folder";
    this.name = name;
    this.info = info || {};
    this.info.icon = this.info.icon || this.type;
    this.data = data;
    this.host = host;
    this.id = this.gene();
  }

  gene() {
    return Math.random().toString(36).substring(2, 10).toLowerCase();
  }

  setData(data) {
    this.data = data;
  }
}

export class Bin {
  constructor() {
    this.tree = []; //存储将json格式数据转为js格式数据后的对象（可以想象成一棵二叉树结构
    this.lookup = {}; //遍历一遍二叉树后，存储着tree中每一个节点，属性名为id
    this.special = {}; // %xxx%与id的映射标
  }

  setId(id, item) {
    this.lookup[id] = item;
  }

  getId(id) {
    //返回对应的节点信息
    return this.lookup[id];
  }

  setSpecial(spid, id) {
    this.special[spid] = id;
  }

  //根据id返回路径
  getPath(id) {
    let cpath = "";
    let curr = this.getId(id);

    while (curr) {
      cpath = curr.name + "\\" + cpath;
      curr = curr.host;
    }

    return cpath.split("\\").length - 1 > 1
      ? cpath.slice(0, cpath.lastIndexOf("\\"))
      : cpath;
  }

  //根据path得到id
  parsePath(cpath) {
    cpath = cpath
      .split("\\")
      .filter((x) => x != "")
      .map((x) => x.trim().toLowerCase());
    if (cpath.length === 0) return null;

    let curr;
    for (let i = 0; i < this.tree.length; i++) {
      if (this.tree[i].name.toLowerCase() === cpath[0]) {
        curr = this.tree[i];
        break;
      }
    }

    let pid;
    /*
    //第一种方法（迭代
    if (curr) {
      let i = 1;
      let depth = cpath.length; //查找的路径深度
      console.log(curr);
      while (curr.type === "folder" && i < depth) {
        let flag = true;
        for (let j = 0; j < curr.data.length; j++) {
          if (curr.data[j].name.toLowerCase() === cpath[i]) {
            i += 1;
            if (curr.data[j].type === "folder") {
              flag = false;
              curr = curr.data[j]; //更新curr
            }

            break; //找到了就跳过data中剩下的没遍历的
          }
        }

        if (flag) break; //如果遍历完当前层的data都没找到符合的则直接跳出循环
      }
      if (i == depth) {
        console.log(curr.id);
      }
    }*/

    //换一种方法（递归,自己调用自己
    function getPid(curr, cpath, i) {
      if (i == cpath.length) return curr.id;
      if (curr.type === "folder") {
        for (let j = 0; j < curr.data.length; j++) {
          if (curr.data[j].name.toLowerCase() == cpath[i]) {
            i += 1;
            if (curr.data[j].type === "folder") {
              return getPid(curr.data[j], cpath, i);
            }
          }
        }
      }
    }
    pid = getPid(curr, cpath, 1);

    return pid;
  }

  parseFolder(data, name, host = null) {
    let item = new Item({
      type: data.type,
      name: data.name || name,
      info: data.info,
      host: host, //host中存储其父节点信息
    });

    this.setId(item.id, item); //首次调用，初始化lookup

    if (data.info && data.info.spid) {
      this.setSpecial(data.info.spid, item.id); //首次调用，初始化special对象
    }

    if (item.type != "folder") {
      item.setData(data.data);
    } else {
      let fdata = [];
      if (data.data) {
        for (const key of Object.keys(data.data)) {
          fdata.push(this.parseFolder(data.data[key], key, item));
        }
      }
      item.setData(fdata);
    }

    return item;
  }

  parse(data) {
    let drives = Object.keys(data);
    let tree = [];
    for (let i = 0; i < drives.length; i++) {
      tree.push(this.parseFolder(data[drives[i]]));
    }

    this.tree = tree;
  }
}
