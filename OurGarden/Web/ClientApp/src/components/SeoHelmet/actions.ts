import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import * as mainTypes from "../Main/State/actionsType";
import { actionCreators as mainActions } from "../Main/State/actions";

import { IPageSeoInformation, unloadedState } from "./State";
import { ResponseError } from "@src/core/declarations/ResponseError";

// ----------------
// #region ACTIONS
export const actionsList = {
  getPageSeoInformation: (pageKey: string): t.IGetPageSeoInformation => ({
    type: t.GET_PAGE_SEO_INFORMATION,
    payload: pageKey,
  }),
  setPageSeoInformation: (payload: {
    pageSeoInformation?: IPageSeoInformation;
    key: string;
  }): t.ISetPageSeoInformation => ({
    type: t.SET_PAGE_SEO_INFORMATION,
    payload,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Home";
export const actionCreators = {
  getPageSeoInformation: (
    pathname: string
  ): IAppThunkAction<
    | t.IGetPageSeoInformation
    | t.ISetPageSeoInformation
    | mainTypes.IPageNotFoundError
  > => (dispatch, getState) => {
    const currentKey = getState().pageSeoInformation.key;

    if (currentKey === pathname) {
      return;
    }
    dispatch(
      actionsList.setPageSeoInformation({
        key: pathname,
      })
    );

    const apiUrl = "GetPageSEOParams";
    const encodedPathname = encodeURIComponent(pathname);

    const fetchUrl = `/api/${controllerName}/${apiUrl}?pathname=${encodedPathname}`;
    const fetchProps: RequestInit = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const fetchTask = fetch(fetchUrl, fetchProps)
      .then((res: Response) => {
        if (res.status === 404) {
          dispatch(mainActions.pageNotFoundError(true));
        }
        return responseCatcher(res);
      })
      .then(
        (value: IResponse<IPageSeoInformation & { isPageExists: boolean }>) => {
          if (value?.error) {
            return errorCreater({ message: value.error });
          }

          const { isPageExists, ...pageSeoInformation } = value.data;

          if (!isPageExists) {
            dispatch(mainActions.pageNotFoundError(true));
          }
          dispatch(
            actionsList.setPageSeoInformation({
              pageSeoInformation,
              key: pathname,
            })
          );

          return Promise.resolve();
        }
      )
      .catch((err: ResponseError) => {
        dispatch(mainActions.pageNotFoundError(true));
        dispatch(actionsList.setPageSeoInformation(unloadedState));
        errorCatcher(controllerName, apiUrl, err);
      });

    addTask(fetchTask);
    dispatch(actionsList.getPageSeoInformation(pathname));
  },
};
// #endregion
