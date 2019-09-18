import { IPhoto } from "@src/core/IPhoto";
import { ICategory } from "../Category/State";

// -----------------
//#region STATE
export interface IResponseData {
  subcategories: ISubcategory[];
  categories: ICategory[];
}

export interface ISubcategory {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  isVisible: boolean;
  photo: IPhoto;
}

export interface ISubcategoryDTO {
  categoryId: string | null;
  subcategoryId: string | null;

  newCategoryId: string;

  alias: string;
  isVisible: boolean;
  file: File;
}

export interface ISubcategoryState {
  subcategoriesList: ISubcategory[];
  categoriesList: ICategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ISubcategoryState = {
  subcategoriesList: [],
  categoriesList: [],
  pending: false,
  errorInner: "",
};
//#endregion
