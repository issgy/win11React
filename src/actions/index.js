export const refresh = (dispatch) => {
  // 刷新操作
  dispatch({ type: "MENUHIDE" });
  dispatch({ type: "DESKHIDE" });
  setTimeout(() => dispatch({ type: "DESKSHOW" }), 100);
};
