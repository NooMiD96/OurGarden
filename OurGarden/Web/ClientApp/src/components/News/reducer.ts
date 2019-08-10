// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { INewsState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<INewsState> = (state: INewsState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_NEWS_REQUEST:
      return {
        ...state,
        pending: true
      } as INewsState;

    case t.GET_NEWS_SUCCESS:
      return {
        ...state,
        pending: false,
        selectedNew: action.payload
      } as INewsState;

    case t.GET_NEWS_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
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
