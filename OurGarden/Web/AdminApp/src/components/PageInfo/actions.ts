import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IPageInfo, IPageInfoDTO } from "./State";
import { generateFormBody } from "@src/core/helpers/request";

// ----------------
// #region ACTIONS
export const actionsList = {
  getPageInfoListRequest: (): t.IGetPageInfoListRequest => ({
    type: t.GET_PAGE_INFO_LIST_REQUEST,
  }),
  getPageInfoListSuccess: (
    payload: IPageInfo[]
  ): t.IGetPageInfoListSuccess => ({
    type: t.GET_PAGE_INFO_LIST_SUCCESS,
    payload,
  }),
  getPageInfoListError: (errorMessage: string): t.IGetPageInfoListError => ({
    type: t.GET_PAGE_INFO_LIST_ERROR,
    errorMessage,
  }),

  addOrUpdatePageInfoRequest: (): t.IAddOrUpdatePageInfoRequest => ({
    type: t.ADD_OR_UPDATE_PAGE_INFO_REQUEST,
  }),
  addOrUpdatePageInfoSuccess: (
    payload: boolean
  ): t.IAddOrUpdatePageInfoSuccess => ({
    type: t.ADD_OR_UPDATE_PAGE_INFO_SUCCESS,
    payload,
  }),
  addOrUpdatePageInfoError: (
    errorMessage: string
  ): t.IAddOrUpdatePageInfoError => ({
    type: t.ADD_OR_UPDATE_PAGE_INFO_ERROR,
    errorMessage,
  }),

  deletePageInfoRequest: (): t.IDeletePageInfoRequest => ({
    type: t.DELETE_PAGE_INFO_REQUEST,
  }),
  deletePageInfoSuccess: (payload: boolean): t.IDeletePageInfoSuccess => ({
    type: t.DELETE_PAGE_INFO_SUCCESS,
    payload,
  }),
  deletePageInfoError: (errorMessage: string): t.IDeletePageInfoError => ({
    type: t.DELETE_PAGE_INFO_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "PageInfo";
export const actionCreators = {
  getPageInfoList: (): IAppThunkAction<
    t.TGetPageInfoList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "GetPageInfos";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/apiAdmin/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IPageInfo[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getPageInfoListSuccess(value.data));

        return Promise.resolve();
      })
      .catch(
        // prettier-ignore
        (err: Error) => errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.getPageInfoListError,
          dispatch
        )
      );

    addTask(fetchTask);
    dispatch(actionsList.getPageInfoListRequest());
  },
  addOrUpdatePageInfo: (
    data: IPageInfoDTO
  ): IAppThunkAction<
    t.TAddOrUpdatePageInfo | t.TGetPageInfoList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "AddOrUpdate";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const formData = generateFormBody(data);

    const fetchTask = fetch(`/apiAdmin/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: formData,
      headers: {
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IPageInfo[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdatePageInfoSuccess(true));
        actionCreators.getPageInfoList()(dispatch, getState);

        return Promise.resolve();
      })
      .catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdatePageInfoError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdatePageInfoRequest());
  },
  removePageInfo: (
    categoryId: number
  ): IAppThunkAction<
    t.IDeletePageInfo | t.TGetPageInfoList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(
      `/apiAdmin/${controllerName}/${apiUrl}?pageInfoId=${categoryId}`,
      {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          ...xptToHeader,
        },
      }
    )
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deletePageInfoSuccess(true));
        actionCreators.getPageInfoList()(dispatch, getState);

        return Promise.resolve();
      })
      .catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdatePageInfoError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deletePageInfoRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
// #endregion
