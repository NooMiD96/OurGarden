import { IModalWindowState } from "./State";
import { actionCreators } from "./actions";
import { RouterState, goBack as goBackAction } from "connected-react-router";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};

// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IModalWindowState & {
  router: RouterState;
  goBack: typeof goBackAction;
};
// -----------------------------
// OWN PROPS
export type TOwnProps = {};
// -----------------------------
// FINAL PROPS
export type TMapStateToProps = TStateToProps & TOwnProps;

// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;

// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
