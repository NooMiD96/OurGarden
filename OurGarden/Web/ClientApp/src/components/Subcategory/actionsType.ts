import { ISubcategory } from "./State";
import { ICategory } from "../Category/State";

// -----------------
// #region ACTIONS TYPE
export const GET_SUBCATEGORY_LIST_REQUEST = "GET_SUBCATEGORY_LIST_REQUEST";
export const GET_SUBCATEGORY_LIST_SUCCESS = "GET_SUBCATEGORY_LIST_SUCCESS";
export const GET_SUBCATEGORY_LIST_ERROR = "GET_SUBCATEGORY_LIST_ERROR";

export const SAVE_CATEGORY = "SAVE_CATEGORY";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetSubcategoryListRequest {
  type: typeof GET_SUBCATEGORY_LIST_REQUEST;
}
export interface IGetSubcategoryListSuccess {
  type: typeof GET_SUBCATEGORY_LIST_SUCCESS;
  payload: ISubcategory[];
}
export interface IGetSubcategoryListError {
  type: typeof GET_SUBCATEGORY_LIST_ERROR;
}
export type TGetSubcategoryList =
  | IGetSubcategoryListRequest
  | IGetSubcategoryListSuccess
  | IGetSubcategoryListError;

export interface ISaveCategory {
  type: typeof SAVE_CATEGORY;
  payload: ICategory;
}

type KnownAction = TGetSubcategoryList | ISaveCategory;

export default KnownAction;
// #endregion
