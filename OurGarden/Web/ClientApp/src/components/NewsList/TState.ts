import { Push, Replace } from "connected-react-router";
import { Location } from "react-router-dom";

import { INewsListState } from "./State";
import { actionCreators } from "./actions";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = INewsListState & { isDataWasReceive: boolean };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps &
  TMapDispatchToProps & { location: Location<any> };
