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
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IUserCardState = {
  productList: [],
  totalCount: 0,
  pending: false,
  errorInner: "",
};
// #endregion
