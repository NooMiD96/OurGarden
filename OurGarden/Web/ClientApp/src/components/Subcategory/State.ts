import { IPhoto } from "@src/core/IPhoto";
import { ICategory } from "../Category/State";

// -----------------
// #region STATE
export interface ISubcategory {
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
