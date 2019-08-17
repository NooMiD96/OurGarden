// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ICategoryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ICategoryState> = (state: ICategoryState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        pending: true
      } as ICategoryState;

    case t.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        categoryList: action.payload
      } as ICategoryState;

    case t.GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as ICategoryState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as ICategoryState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
