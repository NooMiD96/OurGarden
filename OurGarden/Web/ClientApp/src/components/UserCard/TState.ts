import { RouterState } from "connected-react-router";

import { IUserCardState } from "./State";
import { actionCreators } from "./actions";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// -----------------------------
// STATE OF COMPONENT
export enum DisplayTypeEnum {
  CardInfo,
  CardConfirmation,
}

export type TComponentState = {
  displayType: DisplayTypeEnum;
  orderCreated: boolean;
  mounted: boolean;
};

// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IUserCardState & RouterState & { ymId: number };
export type TOwnProps = Record<string, unknown>;
export type TMapStateToProps = TStateToProps & TOwnProps;

// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators & {
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
};
export type TMapDispatchToProps = TDispatchToProps;

// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
