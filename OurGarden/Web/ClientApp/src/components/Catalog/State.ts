import { IProduct } from "@components/Product/State";

// -----------------
//#region STATE
export interface ISubcategory {

}

export interface ICatalogState {
  subcategoryList: ISubcategory[];
  productList: IProduct[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ICatalogState = {
  subcategoryList: [],
  productList: [],
  pending: false,
  errorInner: "",
};
//#endregion
