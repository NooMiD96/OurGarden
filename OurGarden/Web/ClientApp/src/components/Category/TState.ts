import { RouterState, Push } from "connected-react-router";

import { ICategoryState } from "./State";

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
export type TDispatchToProps = {};
export type TMapDispatchToProps = TDispatchToProps
  & { push: Push };
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;
