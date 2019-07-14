import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import {
  TOwnProps,
  TMapStateToProps,
  TMapDispatchToProps,
} from "./TState";
import { Sider } from "./Component";

const mapStateToProps = (state: IApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
  ...state.sider,
  ...state.router,
  ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(Sider as any) as any;
