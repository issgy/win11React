import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolBar, Icon, Image } from "../../../utils/general";

import "./assets/fileexplorer.scss";
import { dispatchAction, handleFileOpen } from "../../../actions";
import debounce from "lodash/debounce";

const NavTitle = (props) => {
  let src = props.icon || "folder";

  return (
    <div
      className="navtitle flex prtclk"
      onClick={dispatchAction}
      data-action={props.action}
      data-payload={props.payload}
    >
      <Icon
        className="mr-1"
        src={"win/" + src + "-sm"}
        width={props.isize || 16}
      />
      <span>{props.title}</span>
    </div>
  );
};

const FolderDrop = ({ dir }) => {
  const files = useSelector((state) => state.files);
  const folder = files.data.getId(dir);

  return (
    <>
      {folder.data &&
        folder.data.map((item, i) => {
          if (item.type === "folder") {
            return (
              <Dropdown
                key={i}
                icon={item.info && item.indo.icon}
                title={item.name}
                notoggle={item.data.length == 0}
                dir={item.id}
              />
            );
          }
        })}
    </>
  );
};

const Dropdown = (props) => {
  const [open, setOpen] = useState(props.isDropped != null);
  const special = useSelector((state) => state.files.data.special);
  const [fid, setFid] = useState(() => {
    if (props.spid) return special[props.spid];
    else return props.dir;
  });

  const toggle = () => setOpen(!open);
  return (
    <div className="dropdownmenu">
      <div className="droptitle">
        {/* 下拉的Icon */}
        {!props.notoggle ? (
          <Icon
            className="arrUi"
            fafa={open ? "faChevronDown" : "faChevronRight"}
            width={10}
            pr
            onClick={toggle}
          />
        ) : (
          <Icon className="arrUi opacity-0" fafa="faCircle" width={10} />
        )}
        {/* 标题及左侧的小图标 */}
        <NavTitle
          icon={props.icon}
          title={props.title}
          isize={props.isize}
          action={props.action != "" ? props.action || "FILEDIR" : null}
          payload={fid}
        />
        {props.pinned != null ? (
          <Icon className="pinUi" src="win/pinned" width={16} />
        ) : null}
      </div>
      {!props.notoggle ? (
        <div className="dropcontent">
          {open ? props.children : null}
          {open && fid != null ? <FolderDrop dir={fid} /> : null}
        </div>
      ) : null}
    </div>
  );
};

