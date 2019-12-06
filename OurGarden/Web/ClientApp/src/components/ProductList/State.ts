import { IProduct } from "@components/Product/State";
import { ISubcategory } from "../Subcategory/State";

// -----------------
// #region STATE
export interface IProductListState {
  subcategory: ISubcategory | null;
  productList: IProduct[];
}

export const unloadedState: IProductListState = {
  subcategory: null,
  productList: []
};
// #endregion
