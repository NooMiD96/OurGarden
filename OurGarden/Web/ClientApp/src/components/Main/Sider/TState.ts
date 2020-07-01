import { RouterState } from "connected-react-router";

import { actionCreators } from "@src/components/Category/actions";
import { ICategoryState } from "@src/components/Category/State";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  isCollapsed: boolean;
  isCollapsible: boolean;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ICategoryState &
  RouterState & { isDataWasGeted: boolean };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
