import { ICategory } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_CATEGORY_LIST_REQUEST = "GET_CATEGORY_LIST_REQUEST";
export const GET_CATEGORY_LIST_SUCCESS = "GET_CATEGORY_LIST_SUCCESS";
export const GET_CATEGORY_LIST_ERROR = "GET_CATEGORY_LIST_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetCategoryListRequest { type: typeof GET_CATEGORY_LIST_REQUEST }
export interface IGetCategoryListSuccess { type: typeof GET_CATEGORY_LIST_SUCCESS; payload: ICategory[] }
export interface IGetCategoryListError { type: typeof GET_CATEGORY_LIST_ERROR; errorMessage: string }
export type TGetCategoryList = IGetCategoryListRequest | IGetCategoryListSuccess | IGetCategoryListError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetCategoryList | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
