import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToolBar, Icon } from "../../../utils/general";

export const Camera = () => {
  const apps = useSelector((state) => state.apps);
  const wnapp = useSelector((state) => state.apps.camera);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    //   在canvas上绘制图像
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!wnapp.hide) {
      videoRef.current.setAttribute("playsinline", "");
      videoRef.current.setAttribute("autoplay", "");
      videoRef.current.setAttribute("muted", "");
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 2048,
            height: 1024,
          },
        }) //返回一个Promise对象。该对象包含所请求的媒体流。如果发生错误，则会拒绝并把错误信息传递给错误处理程序。
        .then((dstream) => {
          setStream(dstream);
          videoRef.current.srcObject = dstream;
        })
        .catch(function (error) {
          console.log("获取媒体流失败: ", error);
        });
    } else {
      if (stream != null) stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [wnapp.hide]);

  return (
    <div
      className="wnCam floatTab dpShad"
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
        name="Camera"
        invert
        bg="#060606"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <div className="camcont">
            <div className="camctrl">
              <div className="cmicon" title="Take photo" onClick={capture}>
                <Icon icon="camera" />
              </div>
              <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
            <div className="vidcont">
              <div className="vidwrap">
                <video id="video" ref={videoRef}></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
