import { Params } from "react-router-dom";

import { INewsState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  page: number;
  pageSize: number;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = INewsState & {
  params: Readonly<Params<"newsId">>;
} & { isDataWasReceive: boolean };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
