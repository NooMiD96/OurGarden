import { IProduct } from "@components/Product/State";
import { ISubcategory } from "../Subcategory/State";

// -----------------
// #region ACTIONS TYPE
export const GET_PRODUCT_LIST_REQUEST = "GET_PRODUCT_LIST_REQUEST";
export const GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCT_LIST_SUCCESS";
export const GET_PRODUCT_LIST_ERROR = "GET_PRODUCT_LIST_ERROR";

export const CLEAN_PRODUCT_LIST = "CLEAN_PRODUCT_LIST";

export const SAVE_SUBCATEGORY = "SAVE_SUBCATEGORY";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetProductListRequest {
  type: typeof GET_PRODUCT_LIST_REQUEST;
}
export interface IGetProductListSuccess {
  type: typeof GET_PRODUCT_LIST_SUCCESS;
  payload: IProduct[];
}
export interface IGetProductListError {
  type: typeof GET_PRODUCT_LIST_ERROR;
}
export type TGetProductList =
  | IGetProductListRequest
  | IGetProductListSuccess
  | IGetProductListError;

export interface ICleanProductList {
  type: typeof CLEAN_PRODUCT_LIST;
}

export interface ISaveSubcategory {
  type: typeof SAVE_SUBCATEGORY;
  payload: ISubcategory;
}

type KnownAction = TGetProductList | ICleanProductList | ISaveSubcategory;

export default KnownAction;
// #endregion
