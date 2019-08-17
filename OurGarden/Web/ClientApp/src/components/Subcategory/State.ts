import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface ISubcategory {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  photo: IPhoto;
}

export interface ISubcategoryState {
  subcategoryList: ISubcategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ISubcategoryState = {
  subcategoryList: [],
  pending: false,
  errorInner: "",
};
//#endregion
