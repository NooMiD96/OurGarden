import { IProduct } from "../Product/State";
import { IPhoto } from "@src/core/interfaces/IPhoto";

// -----------------
// #region STATE
// eslint-disable-next-line no-shadow
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

export interface IFeedbackModalState {
  product?: IProduct;
}

export interface IModalWindowState {
  modalOpenType: ModalOpenType;
  newProductInCardState: IProduct | null;
  photoState: IPhotoModalState | null;
  feedbackState: IFeedbackModalState | null;
}

export const unloadedState: IModalWindowState = {
  modalOpenType: ModalOpenType.Closed,
  newProductInCardState: null,
  photoState: null,
  feedbackState: null,
};
// #endregion
