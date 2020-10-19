import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

import { actionCreators as mainActionCreators } from "@components/Main/State/actions";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  isDataWasGeted: state.app.isDataWasGeted,
  pageInfo: state.app.pageInfo,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {
  getPageInfo: mainActionCreators.getPageInfo,
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
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
