import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";

// vscode 界面
export const VsCode = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.code);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (url === null) {
      setUrl("https://github1s.com/issgy/win11React");
    }
  });

  return (
    <div
      className="vscodeWn floatTab dpShad"
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
        name="VS Code"
        bg="#1c1c1c"
        invert
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <div className="flex-grow overflow-hidden">
            {wnapp.hide ? null : (
              <iframe
                src={url}
                id="isite"
                className="w-full h-full"
                frameBorder="0"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
