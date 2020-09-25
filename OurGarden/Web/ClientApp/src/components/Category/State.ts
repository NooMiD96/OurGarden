import { IPhotoField } from "@src/core/interfaces/IPhoto";
import { ISeoParams } from "@src/core/interfaces/ISeoParams";
import { IDescription } from "@src/core/interfaces/IDescription";

// -----------------
// #region STATE
export interface ICategory extends ISeoParams, IDescription, IPhotoField {
  categoryId: string;
  alias: string;
}

export interface ICategoryState {
  categoryList: ICategory[];
}

export const unloadedState: ICategoryState = {
  categoryList: [],
};
// #endregion
