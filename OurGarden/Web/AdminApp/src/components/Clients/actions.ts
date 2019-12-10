import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IClient, IClientDTO } from "./State";
import { generateFormBody } from "@src/core/helpers/request";

// ----------------
//#region ACTIONS
export const actionsList = {
  getClientListRequest: (): t.IGetClientListRequest => ({
    type: t.GET_CLIENT_LIST_REQUEST
  }),
  getClientListSuccess: (payload: IClient[]): t.IGetClientListSuccess => ({
    type: t.GET_CLIENT_LIST_SUCCESS,
    payload
  }),
  getClientListError: (errorMessage: string): t.IGetClientListError => ({
    type: t.GET_CLIENT_LIST_ERROR,
    errorMessage
  }),

  addOrUpdateClientRequest: (): t.IAddOrUpdateClientRequest => ({
    type: t.ADD_OR_UPDATE_CLIENT_REQUEST
  }),
  addOrUpdateClientSuccess: (
    payload: boolean
  ): t.IAddOrUpdateClientSuccess => ({
    type: t.ADD_OR_UPDATE_CLIENT_SUCCESS,
    payload
  }),
  addOrUpdateClientError: (
    errorMessage: string
  ): t.IAddOrUpdateClientError => ({
    type: t.ADD_OR_UPDATE_CLIENT_ERROR,
    errorMessage
  }),

  deleteClientRequest: (): t.IDeleteClientRequest => ({
    type: t.DELETE_CLIENT_REQUEST
  }),
  deleteClientSuccess: (payload: boolean): t.IDeleteClientSuccess => ({
    type: t.DELETE_CLIENT_SUCCESS,
    payload
  }),
  deleteClientError: (errorMessage: string): t.IDeleteClientError => ({
    type: t.DELETE_CLIENT_ERROR,
    errorMessage
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER
  })
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const apiPrefix = "apiAdmin";
const controllerName = "Client";
export const actionCreators = {
  getClientList: (): IAppThunkAction<
    t.TGetClientList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "GetAll";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/${apiPrefix}/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader
      }
    })
      .then(responseCatcher)
      .then((value: IResponse<IClient[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getClientListSuccess(value.data));

        return Promise.resolve();
      })
      .catch((err: Error) =>
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.getClientListError,
          dispatch
        )
      );

    addTask(fetchTask);
    dispatch(actionsList.getClientListRequest());
  },
  addOrUpdateClient: (
    data: IClientDTO
  ): IAppThunkAction<
    t.TAddOrUpdateClient | t.TGetClientList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "AddOrUpdate";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const formData = generateFormBody(data);

    const fetchTask = fetch(`/${apiPrefix}/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: formData,
      headers: {
        ...xptToHeader
      }
    })
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateClientSuccess(true));
        actionCreators.getClientList()(dispatch, getState);

        return Promise.resolve();
      })
      .catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateClientError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateClientRequest());
  },
  removeClient: (
    clientId: string | number
  ): IAppThunkAction<
    t.IDeleteClient | t.TGetClientList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(
      `/${apiPrefix}/${controllerName}/${apiUrl}?clientId=${clientId}`,
      {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          ...xptToHeader
        }
      }
    )
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteClientSuccess(true));
        actionCreators.getClientList()(dispatch, getState);

        return Promise.resolve();
      })
      .catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateClientError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteClientRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner
};
//#endregion
