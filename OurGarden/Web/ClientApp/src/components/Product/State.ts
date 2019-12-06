import { IPhoto } from "@src/core/IPhoto";

// -----------------
// #region STATE
export interface IProduct {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  description: string;
  photos: IPhoto[];
}

export interface IProductState {
  product: null | IProduct;
}

export const unloadedState: IProductState = {
  product: null
};
// #endregion
