import { IPageSeoInformation } from "./State";

// -----------------
// #region ACTIONS TYPE
export const GET_PAGE_SEO_INFORMATION = "GET_PAGE_SEO_INFORMATION";
export const SET_PAGE_SEO_INFORMATION = "SET_PAGE_SEO_INFORMATION";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetPageSeoInformation {
  type: typeof GET_PAGE_SEO_INFORMATION;
  /**
   * Ключ по которому идёт запрос
   */
  payload?: string;
}
export interface ISetPageSeoInformation {
  type: typeof SET_PAGE_SEO_INFORMATION;
  /**
   * Объект из ключа и СЕО информации
   */
  payload: { pageSeoInformation: IPageSeoInformation; key: string };
}

type KnownAction = IGetPageSeoInformation | ISetPageSeoInformation;

export default KnownAction;
// #endregion
