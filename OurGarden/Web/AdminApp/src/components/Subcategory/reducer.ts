// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ISubcategoryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ISubcategoryState> = (state: ISubcategoryState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_SUBCATEGORY_LIST_REQUEST:
    case t.ADD_OR_UPDATE_SUBCATEGORY_REQUEST:
    case t.DELETE_SUBCATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
      } as ISubcategoryState;

    case t.GET_SUBCATEGORY_LIST_SUCCESS:
      return {
        ...state,
        subcategoriesList: action.payload.subcategories,
        categoriesList: action.payload.categories,
        pending: false,
      } as ISubcategoryState;

    case t.ADD_OR_UPDATE_SUBCATEGORY_SUCCESS:
    case t.DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
      } as ISubcategoryState;

    case t.GET_SUBCATEGORY_LIST_ERROR:
    case t.ADD_OR_UPDATE_SUBCATEGORY_ERROR:
    case t.DELETE_SUBCATEGORY_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
      } as ISubcategoryState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as ISubcategoryState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
