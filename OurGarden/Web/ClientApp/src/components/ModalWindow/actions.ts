import * as t from "./actionsType";

// ----------------
// #region ACTIONS
export const actionsList = {
  closeModalWindow: (): t.ICloseModalWindow => ({
    type: t.CLOSE_MODAL_WINDOW
  })
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  closeModalWindow: actionsList.closeModalWindow
};
// #endregion
