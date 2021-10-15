import { RouteComponentProps } from "react-router-dom";

import { IAppState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  PageNotFoundComponent: any;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IAppState &
  RouteComponentProps<Record<string, any>>;
export type TOwnProps = Record<string, unknown>;
export type TMapStateToProps = TStateToProps &
  TOwnProps & {
    children?: React.ReactNode;
  };
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps & Record<string, unknown>;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
