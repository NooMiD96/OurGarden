import { IProduct } from "../Product/State";

// -----------------
// #region STATE
export enum ModalType {
  Closed,
  NewProduct,
}

export interface IModalWindowState {
  newProductInCard: IProduct | null;
}

export const unloadedState: IModalWindowState = {
  newProductInCard: null,
};
// #endregion
