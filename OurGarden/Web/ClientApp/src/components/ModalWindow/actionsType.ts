import { IAddProductToCard } from "@components/UserCard/actionsType";
import { IPhoto } from "@src/core/interfaces/IPhoto";

// -----------------
// #region ACTIONS TYPE
export const CLOSE_MODAL_WINDOW = "CLOSE_MODAL_WINDOW";
export const SHOW_PHOTO_MODAL_WINDOW = "SHOW_PHOTO_MODAL_WINDOW";
export const SHOW_FEEDBACK_MODAL_WINDOW = "SHOW_FEEDBACK_MODAL_WINDOW";
// #endregion
// -----------------
// #region ACTIONS INTERFACE

export interface IShowPhotoModalWindow {
  type: typeof SHOW_PHOTO_MODAL_WINDOW;
  selectedPhoto: IPhoto;
  photoList: IPhoto[];
}

export interface ICloseModalWindow {
  type: typeof CLOSE_MODAL_WINDOW;
}

export interface IShowFeedbackModalWindow {
  type: typeof SHOW_FEEDBACK_MODAL_WINDOW;
}

type KnownAction =
  | IShowPhotoModalWindow
  | IAddProductToCard
  | ICloseModalWindow
  | IShowFeedbackModalWindow;

export default KnownAction;
// #endregion
