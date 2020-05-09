import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";
import { ISeoParams } from "@src/core/ISeoParams";

// -----------------
// #region STATE
export interface INews extends ISeoParams {
  newsId: number;
  title: string;
  date: string;
  alias: string;
  description: string;
  photos: IPhoto[];
}

export interface INewsDTO extends IMultiplyPhotoDTO, ISeoParams {
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
