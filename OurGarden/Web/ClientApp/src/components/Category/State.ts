import { IPhoto } from "@src/core/IPhoto";
import { IDescription } from "@src/core/IDescription";
import { ISeoParams } from "@src/core/ISeoParams";

// -----------------
// #region STATE
export interface ICategory extends ISeoParams, IDescription {
  categoryId: string;
  alias: string;
  photos: IPhoto[];
}

export interface ICategoryState {
  categoryList: ICategory[];
}

export const unloadedState: ICategoryState = {
  categoryList: []
};
// #endregion
