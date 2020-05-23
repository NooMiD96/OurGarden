import { IPhoto } from "@src/core/IPhoto";
import { ISeoParams } from "@src/core/ISeoParams";
import { IDescription } from "@src/core/IDescription";

// -----------------
// #region STATE
export interface IProduct extends ISeoParams, IDescription {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  photos: IPhoto[];
}

export interface IProductState {
  product: null | IProduct;
}

export const unloadedState: IProductState = {
  product: null
};
// #endregion
