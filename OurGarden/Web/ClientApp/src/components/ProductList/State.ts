import { IProduct } from "@components/Product/State";
import { ISubcategory } from "../Subcategory/State";

// -----------------
//#region STATE

export interface IProductListState {
  subcategory: ISubcategory | null;
  productList: IProduct[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IProductListState = {
  subcategory: null,
  productList: [],
  pending: false,
  errorInner: ""
};
//#endregion
