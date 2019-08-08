import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface IProduct {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  description: string;
  photos: IPhoto[];
}

export interface ICategoryDictionary {
  categoryId: string;
  alias: string;
  subcategories: {
    subcategoryId: string;
    alias: string;
  }[];
}

export interface IProductDTO {
  categoryId: string | null;
  subcategoryId: string | null;
  productId: string | null;

  newCategoryId: string;
  newSubcategoryId: string;

  alias: string;
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
  errorInner: "",
};
//#endregion
