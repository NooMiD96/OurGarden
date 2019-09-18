import { RouterState, Push } from "connected-react-router";

import { ICategoryState } from "./State";
import { actionCreators } from "./actions";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ICategoryState & RouterState;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
  & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps & {
    push: Push;
    setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
  };
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;
