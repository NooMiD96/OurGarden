import { IProduct } from "../Product/State";
import { IPhoto } from "@src/core/interfaces/IPhoto";

// -----------------
// #region STATE
export enum ModalOpenType {
  Closed,
  AddToCard,
  Photo,
  Feedback,
}

export interface IPhotoModalState {
  selectedPhoto: IPhoto;
  photoList: IPhoto[];
}

export interface IModalWindowState {
  modalOpenType: ModalOpenType;
  newProductInCardState: IProduct | null;
  photoState: IPhotoModalState | null;
}

export const unloadedState: IModalWindowState = {
  modalOpenType: ModalOpenType.Closed,
  newProductInCardState: null,
  photoState: null,
};
// #endregion
