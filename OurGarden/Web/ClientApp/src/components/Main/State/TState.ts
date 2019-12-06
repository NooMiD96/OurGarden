import { RouteComponentProps } from "react-router-dom";

import { IAppState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IAppState & RouteComponentProps<{}>;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps &
  TOwnProps & {
    children?: React.ReactNode;
  };
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps & {};
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
