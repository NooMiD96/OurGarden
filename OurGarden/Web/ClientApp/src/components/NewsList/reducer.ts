// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { INewsListState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<INewsListState> = (
  state: INewsListState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_NEWS_LIST_ERROR:
    case t.GET_NEWS_LIST_REQUEST: {
      return state;
    }

    case t.GET_NEWS_LIST_SUCCESS: {
      const newState: INewsListState = {
        ...state,
        newsList: action.payload
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
