import { connect } from "react-redux";
import { push, replace } from "connected-react-router";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.subcategory,
  ...state.router,
  isDataWasGeted: state.app.isDataWasGeted,
  ...ownProp
} as TMapStateToProps);

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
  push,
  replace
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
