import { TUserModel } from "./TAccount";
import { XPT } from "@src/core/helpers/auth/xsrf";
import { TNotify } from "./IAccountState";
// -----------------
// ACTIONS TYPE
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";

export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const SET_USER = "SET_USER";

export const REMOVE_ERROR_MESSAGE = "REMOVE_ERROR_MESSAGE";

export const SET_XPT = "SET_XPT";
export const SET_NOTIFY = "SET_NOTIFY";
// -----------------
// ACTIONS INTERFACE
export interface IRegistrationRequest { type: typeof REGISTRATION_REQUEST; }
export interface IRegistrationSuccess { type: typeof REGISTRATION_SUCCESS; }
export interface IRegistrationError { type: typeof REGISTRATION_ERROR; errorMessage: string; }
export type TRegistration = IRegistrationRequest | IRegistrationSuccess | IRegistrationError;

export interface IAuthenticationRequest { type: typeof AUTHENTICATION_REQUEST; }
export interface IAuthenticationSuccess { type: typeof AUTHENTICATION_SUCCESS; }
export interface IAuthenticationError { type: typeof AUTHENTICATION_ERROR; errorMessage: string; }
export type TAuthentication = IAuthenticationRequest | IAuthenticationSuccess | IAuthenticationError;

export interface ILogoutRequest { type: typeof LOGOUT_REQUEST; }
export interface ILogoutSuccess { type: typeof LOGOUT_SUCCESS; }
export interface ILogoutError { type: typeof LOGOUT_ERROR; errorMessage: string; }
export type TLogout = ILogoutRequest | ILogoutSuccess | ILogoutError;

export interface ISetUser { type: typeof SET_USER; user: TUserModel; }

export interface IRemoveErrorMessage { type: typeof REMOVE_ERROR_MESSAGE; }

export interface ISetXPTAction { type: typeof SET_XPT; xpt: XPT; }
export interface ISetNotifyAction { type: typeof SET_NOTIFY; notify: TNotify[]; }

type KnownAction = TRegistration | TAuthentication | TLogout
    | ISetUser | IRemoveErrorMessage | ISetXPTAction | ISetNotifyAction;
export default KnownAction;
