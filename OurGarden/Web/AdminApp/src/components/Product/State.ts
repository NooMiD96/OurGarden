import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { ICategoryDictionary } from "@components/Category/State";
import { IDefaultState } from "@src/core/IDefaultState";

// -----------------
//#region STATE
export interface IProduct {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  isVisible: boolean;
  price: number;
  description: string;
  photos: IPhoto[];
}

export interface IProductDTO extends IMultiplyPhotoDTO {
  categoryId: string | null;
  subcategoryId: string | null;
  productId: string | null;

  newCategoryId: string;
  newSubcategoryId: string;

  alias: string;
  isVisible: boolean;
  price: number;
  description: string;
}

export interface IProductState extends IDefaultState {
  listItem: IProduct[];
  categoryList: ICategoryDictionary[];
}

export const unloadedState: IProductState = {
  listItem: [],
  categoryList: [],
  pending: false,
  errorInner: ""
};
//#endregion