// explorer 文件夹界面
export const Explorer = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.explorer);
  const files = useSelector((state) => state.files);
  const path = useSelector((state) => state.files.cpath);
  const [cpath, setCpath] = useState(path);
  const [serachTxt, setSearchTxt] = useState("");
  const fdata = files.data.getId(files.cdir);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCpath(e.target.value);
  };

  // const debounceHandle = debounce((value) => {
  //   setCpath(value);
  // }, 300);
  // const handleChange = (e) => {
  //   debounceHandle(e.target.value);
  // };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "FILEPATH", payload: cpath });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTxt(e.target.value);
  };

  const DirCont = () => {
    let arr = [],
      curr = fdata;

    while (curr) {
      arr.push(
        <div className="dirCont flex items-center" key={curr.id || null}>
          <div
            className="dncont"
            onClick={dispatchAction}
            data-action="FILEDIR"
            data-payload={curr.id}
            tabIndex="-1"
          >
            {curr.name}
          </div>
          <Icon className="dirchev" fafa="faChevronRight" width={8} />
        </div>
      );

      curr = curr.host; //host存储着父节点
    }

    arr.push(
      <div className="dirCont flex items-center" key={1}>
        <div className="dncont" tabIndex="-1">
          此电脑
        </div>
        <Icon className="dirchev" fafa="faChevronRight" width={8} />
      </div>
    );

    arr.push(
      <div className="dirCont flex items-center" key={0}>
        <Icon
          className="pr-1 pb-px"
          src={"win/" + fdata.info.icon + "-sm"}
          width={16}
        />
        <Icon className="dirchev" fafa="faChevronRight" width={8} />
      </div>
    );
    return <div className="dirfbox h-full flex">{arr.reverse()}</div>;
  };

  useEffect(() => {
    setCpath(path);
    setSearchTxt("");
  }, [path]);

  return (
    <div
      className="msfiles floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar app={wnapp.action} icon={wnapp.icon} name="File Explorer" />
      <div className="windowScreen flex flex-col">
        <Ribbon />
        <div className="restWindow flex-grow flex flex-col">
          <div className="sec1">
            <Icon
              className={
                "navIcon hvtheme" + (files.hide == 0 ? " disableIt" : "")
              }
              fafa="faArrowLeft"
              width={14}
              click="FILEPREV"
              pr
            />
            <Icon
              className={
                "navIcon hvtheme" +
                (files.hide + 1 == files.history.length ? " disableIt" : "")
              }
              fafa="faArrowRight"
              width={14}
              click="FILENEXT"
              pr
            />
            <Icon
              className="navIcon hvtheme"
              fafa="faArrowUp"
              width={14}
              click="FILEBACK"
              pr
            />
            <div className="path-bar" tabIndex="-1">
              <input
                className="path-field"
                type="text"
                value={cpath}
                onChange={handleChange}
                onKeyDown={handleEnter}
              />
              <DirCont />
            </div>
            <div className="srchbar">
              <Icon className="searchIcon" src="search" width={12} />
              <input
                type="text"
                onChange={handleSearchChange}
                value={serachTxt}
                placeholder="搜索"
              />
            </div>
          </div>
          <div className="sec2">
            <NavPane />
            <ContentArea serachtxt={serachTxt} />
          </div>
          <div className="sec3">
            <div className="item-count text-xs">{fdata.data.length} items</div>
            <div className="view-opts flex">
              <Icon
                className="viewicon hvtheme p-1"
                click="FILEVIEW"
                payload="5"
                open={files.view == 5}
                src="win/viewinfo"
                width={16}
              />
              <Icon
                className="viewicon hvtheme p-1"
                click="FILEVIEW"
                payload="1"
                open={files.view == 1}
                src="win/viewlarge"
                width={16}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ribbon = memo(() => {
  return (
    <div className="msribbon flex">
      <div className="ribsec">
        <div className="drdwcont flex">
          <Icon src="new" ui width={18} margin="0 6px" />
          <span>新建</span>
        </div>
      </div>
      <div className="ribsec">
        <Icon src="cut" ui width={18} margin="0 6px" />
        <Icon src="copy" ui width={18} margin="0 6px" />
        <Icon src="paste" ui width={18} margin="0 6px" />
        <Icon src="rename" ui width={18} margin="0 6px" />
      </div>
      <div className="ribsec">
        <div className="drdwcont flex">
          <Icon src="sort" ui width={18} margin="0 6px" />
          <span>选择</span>
        </div>
        <div className="drdwcont flex">
          <Icon src="view" ui width={18} margin="0 6px" />
          <span>查看</span>
        </div>
      </div>
    </div>
  );
});

const NavPane = memo(() => {
  const files = useSelector((state) => state.files);
  const special = useSelector((state) => state.files.data.special);
  return (
    <div className="navpane medScroll">
      <div className="extcont">
        <Dropdown title="快速访问" icon="star" isDropped action="">
          <Dropdown
            icon="down"
            title="下载"
            spid="%downloads%"
            notoggle
            pinned
          />
          <Dropdown
            icon="docs"
            title="文档"
            spid="%documents%"
            notoggle
            pinned
          />
          <Dropdown title="Github" spid="%github%" notoggle />
        </Dropdown>
        <Dropdown icon="onedrive" title="云盘" spid="%onedrive%" />
        <Dropdown icon="thispc" title="此电脑" action="" isDropped>
          <Dropdown icon="desk" title="桌面" spid="%desktop%" />
          <Dropdown icon="docs" title="文档" spid="%documents%" />
          <Dropdown icon="down" title="下载" spid="%downloads%" />
          <Dropdown icon="music" title="音乐" spid="%music%" />
          <Dropdown icon="pics" title="图片" spid="%pictures%" />
          <Dropdown icon="vid" title="视频" spid="%videos%" />
          <Dropdown icon="disc" title="Windows (C:)" spid="%cdrive%" />
          <Dropdown icon="disk" title="issgy (D:)" spid="%ddrive%" />
        </Dropdown>
      </div>
    </div>
  );
});

const ContentArea = ({ serachtxt }) => {
  const files = useSelector((state) => state.files);
  const special = useSelector((state) => state.files.data.special);
  const [selected, setSelected] = useState(null);
  //根据cdir来获得lookup中对应的对象
  const fdata = files.data.getId(files.cdir);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    setSelected(e.target.dataset.id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    handleFileOpen(e.target.dataset.id);
  };

  const emptyClick = () => {
    setSelected(null);
  };

  const handleKey = (e) => {
    if (e.key === "Backspace") {
      dispatch({ type: "FILEPREV" });
    }
  };

  return (
    <div
      className="contentarea"
      onClick={emptyClick}
      onKeyDown={handleKey}
      tabIndex="-1"
    >
      <div className="contentwrap medScroll">
        <div className="gridshow" data-size="lg">
          {fdata
            ? fdata.data.map((item) => {
                return (
                  item.name.includes(serachtxt) && (
                    <div
                      key={item.id}
                      className="conticon hvtheme flex flex-col items-center prtclk"
                      data-id={item.id}
                      data-focus={selected == item.id}
                      onClick={handleClick}
                      onDoubleClick={handleDoubleClick}
                    >
                      <Image src={`icon/win/${item.info.icon}`} />
                      <span>{item.name}</span>
                    </div>
                  )
                );
              })
            : null}
        </div>
        {fdata.data.length === 0 ? (
          <span className="text-xs mx-auto">此文件为空</span>
        ) : null}
      </div>
    </div>
  );
};
