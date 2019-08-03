import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface IProduct {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  descriprion: string;
  photos: IPhoto[];
}

export interface ICategoryDictionary {
  categoryId: string;
  subcategories: { subcategoryId: string }[];
}

export interface IProductDTO {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  descriprion: string;
  url: string;
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
