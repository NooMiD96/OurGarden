import * as t from "./actionsType";

import { IPhoto } from "@src/core/interfaces/IPhoto";
import { IFeedbackModalState } from "./State";

// ----------------
// #region ACTIONS
export const actionsList = {
  closeModalWindow: (): t.ICloseModalWindow => ({
    type: t.CLOSE_MODAL_WINDOW,
  }),
  showPhotoModalWindow: (
    selectedPhoto: IPhoto,
    photoList: IPhoto[]
  ): t.IShowPhotoModalWindow => ({
    type: t.SHOW_PHOTO_MODAL_WINDOW,
    selectedPhoto,
    photoList,
  }),
  showFeedbackModalWindow: ({
    product,
  }: IFeedbackModalState): t.IShowFeedbackModalWindow => ({
    type: t.SHOW_FEEDBACK_MODAL_WINDOW,
    product,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  closeModalWindow: actionsList.closeModalWindow,
  showPhotoModalWindow: actionsList.showPhotoModalWindow,
  showFeedbackModalWindow: actionsList.showFeedbackModalWindow,
};
// #endregion
