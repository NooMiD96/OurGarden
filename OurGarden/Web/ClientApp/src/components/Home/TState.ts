import { INewsListState } from "@components/NewsList/State";
import { IPageInfo } from "@src/core/interfaces/IPageInfo";

import { actionCreators as mainActionCreators } from "@components/Main/State/actions";
import { actionCreators as newsListActionCreators } from "@components/NewsList/actions";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// STATE OF COMPONENT
export type TComponentState = {};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = INewsListState & {
  isDataWasReceive: boolean;
  ymId: number;
  pageInfo?: IPageInfo;
};
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof newsListActionCreators & {
  getPageInfo: typeof mainActionCreators.getPageInfo;
  setBreadcrumb: typeof breadcrumbActions.setBreadcrumb;
};
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps & TMapDispatchToProps;
