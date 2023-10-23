import React from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

// notepad界面
export const Notepad = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.notepad);

  return (
    <div
      className="notepad floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size === "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        name="Untitled - Notepad"
        noinvert
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="flex text-xs py-2 topBar">
          <div className="mx-2">File</div>
          <div className="mx-2">Edit</div>
          <div className="mx-2">Format</div>
          <div className="mx-2">View</div>
          <div className="mx-2">Help</div>
        </div>
        <div className="restWindow h-full flex-grow">
          <div className="w-full h-full overflow-hidden">
            <textarea className="noteText win11Scroll" id="textpad" />
          </div>
        </div>
      </div>
    </div>
  );
};
