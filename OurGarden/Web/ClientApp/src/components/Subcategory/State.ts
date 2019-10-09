import { IPhoto } from "@src/core/IPhoto";
import { ICategory } from "../Category/State";

// -----------------
//#region STATE
export interface ISubcategory {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  photo: IPhoto;
}

export interface ISubcategoryState {
  category: ICategory | null;
  subcategoryList: ISubcategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ISubcategoryState = {
  category: null,
  subcategoryList: [],
  pending: false,
  errorInner: ""
};
//#endregion
