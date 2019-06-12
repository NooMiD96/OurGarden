import { fetch, addTask } from "domain-task";

import { AppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrf, XPT, GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { TRegistrationModel, TAuthenticationModel, TUserModel } from "./TAccount";
import * as t from "./actionsType";
import { errorCatcher, responseCatcher, uncatchError } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import { TNotify } from "./IAccountState";

// ----------------
//#region ACTIONS
export const ActionsList = {
  registrationRequest: (): t.IRegistrationRequest => ({
    type: t.REGISTRATION_REQUEST,
  }),
  registrationSuccess: (): t.IRegistrationSuccess => ({
    type: t.REGISTRATION_SUCCESS,
  }),
  registrationError: (errorMessage: string): t.IRegistrationError => ({
    type: t.REGISTRATION_ERROR,
    errorMessage,
  }),
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
  setUser: (user: TUserModel): t.ISetUser => ({
    type: t.SET_USER,
    user,
  }),
  removeErrorMessage: (): t.IRemoveErrorMessage => ({
    type: t.REMOVE_ERROR_MESSAGE,
  }),
  setXsrf: (xpt: XPT): t.ISetXPTAction => ({
    type: t.SET_XPT,
    xpt,
  }),
  setNotify: (notify: TNotify[]): t.ISetNotifyAction => ({
    type: t.SET_NOTIFY,
    notify,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Account";
export const ActionCreators = {
  registration: (data: TRegistrationModel): AppThunkAction<t.TRegistration | t.ISetUser | t.ISetXPTAction> => (dispatch, getState) => {
    const apiUrl = "Registration";

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then(responseCatcher)
      .then(async (value: IResponse<TUserModel>) => {
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
          dispatch(ActionsList.registrationSuccess());
          dispatch(ActionsList.setUser(value.data));
          dispatch(ActionsList.setXsrf(xpt));
          ActionCreators.getNotify()(dispatch as any, getState);
        } else {
          return errorCreater(uncatchError);
        }

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        ActionsList.registrationError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(ActionsList.registrationRequest());
  },
  authentication: (data: TAuthenticationModel): AppThunkAction<t.TAuthentication | t.ISetUser | t.ISetXPTAction> => (dispatch, getState) => {
    const apiUrl = "Authentication";

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then(responseCatcher)
      .then(async (value: IResponse<TUserModel>) => {
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
          dispatch(ActionsList.setUser(value.data));
          dispatch(ActionsList.setXsrf(xpt));
          ActionCreators.getNotify()(dispatch as any, getState);
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
  logout: (): AppThunkAction<t.TLogout> => (dispatch, getState) => {
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
  getNotify: (): AppThunkAction<t.ISetNotifyAction> => async (dispatch, getState) => {
    const apiUrl = "GetNotify";
    const xptToHeader = GetXsrfToHeader(getState);

    const value: IResponse<TNotify[]> = await fetch(`/api/${controllerName}/${apiUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
    .then(responseCatcher);

    if (value && value.error) {
      return errorCreater(value.error);
    }
    dispatch(ActionCreators.setNotify(value.data));
  },
  removeErrorMessage: ActionsList.removeErrorMessage,
  setNotify: ActionsList.setNotify,
};
//#endregion
