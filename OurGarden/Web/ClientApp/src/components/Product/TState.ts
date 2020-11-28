import { RouteComponentProps } from "react-router-dom";
import { Push, RouterState } from "connected-react-router";

import { IProductState } from "./State";
import { actionCreators } from "./actions";
import { actionCreators as userCardActions } from "@components/UserCard/actions";
import { actionCreators as modalWindowsActions } from "@components/ModalWindow/actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = Record<string, unknown>;
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IProductState &
  RouterState &
  RouteComponentProps<{
    categoryId: string;
    subcategoryId: string;
    productId: string;
  }> & { isDataWasGeted: boolean; ymId: number };
export type TOwnProps = Record<string, unknown>;
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps & {
  push: Push;
  addProductToCard: typeof userCardActions.addProductToCard;
  showPhotoModalWindow: typeof modalWindowsActions.showPhotoModalWindow;
  showFeedbackModalWindow: typeof modalWindowsActions.showFeedbackModalWindow;
};
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
