import { IProduct } from "./State";
import { IItemDictionary } from "@components/Category/State";

// -----------------
// #region ACTIONS TYPE
export const GET_PRODUCT_LIST_REQUEST = "GET_PRODUCT_LIST_REQUEST";
export const GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCT_LIST_SUCCESS";
export const GET_PRODUCT_LIST_ERROR = "GET_PRODUCT_LIST_ERROR";

export const GET_CATEGORY_DICTIONARY_LIST_REQUEST
  = "GET_CATEGORY_DICTIONARY_LIST_REQUEST";
export const GET_CATEGORY_DICTIONARY_LIST_SUCCESS
  = "GET_CATEGORY_DICTIONARY_LIST_SUCCESS";
export const GET_CATEGORY_DICTIONARY_LIST_ERROR
  = "GET_CATEGORY_DICTIONARY_LIST_ERROR";

export const ADD_OR_UPDATE_PRODUCT_REQUEST = "ADD_OR_UPDATE_PRODUCT_REQUEST";
export const ADD_OR_UPDATE_PRODUCT_SUCCESS = "ADD_OR_UPDATE_PRODUCT_SUCCESS";
export const ADD_OR_UPDATE_PRODUCT_ERROR = "ADD_OR_UPDATE_PRODUCT_ERROR";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
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
  errorMessage: string;
}
export type TGetProductList =
  | IGetProductListRequest
  | IGetProductListSuccess
  | IGetProductListError;

export interface IGetCategoryDictionaryRequest {
  type: typeof GET_CATEGORY_DICTIONARY_LIST_REQUEST;
}
export interface IGetCategoryDictionarySuccess {
  type: typeof GET_CATEGORY_DICTIONARY_LIST_SUCCESS;
  payload: IItemDictionary[];
}
export interface IGetCategoryDictionaryError {
  type: typeof GET_CATEGORY_DICTIONARY_LIST_ERROR;
  errorMessage: string;
}
export type TGetCategoryDictionary =
  | IGetCategoryDictionaryRequest
  | IGetCategoryDictionarySuccess
  | IGetCategoryDictionaryError;

export interface IAddOrUpdateProductRequest {
  type: typeof ADD_OR_UPDATE_PRODUCT_REQUEST;
}
export interface IAddOrUpdateProductSuccess {
  type: typeof ADD_OR_UPDATE_PRODUCT_SUCCESS;
  payload: boolean;
}
export interface IAddOrUpdateProductError {
  type: typeof ADD_OR_UPDATE_PRODUCT_ERROR;
  errorMessage: string;
}
export type TAddOrUpdateProduct =
  | IAddOrUpdateProductRequest
  | IAddOrUpdateProductSuccess
  | IAddOrUpdateProductError;

export interface IDeleteProductRequest {
  type: typeof DELETE_PRODUCT_REQUEST;
}
export interface IDeleteProductSuccess {
  type: typeof DELETE_PRODUCT_SUCCESS;
  payload: boolean;
}
export interface IDeleteProductError {
  type: typeof DELETE_PRODUCT_ERROR;
  errorMessage: string;
}
export type IDeleteProduct =
  | IDeleteProductRequest
  | IDeleteProductSuccess
  | IDeleteProductError;

export interface ICleanErrorInnerAction {
  type: typeof CLEAN_ERROR_INNER;
}

type KnownAction =
  | TGetProductList
  | TGetCategoryDictionary
  | TAddOrUpdateProduct
  | IDeleteProduct
  | ICleanErrorInnerAction;

export default KnownAction;
// #endregion
