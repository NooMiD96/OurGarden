import { IAddProductToCard } from "@components/UserCard/actionsType";
import { IPhoto } from "@src/core/interfaces/IPhoto";

// -----------------
// #region ACTIONS TYPE
export const ADD_PRODUCT_TO_CARD = "ADD_PRODUCT_TO_CARD";
export const CLOSE_MODAL_WINDOW = "CLOSE_MODAL_WINDOW";
export const SHOW_PHOTO_MODAL_WINDOW = "SHOW_PHOTO_MODAL_WINDOW";
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

type KnownAction =
  | IShowPhotoModalWindow
  | IAddProductToCard
  | ICloseModalWindow;

export default KnownAction;
// #endregion
