import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "../../../utils/general";

export const AboutWin = () => {
  const dispatch = useDispatch();
  const { abOpen } = useSelector((state) => state.desktop);
  const [open, setOpen] = useState(() => {
    if (localStorage.getItem("closeAbout") === true) {
      return false;
    } else {
      return true;
    }
  });

  const action = () => {
    setOpen(false);
    localStorage.setItem("closeAbout", true);
    dispatch({ type: "DESKABOUT", payload: false });
  };
  return open || abOpen ? (
    <div className="aboutApp floatTab dpShad">
      <div className="py-1 px-2 bg-gray-100 text-xss">
        <div className="">About Windows</div>
      </div>
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow h-full flex-grow flex flex-col items-center p-4">
          <Image src="windows11" free />
          <div className="w-88 h-px bg-gray-400 my-4"></div>
          <div className="abCont">
            <div>Microsoft Windows (in React)</div>
            <div>Version 21H2 (OS Build 22000.51)</div>
            <div>&copy; issgy. All rights reserved.</div>
            <br />
            <div>
              The Windows 11 Home Single Language Operating System and its user
              interface are protected by the trademark and other pending or
              existing intellectual property rights in the China and other
              countries/regions.
            </div>
            <br />
            <br />
            <div>
              This product is licensed with{" "}
              <a
                target="_blank"
                href="https://github.com/issgy/win11React/blob/main/LICENSE"
              >
                Creative Commons
              </a>
              .
            </div>
            <div className="mt-1">
              &nbsp;&nbsp; &nbsp;&nbsp; contact:{" "}
              <a target="_blank" href="mailto:xjmgsq@163.com">
                xjmgsq@163.com
              </a>
            </div>
            <br />
            <br />
            <div>
              <span>
                {" "}
                The current working apps are
                <mark> Calculator</mark>,<mark> Edge</mark>,
                <mark> Notepad</mark>,<mark> Store</mark>,<mark> Terminal</mark>
                ,<mark> Vscode</mark>,<mark> Whiteboard.</mark>
              </span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="okbtn">
              <div className="bg-gray-100" onClick={action}>
                Ok
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
