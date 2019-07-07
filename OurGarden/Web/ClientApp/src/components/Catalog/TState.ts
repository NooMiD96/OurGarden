import { RouteComponentProps } from "react-router-dom";

import { IHomeState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IHomeState & RouteComponentProps<{
  categoty: string;
  subcategory: string;
  product: string;
}>;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
& TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
& TMapDispatchToProps;
