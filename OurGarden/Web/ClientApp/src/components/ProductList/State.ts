import { IProduct } from "@components/Product/State";

// -----------------
//#region STATE

export interface IProductListState {
  productList: IProduct[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IProductListState = {
  productList: [],
  pending: false,
  errorInner: "",
};
//#endregion
