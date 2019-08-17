import { RouteComponentProps } from "react-router-dom";
import { RouterState } from "connected-react-router";

import { IProductState } from "./State";
import { actionCreators } from "./actions";
import { actionCreators as userCardActions } from "@components/UserCard/actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  itemCount: string;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IProductState
  & RouterState
  & RouteComponentProps<{
    categoryId: string;
    subcategoryId: string;
    productId: string;
  }>;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
  & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps
  & {
    addProductToCard: typeof userCardActions.addProductToCard;
  };
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;
