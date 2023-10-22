import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "../../../utils/general";

export const AboutWin = () => {
  const dispatch = useDispatch();
  const { abOpen } = useSelector((state) => state.desktop);
  const { locked, booted } = useSelector((state) => state.wallpaper);
  const [open, setOpen] = useState(!localStorage.getItem("closeAbout"));
  const [timer, setTimer] = useState(
    localStorage.getItem("closeAbout") == "true" ? 0 : 5
  );

  const action = () => {
    setOpen(false);
    localStorage.setItem("closeAbout", true);
    dispatch({ type: "DESKABOUT", payload: false });
  };

  useEffect(() => {
    if (timer > 0 && !locked && booted) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer, locked, booted]);

  return open || abOpen ? (
    <div className="aboutApp floatTab dpShad">
      <div className="content p-6">
        <div className="text-xl font-semibold">About</div>
        <p>
          win11React is an open source project made in the hope to replicate the
          Windows 11 desktop experience on web, using standard web technologies
          like React, CSS, and JavaScript.
        </p>
        <p>
          This project is licensed under&nbsp;
          <a
            target="_blank"
            href="https://github.com/issgy/win11React/blob/main/LICENSE"
          >
            Creative Commons
          </a>
          .
        </p>
        <p className="pl-4">
          contact :&nbsp;
          <a target="_blank" href="mailto:xjmgsq@163.com">
            xjmgsq@163.com
          </a>
        </p>

        <p>
          This project is not in anyway affiliated with Microsoft and should not
          be confused with Microsoft's Operating System or Products.
        </p>
        <p>
          This is also not&nbsp;
          <a target="_blank" href="https://www.microsoft.com/en-in/windows-365">
            Windows 365 cloud PC
          </a>
          .
        </p>
        <p>
          Microsoft, Windows and Other demonstrated Products in this project are
          trademarks of the Microsoft group of companies.
        </p>
      </div>
      <div className="okbtn px-6 py-4">
        <div data-allow={timer == 0} onClick={timer == 0 ? action : null}>
          Ok, I understand {timer > 0 ? <span>{`( ${timer} )`}</span> : null}
        </div>
      </div>
    </div>
  ) : null;
};
