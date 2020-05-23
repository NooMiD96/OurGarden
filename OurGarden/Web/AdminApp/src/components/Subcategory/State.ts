import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IItemDictionary } from "../Category/State";
import { IDefaultState } from "@src/core/IDefaultState";
import { ISeoParams } from "@src/core/ISeoParams";
import { IDescription } from "@src/core/IDescription";

// -----------------
// #region STATE
export interface IResponseData {
  subcategories: ISubcategory[];
  categories: IItemDictionary[];
}

export interface ISubcategory extends ISeoParams, IDescription {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  isVisible: boolean;
  photos: IPhoto[];
}

export interface ISubcategoryDTO extends IMultiplyPhotoDTO, ISeoParams, IDescription {
  categoryId: string | null;
  subcategoryId: string | null;

  newCategoryId: string;

  alias: string;
  isVisible: boolean;
}

export interface ISubcategoryState extends IDefaultState {
  subcategoriesList: ISubcategory[];
  categoriesList: IItemDictionary[];
}

export const unloadedState: ISubcategoryState = {
  subcategoriesList: [],
  categoriesList: [],
  pending: false,
  errorInner: ""
};
// #endregion
