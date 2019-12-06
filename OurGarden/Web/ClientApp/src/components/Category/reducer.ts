// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { ICategoryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ICategoryState> = (
  state: ICategoryState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_CATEGORY_LIST_ERROR:
    case t.GET_CATEGORY_LIST_REQUEST: {
      return state;
    }

    case t.GET_CATEGORY_LIST_SUCCESS: {
      const newState: ICategoryState = {
        ...state,
        categoryList: action.payload
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
