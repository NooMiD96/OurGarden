import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { ICategoryDictionary } from "../Category/State";
import { IDefaultState } from "@src/core/IDefaultState";

// -----------------
//#region STATE
export interface IResponseData {
  subcategories: ISubcategory[];
  categories: ICategoryDictionary[];
}

export interface ISubcategory {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  isVisible: boolean;
  photos: IPhoto[];
}

export interface ISubcategoryDTO extends IMultiplyPhotoDTO {
  categoryId: string | null;
  subcategoryId: string | null;

  newCategoryId: string;

  alias: string;
  isVisible: boolean;
}

export interface ISubcategoryState extends IDefaultState {
  subcategoriesList: ISubcategory[];
  categoriesList: ICategoryDictionary[];
}

export const unloadedState: ISubcategoryState = {
  subcategoriesList: [],
  categoriesList: [],
  pending: false,
  errorInner: ""
};
//#endregion
