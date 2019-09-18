import { Push } from "connected-react-router";

import { INewsListState } from "@components/NewsList/State";
import { actionCreators } from "@components/NewsList/actions";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = INewsListState;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
  & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & {
  push: Push;
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb,
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;
