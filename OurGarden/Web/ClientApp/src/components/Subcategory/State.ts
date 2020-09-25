import { IPhotoField } from "@src/core/interfaces/IPhoto";
import { ICategory } from "../Category/State";
import { ISeoParams } from "@src/core/interfaces/ISeoParams";
import { IDescription } from "@src/core/interfaces/IDescription";

// -----------------
// #region STATE
export interface ISubcategory extends ISeoParams, IDescription, IPhotoField {
  subcategoryId: string;
  categoryId: string;
  alias: string;
}

export interface ISubcategoryState {
  category: ICategory | null;
  subcategoryList: ISubcategory[];
}

export const unloadedState: ISubcategoryState = {
  category: null,
  subcategoryList: [],
};
// #endregion
