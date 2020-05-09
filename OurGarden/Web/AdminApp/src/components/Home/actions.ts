import * as t from "./actionsType";

// ----------------
// #region ACTIONS
export const actionsList = {
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  cleanErrorInner: actionsList.cleanErrorInner,
};
// #endregion
