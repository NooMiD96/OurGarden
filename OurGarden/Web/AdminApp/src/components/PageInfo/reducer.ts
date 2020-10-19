// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IPageInfoState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IPageInfoState> = (
  state: IPageInfoState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_PAGE_INFO_LIST_REQUEST:
    case t.ADD_OR_UPDATE_PAGE_INFO_REQUEST:
    case t.DELETE_PAGE_INFO_REQUEST:
      return {
        ...state,
        pending: true,
      } as IPageInfoState;

    case t.GET_PAGE_INFO_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as IPageInfoState;

    case t.ADD_OR_UPDATE_PAGE_INFO_SUCCESS:
    case t.DELETE_PAGE_INFO_SUCCESS:
      return {
        ...state,
        pending: false,
      } as IPageInfoState;

    case t.GET_PAGE_INFO_LIST_ERROR:
    case t.ADD_OR_UPDATE_PAGE_INFO_ERROR:
    case t.DELETE_PAGE_INFO_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
      } as IPageInfoState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IPageInfoState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
