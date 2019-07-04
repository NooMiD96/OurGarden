// ----------------
// REDUCER
import { Reducer } from "redux";

import { IAccountState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IAccountState> = (state: IAccountState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.AUTHENTICATION_REQUEST:
    case t.LOGOUT_REQUEST:
      return {
        ...state,
        pending: true,
      } as IAccountState;

    case t.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        pending: false,
        isUserAuth: true,
      } as IAccountState;

    case t.LOGOUT_SUCCESS:
      return {
        ...unloadedState,
      } as IAccountState;

    case t.AUTHENTICATION_ERROR:
    case t.LOGOUT_ERROR:
      return {
        ...state,
        pending: false,
        errorMessage: action.errorMessage,
      } as IAccountState;

    case t.REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      } as IAccountState;

    case t.SET_XPT:
      return {
        ...state,
        _xpt: action.xpt,
      } as IAccountState;

    default: {
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
    }
  }
  return state;
};
