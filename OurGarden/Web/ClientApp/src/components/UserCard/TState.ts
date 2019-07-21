import { RouteComponentProps } from "react-router-dom";
import { RouterState } from "connected-react-router";

import { IUserCardState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IUserCardState
  & RouterState
  & RouteComponentProps<{
    categoty: string;
    subcategory: string;
    product: string;
  }>;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
  & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;
