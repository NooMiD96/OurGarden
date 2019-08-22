// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IGalleryState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IGalleryState> = (state: IGalleryState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_GALLERY_LIST_REQUEST:
    case t.ADD_OR_UPDATE_GALLERY_REQUEST:
    case t.DELETE_GALLERY_REQUEST:
      return {
        ...state,
        pending: true,
      } as IGalleryState;

    case t.GET_GALLERY_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as IGalleryState;

    case t.ADD_OR_UPDATE_GALLERY_SUCCESS:
    case t.DELETE_GALLERY_SUCCESS:
      return {
        ...state,
        pending: false,
      } as IGalleryState;

    case t.GET_GALLERY_LIST_ERROR:
    case t.ADD_OR_UPDATE_GALLERY_ERROR:
    case t.DELETE_GALLERY_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
      } as IGalleryState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IGalleryState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
