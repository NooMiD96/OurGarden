import { RouterState, goBack } from "connected-react-router";
import { IModalWindowState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};

// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IModalWindowState & {
  router: RouterState;
};
// -----------------------------
// OWN PROPS
export type TOwnProps = {};
// -----------------------------
// FINAL PROPS
export type TMapStateToProps = TStateToProps & TOwnProps;

// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & {
  goBack: typeof goBack;
};
export type TMapDispatchToProps = TDispatchToProps;

// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
