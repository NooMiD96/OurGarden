import { Location, Params } from "react-router-dom";

import { IProductListState } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = Record<string, unknown>;
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IProductListState & {
  params: Readonly<Params<"categoryId" | "subcategoryId">>;
} & {
  isDataWasReceive: boolean;
  ymId: number;
};
export type TOwnProps = Record<string, unknown>;
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps &
  TMapDispatchToProps & { location: Location<any> };
