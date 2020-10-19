import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import { PageInfo } from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.pageInfo,
  ...ownProp,
} as TMapStateToProps);

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
};

export default connect<
  TMapStateToProps,
  TMapDispatchToProps,
  TOwnProps,
  IApplicationState
>(
  mapStateToProps,
  mapDispatchToProps
)(PageInfo as any) as any;
