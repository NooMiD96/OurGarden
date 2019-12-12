import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "@components/Category/actions";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import { Sider } from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.category,
  ...state.router,
  isDataWasGeted: state.app.isDataWasGeted,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators
};

export default connect<
  TMapStateToProps,
  TMapDispatchToProps,
  TOwnProps,
  IApplicationState
>(
  mapStateToProps,
  mapDispatchToProps
)(Sider as any) as any;
