import { RouteComponentProps } from "react-router-dom";
import { RouterState, Push, Replace } from "connected-react-router";

import { ISubcategoryState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ISubcategoryState &
  RouterState &
  RouteComponentProps<{
    categoryId: string;
  }> & { isDataWasGeted: boolean };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps & {
  push: Push;
  replace: Replace;
};
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
