import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IApplicationState } from "@src/Store";

import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

import { actionCreators as mainActionCreators } from "@components/Main/State/actions";
import { actionCreators as newsListActionCreators } from "@components/NewsList/actions";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.newsList,
  isDataWasGeted: state.app.isDataWasGeted,
  ymId: state.app.ymId,
  pageInfo: state.app.pageInfo,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {
  ...newsListActionCreators,
  getPageInfo: mainActionCreators.getPageInfo,
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
  push,
};

export default connect<
  TMapStateToProps,
  TMapDispatchToProps,
  TOwnProps,
  IApplicationState
>(
  mapStateToProps,
  mapDispatchToProps
)(Component as any) as any;
