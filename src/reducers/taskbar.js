import { taskApps } from "../utils";

const defState = {
  apps: taskApps,
  align: "center",
  prev: false,
  prevApp: "",
  prevPos: 0,
  search: true,
  widgets: true,
  audio: 2,
};

const taskReducer = (state = defState, action) => {
  switch (action.type) {
    case "TASKTOG":
      return {
        ...state,
        align: state.align === "left" ? "center" : "left",
      };
    case "TASKPSHOW":
      return {
        ...state,
        prev: true,
        prevApp: (action.payload && action.payload.app) || "store",
        prevPos: (action.payload && action.payload.pos) || 50,
      };
    case "TASKPHIDE":
      return {
        ...state,
        prev: false,
      };
    case "TASKSRCH":
      return {
        ...state,
        search: action.payload === "true",
      };
    case "TASKWIDG":
      return {
        ...state,
        widgets: action.payload === "true",
      };
    case "TASKAUDIO":
      return {
        ...state,
        audio: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
