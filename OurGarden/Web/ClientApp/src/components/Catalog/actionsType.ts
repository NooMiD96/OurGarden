import { ISubcategory } from "./State";
import { IProduct } from "@components/Product/State";

// -----------------
//#region ACTIONS TYPE
export const GET_SUBCATEGORY_LIST_REQUEST = "GET_SUBCATEGORY_LIST_REQUEST";
export const GET_SUBCATEGORY_LIST_SUCCESS = "GET_SUBCATEGORY_LIST_SUCCESS";
export const GET_SUBCATEGORY_LIST_ERROR = "GET_SUBCATEGORY_LIST_ERROR";

export const GET_PRODUCT_LIST_REQUEST = "GET_PRODUCT_LIST_REQUEST";
export const GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCT_LIST_SUCCESS";
export const GET_PRODUCT_LIST_ERROR = "GET_PRODUCT_LIST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetSubcategoryListRequest { type: typeof GET_SUBCATEGORY_LIST_REQUEST }
export interface IGetSubcategoryListSuccess { type: typeof GET_SUBCATEGORY_LIST_SUCCESS; payload: ISubcategory[] }
export interface IGetSubcategoryListError { type: typeof GET_SUBCATEGORY_LIST_ERROR; errorMessage: string }
export type TGetSubcategoryList = IGetSubcategoryListRequest | IGetSubcategoryListSuccess | IGetSubcategoryListError;

export interface IGetProductListRequest { type: typeof GET_PRODUCT_LIST_REQUEST }
export interface IGetProductListSuccess { type: typeof GET_PRODUCT_LIST_SUCCESS; payload: IProduct[] }
export interface IGetProductListError { type: typeof GET_PRODUCT_LIST_ERROR; errorMessage: string }
export type TGetProductList = IGetProductListRequest | IGetProductListSuccess | IGetProductListError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetSubcategoryList | TGetProductList
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
