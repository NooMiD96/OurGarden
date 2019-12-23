import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";

// -----------------
// #region STATE
export interface INews {
  newsId: number;
  title: string;
  date: string;
  alias: string;
  description: string;
  photos: IPhoto[];
}

export interface INewsDTO extends IMultiplyPhotoDTO {
  newsId: number;
  title: string;
  description: string;
}

export interface INewsState extends IDefaultState {
  listItem: INews[];
}

export const unloadedState: INewsState = {
  listItem: [],
  pending: false,
  errorInner: ""
};
// #endregion
