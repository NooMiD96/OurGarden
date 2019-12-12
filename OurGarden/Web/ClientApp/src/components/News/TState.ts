import { RouteComponentProps } from "react-router";
import { Push, RouterState } from "connected-react-router";

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
export type TStateToProps = INewsState &
  RouterState &
  RouteComponentProps<{
    newsId: string;
  }> & { isDataWasGeted: boolean };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & { push: Push };
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
