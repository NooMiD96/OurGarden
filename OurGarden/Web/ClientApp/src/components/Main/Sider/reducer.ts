// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ISiderState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ISiderState> = (state: ISiderState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        pending: true
      } as ISiderState;

    case t.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        categoryList: action.payload
      } as ISiderState;

    case t.GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as ISiderState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as ISiderState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
