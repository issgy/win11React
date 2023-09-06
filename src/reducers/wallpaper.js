//默认壁纸设置
const defState = {
  theme: "default",
  src: "img0.jpg",
};

const wallReducer = (state = defState, action) => {
  if (action.payload) {
    return {
      them: action.type,
      src: action.src,
    };
  } else {
    return state;
  }
};

export default wallReducer;
