import { IBreadcrumbState } from "./State";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};

// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IBreadcrumbState;
// -----------------------------
// OWN PROPS
export type TOwnProps = {};
// -----------------------------
// FINAL PROPS
export type TMapStateToProps = TStateToProps & TOwnProps;

// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = {};
export type TMapDispatchToProps = TDispatchToProps;

// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
