import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "@components/NewsList/actions";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.newsList,
  isDataWasGeted: state.app.isDataWasGeted,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
  push
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
