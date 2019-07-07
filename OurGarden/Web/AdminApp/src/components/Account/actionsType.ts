import { XPT } from "@src/core/helpers/auth/xsrf";
// -----------------
// ACTIONS TYPE
export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const REMOVE_ERROR_MESSAGE = "REMOVE_ERROR_MESSAGE";

export const SET_XPT = "SET_XPT";
// -----------------
// ACTIONS INTERFACE
export interface IAuthenticationRequest { type: typeof AUTHENTICATION_REQUEST }
export interface IAuthenticationSuccess { type: typeof AUTHENTICATION_SUCCESS }
export interface IAuthenticationError { type: typeof AUTHENTICATION_ERROR; errorMessage: string }
export type TAuthentication = IAuthenticationRequest | IAuthenticationSuccess | IAuthenticationError;

export interface ILogoutRequest { type: typeof LOGOUT_REQUEST }
export interface ILogoutSuccess { type: typeof LOGOUT_SUCCESS }
export interface ILogoutError { type: typeof LOGOUT_ERROR; errorMessage: string }
export type TLogout = ILogoutRequest | ILogoutSuccess | ILogoutError;

export interface IRemoveErrorMessage { type: typeof REMOVE_ERROR_MESSAGE }

export interface ISetXPTAction { type: typeof SET_XPT; xpt: XPT }

type KnownAction = TAuthentication | TLogout
| IRemoveErrorMessage | ISetXPTAction;

export default KnownAction;
