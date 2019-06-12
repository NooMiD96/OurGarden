// ----------------
// REDUCER
import { Reducer } from "redux";

import { UserTypeEnums } from "@core/constants";
import { AccountState, unloadedState } from "./IAccountState";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<AccountState> = (state: AccountState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.REGISTRATION_REQUEST:
    case t.AUTHENTICATION_REQUEST:
    case t.LOGOUT_REQUEST:
      return {
        ...state,
        pending: true,
      } as AccountState;

    case t.REGISTRATION_SUCCESS:
    case t.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        pending: false,
      } as AccountState;

    case t.LOGOUT_SUCCESS:
      return {
        ...unloadedState,
      } as AccountState;

    case t.REGISTRATION_ERROR:
    case t.AUTHENTICATION_ERROR:
    case t.LOGOUT_ERROR:
      return {
        ...state,
        pending: false,
        errorMessage: action.errorMessage,
      } as AccountState;

    case t.REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      } as AccountState;

    case t.SET_USER:
      return {
        ...state,
        userName: action.user.userName,
        userType: UserTypeEnums[action.user.userType] as any,
      } as AccountState;

    case t.SET_XPT:
      return {
        ...state,
        _xpt: action.xpt,
      } as AccountState;

    case t.SET_NOTIFY:
      return {
        ...state,
        notify: action.notify,
      } as AccountState;

    default:
      const exhaustiveCheck: never = action;
  }
  return state;
};
