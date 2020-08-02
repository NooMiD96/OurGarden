import { IProduct } from "../Product/State";
import { IPhoto } from "@src/core/interfaces/IPhoto";

// -----------------
// #region STATE
export enum ModalOpenType {
  Closed,
  AddToCard,
  Photo,
}

export interface IPhotoModalState {
  selectedPhoto: IPhoto;
  photoList: IPhoto[];
}

export interface IModalWindowState {
  modalOpenType: ModalOpenType;
  newProductInCard: IProduct | null;
  photoState: IPhotoModalState | null;
}

export const unloadedState: IModalWindowState = {
  modalOpenType: ModalOpenType.Closed,
  newProductInCard: null,
  photoState: null,
};
// #endregion
