import { IUserCardProduct } from "../UserCard/State";

// -----------------
// #region ACTIONS TYPE
export const ADD_PRODUCT_TO_CARD = "ADD_PRODUCT_TO_CARD";
export const CLOSE_MODAL_WINDOW = "CLOSE_MODAL_WINDOW";
// #endregion
// -----------------
// #region ACTIONS INTERFACE

export interface IAddProductToCard {
  type: typeof ADD_PRODUCT_TO_CARD;
  payload: IUserCardProduct;
}

export interface ICloseModalWindow {
  type: typeof CLOSE_MODAL_WINDOW;
}

type KnownAction = IAddProductToCard | ICloseModalWindow;

export default KnownAction;
// #endregion
