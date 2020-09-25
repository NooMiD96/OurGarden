import { IPhotoField } from "@src/core/interfaces/IPhoto";
import { ISeoParams } from "@src/core/interfaces/ISeoParams";
import { IDescription } from "@src/core/interfaces/IDescription";

// -----------------
// #region STATE
export interface IProduct extends ISeoParams, IDescription, IPhotoField {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
}

export interface IProductState {
  product: null | IProduct;
}

export const unloadedState: IProductState = {
  product: null,
};
// #endregion
