import { IProductList } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_PRODUCT_LIST_REQUEST = "GET_PRODUCT_LIST_REQUEST";
export const GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCT_LIST_SUCCESS";
export const GET_PRODUCT_LIST_ERROR = "GET_PRODUCT_LIST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetProductListRequest { type: typeof GET_PRODUCT_LIST_REQUEST }
export interface IGetProductListSuccess { type: typeof GET_PRODUCT_LIST_SUCCESS; payload: IProductList }
export interface IGetProductListError { type: typeof GET_PRODUCT_LIST_ERROR; errorMessage: string }
export type TGetProductList = IGetProductListRequest | IGetProductListSuccess | IGetProductListError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetProductList | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
