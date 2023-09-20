import { taskApps } from "../utils";

const defState = {
  apps: taskApps,
  align: "center",
  prev: false,
  prevApp: "",
  prevPos: 0,
};

const taskReducer = (state = defState, action) => {
  switch (action.type) {
    // case "TASKCEN":
    //   return {
    //     apps: state.apps,
    //     align: "center",
    //   };
    // case "TASKLEF":
    //   return {
    //     apps: state.apps,
    //     align: "left",
    //   };
    // case "TASKTOG":
    //   return {
    //     apps: state.apps,
    //     align: state.align === "left" ? "center" : "left",
    //   };
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
    default:
      return state;
  }
};

export default taskReducer;
