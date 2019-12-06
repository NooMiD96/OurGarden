import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.breadcrumb,
  ...ownProp
} as TMapStateToProps);

const mapDispatchToProps: TMapDispatchToProps = {};

export default connect<
  TMapStateToProps,
  TMapDispatchToProps,
  TOwnProps,
  IApplicationState
>(
  mapStateToProps,
  mapDispatchToProps
)(Component as any) as any;
