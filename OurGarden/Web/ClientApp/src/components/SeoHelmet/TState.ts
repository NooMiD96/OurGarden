import { Location } from "react-router-dom";

import { IPageSeoInformationState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = Record<string, unknown>;

// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IPageSeoInformationState;

// -----------------------------
// OWN PROPS
export type TOwnProps = Record<string, unknown>;

// -----------------------------
// FINAL PROPS
export type TMapStateToProps = TStateToProps & TOwnProps;

// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;

// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps &
  TMapDispatchToProps & { location: Location<any> };
