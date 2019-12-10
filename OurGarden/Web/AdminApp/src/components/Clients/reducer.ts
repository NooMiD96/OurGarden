// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IClientState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IClientState> = (
  state: IClientState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_CLIENT_LIST_REQUEST:
    case t.ADD_OR_UPDATE_CLIENT_REQUEST:
    case t.DELETE_CLIENT_REQUEST: {
      const newState: IClientState = {
        ...state,
        pending: true
      };

      return newState;
    }

    case t.GET_CLIENT_LIST_SUCCESS: {
      const newState: IClientState = {
        ...state,
        clientList: action.payload,
        pending: false
      };

      return newState;
    }

    case t.ADD_OR_UPDATE_CLIENT_SUCCESS:
    case t.DELETE_CLIENT_SUCCESS: {
      const newState: IClientState = {
        ...state,
        pending: false
      };

      return newState;
    }

    case t.GET_CLIENT_LIST_ERROR:
    case t.ADD_OR_UPDATE_CLIENT_ERROR:
    case t.DELETE_CLIENT_ERROR: {
      const newState: IClientState = {
        ...state,
        errorInner: action.errorMessage,
        pending: false
      };

      return newState;
    }

    case t.CLEAN_ERROR_INNER: {
      const newState: IClientState = {
        ...state,
        errorInner: ""
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
