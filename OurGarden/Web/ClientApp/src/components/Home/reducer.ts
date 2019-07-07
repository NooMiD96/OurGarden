// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IHomeState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IHomeState> = (state: IHomeState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case "GET_NEWS_LIST_REQUEST":
      return {
        ...state,
        pending: true
      } as IHomeState;

    case "GET_NEWS_LIST_SUCCESS":
      return {
        ...state,
        pending: false,
        newsList: action.payload
      } as IHomeState;

    case "GET_NEWS_LIST_ERROR":
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as IHomeState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IHomeState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
