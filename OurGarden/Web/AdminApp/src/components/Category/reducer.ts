// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { ICategoryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ICategoryState> = (state: ICategoryState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_CATEGORY_LIST_REQUEST:
    case t.ADD_OR_UPDATE_CATEGORY_REQUEST:
    case t.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
      } as ICategoryState;

    case t.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as ICategoryState;

    case t.ADD_OR_UPDATE_CATEGORY_SUCCESS:
    case t.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
      } as ICategoryState;

    case t.GET_CATEGORY_LIST_ERROR:
    case t.ADD_OR_UPDATE_CATEGORY_ERROR:
    case t.DELETE_CATEGORY_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
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
