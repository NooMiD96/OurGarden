// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { INewsState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<INewsState> = (
  state: INewsState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_NEWS_ERROR:
    case t.GET_NEWS_REQUEST: {
      return state;
    }

    case t.GET_NEWS_SUCCESS: {
      const newState: INewsState = {
        ...state,
        selectedNew: action.payload
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
