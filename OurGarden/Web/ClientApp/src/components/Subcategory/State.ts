import { IPhoto } from "@src/core/IPhoto";
import { ICategory } from "../Category/State";
import { ISeoParams } from "@src/core/ISeoParams";
import { IDescription } from "@src/core/IDescription";

// -----------------
// #region STATE
export interface ISubcategory extends ISeoParams, IDescription {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  photos: IPhoto[];
}

export interface ISubcategoryState {
  category: ICategory | null;
  subcategoryList: ISubcategory[];
}

export const unloadedState: ISubcategoryState = {
  category: null,
  subcategoryList: []
};
// #endregion
