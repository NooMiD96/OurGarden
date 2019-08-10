// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { INewsListState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<INewsListState> = (state: INewsListState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_NEWS_LIST_REQUEST:
      return {
        ...state,
        pending: true
      } as INewsListState;

    case t.GET_NEWS_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        newsList: action.payload
      } as INewsListState;

    case t.GET_NEWS_LIST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as INewsListState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as INewsListState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
