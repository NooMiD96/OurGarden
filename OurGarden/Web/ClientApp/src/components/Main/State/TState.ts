import { Location } from "react-router-dom";
import { IAppState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  PageNotFoundComponent: any;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IAppState;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps &
  TOwnProps & {
    children?: React.ReactNode;
  };
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps &
  TMapDispatchToProps & { location: Location<any> };
