import React from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

// whiteboard 界面
export const WhiteBoard = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.board);

  return (
    <div
      className="whiteBoard floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        name="Microsoft Whiteboard"
        bg="#f0f0f0"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <div className="flex-grow grid place-items-center text-4xl font-semibold text-gray-600">
            Coming soon
          </div>
        </div>
      </div>
    </div>
  );
};
