import { RouterState, Push, Replace } from "connected-react-router";

import { INewsListState } from "./State";
import { actionCreators } from "./actions";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = INewsListState &
  RouterState & { isDataWasGeted: boolean };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & {
  push: Push;
  replace: Replace;
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
