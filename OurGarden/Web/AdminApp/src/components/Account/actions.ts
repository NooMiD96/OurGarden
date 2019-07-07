import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrf, XPT, GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import { errorCatcher, responseCatcher, uncatchError } from "@core/fetchHelper";
import { TAuthenticationModel } from "./TModel";
import * as t from "./actionsType";

// ----------------
//#region ACTIONS
export const ActionsList = {
  authenticationRequest: (): t.IAuthenticationRequest => ({
    type: t.AUTHENTICATION_REQUEST,
  }),
  authenticationSuccess: (): t.IAuthenticationSuccess => ({
    type: t.AUTHENTICATION_SUCCESS,
  }),
  authenticationError: (errorMessage: string): t.IAuthenticationError => ({
    type: t.AUTHENTICATION_ERROR,
    errorMessage,
  }),
  logoutRequest: (): t.ILogoutRequest => ({
    type: t.LOGOUT_REQUEST,
  }),
  logoutSuccess: (): t.ILogoutSuccess => ({
    type: t.LOGOUT_SUCCESS,
  }),
  logoutError: (errorMessage: string): t.ILogoutError => ({
    type: t.LOGOUT_ERROR,
    errorMessage,
  }),
  removeErrorMessage: (): t.IRemoveErrorMessage => ({
    type: t.REMOVE_ERROR_MESSAGE,
  }),
  setXsrf: (xpt: XPT): t.ISetXPTAction => ({
    type: t.SET_XPT,
    xpt,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Account";
export const ActionCreators = {
  authentication: (data: TAuthenticationModel): IAppThunkAction<t.TAuthentication | t.ISetXPTAction> => (dispatch, _getState) => {
    const apiUrl = "Authentication";

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then(responseCatcher)
      .then(async (value: IResponse<void>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }
        let xpt: false | XPT | undefined;

        try {
          xpt = await GetXsrf(data);
        } catch (err) {
          return errorCreater(err.message);
        }

        if (xpt) {
          dispatch(ActionsList.authenticationSuccess());
          dispatch(ActionsList.setXsrf(xpt));
        } else {
          return errorCreater(uncatchError);
        }
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        ActionsList.authenticationError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(ActionsList.authenticationRequest());
  },
  logout: (): IAppThunkAction<t.TLogout> => (dispatch, getState) => {
    const apiUrl = "Logout";
    const xptToHeader = GetXsrfToHeader(getState);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<string>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }
        dispatch(ActionsList.logoutSuccess());
        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        ActionsList.logoutError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(ActionsList.logoutRequest());
  },
  removeErrorMessage: ActionsList.removeErrorMessage,
};
//#endregion
