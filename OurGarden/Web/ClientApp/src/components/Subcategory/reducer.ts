// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ISubcategoryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ISubcategoryState> = (
  state: ISubcategoryState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_SUBCATEGORY_LIST_REQUEST:
      return {
        ...state,
        pending: true
      } as ISubcategoryState;

    case t.GET_SUBCATEGORY_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        subcategoryList: action.payload
      } as ISubcategoryState;

    case t.GET_SUBCATEGORY_LIST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as ISubcategoryState;

    case t.SAVE_CATEGORY:
      return {
        ...state,
        category: action.payload
      } as ISubcategoryState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: ""
      } as ISubcategoryState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
