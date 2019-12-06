import { IProduct } from "./State";

// -----------------
// #region ACTIONS TYPE
export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetProductRequest {
  type: typeof GET_PRODUCT_REQUEST;
}
export interface IGetProductSuccess {
  type: typeof GET_PRODUCT_SUCCESS;
  payload: IProduct;
}
export interface IGetProductError {
  type: typeof GET_PRODUCT_ERROR;
}
export type TGetProduct =
  | IGetProductRequest
  | IGetProductSuccess
  | IGetProductError;

type KnownAction = TGetProduct;

export default KnownAction;
// #endregion
