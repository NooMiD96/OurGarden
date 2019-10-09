import { IPhoto } from "@src/core/IPhoto";
import { ICategoryDictionary } from "@components/Category/State";

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

export interface IProductDTO {
  categoryId: string | null;
  subcategoryId: string | null;
  productId: string | null;

  newCategoryId: string;
  newSubcategoryId: string;

  alias: string;
  isVisible: boolean;
  price: number;
  description: string;
  file: File;
}

export interface IProductState {
  listItem: IProduct[];
  categoryList: ICategoryDictionary[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IProductState = {
  listItem: [],
  categoryList: [],
  pending: false,
  errorInner: ""
};
//#endregion
