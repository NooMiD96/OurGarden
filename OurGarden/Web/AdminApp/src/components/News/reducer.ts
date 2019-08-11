// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { INewsState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<INewsState> = (state: INewsState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_NEWS_LIST_REQUEST:
    case t.ADD_OR_UPDATE_NEWS_REQUEST:
    case t.DELETE_NEWS_REQUEST:
      return {
        ...state,
        pending: true,
      } as INewsState;

    case t.GET_NEWS_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as INewsState;

    case t.ADD_OR_UPDATE_NEWS_SUCCESS:
    case t.DELETE_NEWS_SUCCESS:
      return {
        ...state,
        pending: false,
      } as INewsState;

    case t.GET_NEWS_LIST_ERROR:
    case t.ADD_OR_UPDATE_NEWS_ERROR:
    case t.DELETE_NEWS_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
      } as INewsState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as INewsState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
