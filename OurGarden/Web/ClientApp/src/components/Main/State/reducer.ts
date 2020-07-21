// ----------------
// #region REDUCER
import { Reducer } from "redux";

import KnownAction, * as t from "./actionsType";
import { addNewRequest } from "@core/utils/AppReducer";

import { IAppState, unloadedState } from "./State";

export const reducer: Reducer<IAppState> = (
  state: IAppState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.START_REQUEST: {
      const newState: IAppState = {
        ...state,
        pending: addNewRequest(state.pending),
      };

      return newState;
    }

    case t.CANCEL_REQUEST: {
      const newState: IAppState = {
        ...state,
        pending: state.pending.slice(0, -1),
      };

      return newState;
    }

    case t.CLEAR_ALL_REQUEST: {
      const newState: IAppState = {
        ...state,
        pending: [],
      };

      return newState;
    }

    case t.DATA_WAS_GETED: {
      const newState: IAppState = {
        ...state,
        isDataWasGeted: action.payload,
      };

      return newState;
    }

    case t.REQUEST_ERROR: {
      const newState: IAppState = {
        ...state,
        pending: state.pending.slice(0, -1),
        errorInner: action.massageError,
      };

      return newState;
    }

    case t.PAGE_NOT_FOUND_ERROR: {
      const newState: IAppState = {
        ...state,
        isPageNotFound:
          typeof action.isNotFound === "boolean" ? action.isNotFound : false,
      };

      return newState;
    }

    case t.CLEAN_ERROR_INNER: {
      const newState: IAppState = {
        ...state,
        errorInner: "",
      };

      return newState;
    }

    case t.SET_YANDEX_METRICA_ID: {
      const newState: IAppState = {
        ...state,
        ymId: action.id,
      };

      return newState;
    }

    case t.GET_PAGE_INFO_REQUEST: {
      const newState: IAppState = {
        ...state,
        pageInfoId: action.payload,
        pageInfo: undefined,
      };

      return newState;
    }

    case t.GET_PAGE_INFO_SUCCESS: {
      if (action.payload?.pageInfoId !== state.pageInfoId) {
        return state;
      }

      const newState: IAppState = {
        ...state,
        pageInfo: action.payload,
      };

      return newState;
    }

    case t.GET_PAGE_INFO_ERROR: {
      console.error(action.payload);
      return state;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
