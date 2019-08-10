import { INewsListState } from "@components/NewsList/State";
import { actionCreators } from "@components/NewsList/actions";
import { Push } from "connected-react-router";

// STATE OF COMPONENT
export type TComponentState = {};
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
