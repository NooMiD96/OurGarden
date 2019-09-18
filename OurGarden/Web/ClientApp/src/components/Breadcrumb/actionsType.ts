import { IBreadcrumb } from "./State";
// -----------------
// #region ACTIONS TYPE
export const GET_BREADCRUMB = "GET_BREADCRUMB";
export const SET_BREADCRUMB = "SET_BREADCRUMB";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetBreadcrumb { type: typeof GET_BREADCRUMB }
export interface ISetBreadcrumb { type: typeof SET_BREADCRUMB; payload: { breadcrumb: IBreadcrumb[], key: string } }

type KnownAction = ISetBreadcrumb | IGetBreadcrumb;

export default KnownAction;
// #endregion
