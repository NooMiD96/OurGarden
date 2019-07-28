import { ICategory } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_CATEGORY_LIST_REQUEST = "GET_CATEGORY_LIST_REQUEST";
export const GET_CATEGORY_LIST_SUCCESS = "GET_CATEGORY_LIST_SUCCESS";
export const GET_CATEGORY_LIST_ERROR = "GET_CATEGORY_LIST_ERROR";

export const ADD_CATEGORY_REQUEST = "ADD_CATEGORY_REQUEST";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetCategoryListRequest { type: typeof GET_CATEGORY_LIST_REQUEST }
export interface IGetCategoryListSuccess { type: typeof GET_CATEGORY_LIST_SUCCESS; payload: ICategory[] }
export interface IGetCategoryListError { type: typeof GET_CATEGORY_LIST_ERROR; errorMessage: string }
export type TGetCategoryList = IGetCategoryListRequest | IGetCategoryListSuccess | IGetCategoryListError;

export interface IAddCategoryRequest { type: typeof ADD_CATEGORY_REQUEST }
export interface IAddCategorySuccess { type: typeof ADD_CATEGORY_SUCCESS; payload: boolean }
export interface IAddCategoryError { type: typeof ADD_CATEGORY_ERROR; errorMessage: string }
export type TAddCategory = IAddCategoryRequest | IAddCategorySuccess | IAddCategoryError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetCategoryList | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
