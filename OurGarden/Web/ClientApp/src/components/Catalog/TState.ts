import { RouteComponentProps } from "react-router-dom";
import { RouterState, Push } from "connected-react-router";

import { ICatalogState } from "./State";
import { actionCreators } from "./actions";
import { ICategory } from "../Main/Sider/State";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  page: number;
  pageSize: number;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ICatalogState
  & RouterState
  & RouteComponentProps<{
    categoty: string;
  }>
  & {
    categoryList: ICategory[];
  };
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
  & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps
  & { push: Push };
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
  & TMapDispatchToProps;
