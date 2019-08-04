import { IResponseData } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_SUBCATEGORY_LIST_REQUEST = "GET_SUBCATEGORY_LIST_REQUEST";
export const GET_SUBCATEGORY_LIST_SUCCESS = "GET_SUBCATEGORY_LIST_SUCCESS";
export const GET_SUBCATEGORY_LIST_ERROR = "GET_SUBCATEGORY_LIST_ERROR";

export const ADD_OR_UPDATE_SUBCATEGORY_REQUEST = "ADD_OR_UPDATE_SUBCATEGORY_REQUEST";
export const ADD_OR_UPDATE_SUBCATEGORY_SUCCESS = "ADD_OR_UPDATE_SUBCATEGORY_SUCCESS";
export const ADD_OR_UPDATE_SUBCATEGORY_ERROR = "ADD_OR_UPDATE_SUBCATEGORY_ERROR";

export const DELETE_SUBCATEGORY_REQUEST = "DELETE_SUBCATEGORY_REQUEST";
export const DELETE_SUBCATEGORY_SUCCESS = "DELETE_SUBCATEGORY_SUCCESS";
export const DELETE_SUBCATEGORY_ERROR = "DELETE_SUBCATEGORY_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetSubcategoryListRequest { type: typeof GET_SUBCATEGORY_LIST_REQUEST }
export interface IGetSubcategoryListSuccess { type: typeof GET_SUBCATEGORY_LIST_SUCCESS; payload: IResponseData }
export interface IGetSubcategoryListError { type: typeof GET_SUBCATEGORY_LIST_ERROR; errorMessage: string }
export type TGetSubcategoryList = IGetSubcategoryListRequest | IGetSubcategoryListSuccess | IGetSubcategoryListError;

export interface IAddOrUpdateSubcategoryRequest { type: typeof ADD_OR_UPDATE_SUBCATEGORY_REQUEST }
export interface IAddOrUpdateSubcategorySuccess { type: typeof ADD_OR_UPDATE_SUBCATEGORY_SUCCESS; payload: boolean }
export interface IAddOrUpdateSubcategoryError { type: typeof ADD_OR_UPDATE_SUBCATEGORY_ERROR; errorMessage: string }
export type TAddOrUpdateSubcategory = IAddOrUpdateSubcategoryRequest | IAddOrUpdateSubcategorySuccess | IAddOrUpdateSubcategoryError;

export interface IDeleteSubcategoryRequest { type: typeof DELETE_SUBCATEGORY_REQUEST }
export interface IDeleteSubcategorySuccess { type: typeof DELETE_SUBCATEGORY_SUCCESS; payload: boolean }
export interface IDeleteSubcategoryError { type: typeof DELETE_SUBCATEGORY_ERROR; errorMessage: string }
export type IDeleteSubcategory = IDeleteSubcategoryRequest | IDeleteSubcategorySuccess | IDeleteSubcategoryError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetSubcategoryList | TAddOrUpdateSubcategory | IDeleteSubcategory
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
