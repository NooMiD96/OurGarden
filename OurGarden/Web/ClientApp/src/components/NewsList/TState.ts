import { INewsListState } from "./State";
import { actionCreators } from "./actions";
import { Push } from "connected-react-router";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  page: number;
  pageSize: number;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = INewsListState;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
  & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & { push: Push };
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;