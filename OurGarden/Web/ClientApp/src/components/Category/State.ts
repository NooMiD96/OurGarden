import { IPhoto } from "@src/core/interfaces/IPhoto";
import { ISeoParams } from "@src/core/interfaces/ISeoParams";
import { IDescription } from "@src/core/interfaces/IDescription";

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
  categoryList: [],
};
// #endregion
