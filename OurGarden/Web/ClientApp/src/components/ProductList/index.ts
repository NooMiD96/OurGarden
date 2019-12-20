import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.productList,
  ...state.router,
  isDataWasGeted: state.app.isDataWasGeted,
  ymId: state.app.ymId,
  ...ownProp
} as TMapStateToProps);

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
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
