// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IModalWindowState, unloadedState, ModalOpenType } from "./State";
import KnownAction, * as t from "./actionsType";
import { ADD_PRODUCT_TO_CARD } from "@components/UserCard/actionsType";

export const reducer: Reducer<IModalWindowState> = (
  state: IModalWindowState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CARD: {
      const newState: IModalWindowState = {
        ...state,
        modalOpenType: ModalOpenType.AddToCard,
        newProductInCardState: action.payload.product,
      };

      return newState;
    }

    case t.SHOW_PHOTO_MODAL_WINDOW: {
      const newState: IModalWindowState = {
        ...state,
        modalOpenType: ModalOpenType.Photo,
        photoState: {
          selectedPhoto: action.selectedPhoto,
          photoList: action.photoList,
        },
      };

      return newState;
    }

    case t.SHOW_FEEDBACK_MODAL_WINDOW: {
      const newState: IModalWindowState = {
        ...state,
        modalOpenType: ModalOpenType.Feedback,
      };

      return newState;
    }

    case t.CLOSE_MODAL_WINDOW: {
      const newState: IModalWindowState = {
        ...unloadedState,
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
