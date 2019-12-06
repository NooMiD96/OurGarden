import { IProduct } from "../Product/State";

// -----------------
// #region STATE
export interface IUserCardProduct {
  count: number;
  product: IProduct;
}

export interface IUserCardState {
  productList: IUserCardProduct[];
  totalCount: number;
}

export const unloadedState: IUserCardState = {
  productList: [],
  totalCount: 0
};
// #endregion
