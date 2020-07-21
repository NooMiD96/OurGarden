import { IPhoto } from "@src/core/interfaces/IPhoto";
import { ISeoParams } from "@src/core/interfaces/ISeoParams";
import { IDescription } from "@src/core/interfaces/IDescription";

// -----------------
// #region STATE
export interface INew extends ISeoParams, IDescription {
  newsId: string;
  date: Date;
  alias: string;
  photos: IPhoto[];
}

export interface INewsState {
  selectedNew: INew | null;
}

export const unloadedState: INewsState = {
  selectedNew: null,
};
// #endregion
