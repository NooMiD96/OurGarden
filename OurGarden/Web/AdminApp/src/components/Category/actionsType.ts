import { ICategory } from "./State";

// -----------------
// #region ACTIONS TYPE
export const GET_CATEGORY_LIST_REQUEST = "GET_CATEGORY_LIST_REQUEST";
export const GET_CATEGORY_LIST_SUCCESS = "GET_CATEGORY_LIST_SUCCESS";
export const GET_CATEGORY_LIST_ERROR = "GET_CATEGORY_LIST_ERROR";

export const ADD_OR_UPDATE_CATEGORY_REQUEST = "ADD_OR_UPDATE_CATEGORY_REQUEST";
export const ADD_OR_UPDATE_CATEGORY_SUCCESS = "ADD_OR_UPDATE_CATEGORY_SUCCESS";
export const ADD_OR_UPDATE_CATEGORY_ERROR = "ADD_OR_UPDATE_CATEGORY_ERROR";

export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_ERROR = "DELETE_CATEGORY_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetCategoryListRequest { type: typeof GET_CATEGORY_LIST_REQUEST }
export interface IGetCategoryListSuccess { type: typeof GET_CATEGORY_LIST_SUCCESS; payload: ICategory[] }
export interface IGetCategoryListError { type: typeof GET_CATEGORY_LIST_ERROR; errorMessage: string }
export type TGetCategoryList = IGetCategoryListRequest | IGetCategoryListSuccess | IGetCategoryListError;

export interface IAddOrUpdateCategoryRequest { type: typeof ADD_OR_UPDATE_CATEGORY_REQUEST }
export interface IAddOrUpdateCategorySuccess { type: typeof ADD_OR_UPDATE_CATEGORY_SUCCESS; payload: boolean }
export interface IAddOrUpdateCategoryError { type: typeof ADD_OR_UPDATE_CATEGORY_ERROR; errorMessage: string }
export type TAddOrUpdateCategory = IAddOrUpdateCategoryRequest | IAddOrUpdateCategorySuccess | IAddOrUpdateCategoryError;

export interface IDeleteCategoryRequest { type: typeof DELETE_CATEGORY_REQUEST }
export interface IDeleteCategorySuccess { type: typeof DELETE_CATEGORY_SUCCESS; payload: boolean }
export interface IDeleteCategoryError { type: typeof DELETE_CATEGORY_ERROR; errorMessage: string }
export type IDeleteCategory = IDeleteCategoryRequest | IDeleteCategorySuccess | IDeleteCategoryError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetCategoryList | TAddOrUpdateCategory | IDeleteCategory
  | ICleanErrorInnerAction;

export default KnownAction;
// #endregion
