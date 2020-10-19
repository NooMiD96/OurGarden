import { IPageInfo } from "@src/core/interfaces/IPageInfo";

import { actionCreators as mainActionCreators } from "@components/Main/State/actions";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// STATE OF COMPONENT
export type TComponentState = Record<string, unknown>;
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = {
  isDataWasGeted: boolean;
  pageInfo?: IPageInfo;
};
export type TOwnProps = Record<string, unknown>;
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = {
  getPageInfo: typeof mainActionCreators.getPageInfo;
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
