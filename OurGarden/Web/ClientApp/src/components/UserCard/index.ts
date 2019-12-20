import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import {
  TOwnProps,
  TMapStateToProps,
  TMapDispatchToProps,
} from "./TState";
import Component from "./Component";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

const mapStateToProps = (state: IApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
  ...state.userCard,
  ymId: state.app.ymId,
  ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
  setBreadcrumb: breadcrumbActions.setBreadcrumb,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(Component as any) as any;
