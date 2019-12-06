// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { ISubcategoryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ISubcategoryState> = (
  state: ISubcategoryState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_SUBCATEGORY_LIST_ERROR:
    case t.GET_SUBCATEGORY_LIST_REQUEST: {
      return state;
    }

    case t.GET_SUBCATEGORY_LIST_SUCCESS: {
      const newState: ISubcategoryState = {
        ...state,
        subcategoryList: action.payload
      };
      return newState;
    }

    case t.SAVE_CATEGORY: {
      const newState: ISubcategoryState = {
        ...state,
        category: action.payload
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
