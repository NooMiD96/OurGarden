
import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { ActionCreators } from "./actions";
import {
  TOwnProps,
  TMapStateToProps,
  TMapDispatchToProps,
} from "./TState";
import { Account } from "./Component/Account";

const mapStateToProps = (state: IApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
  ...state.account,
  ...ownProp,
});

const mapDispatchToProps: TMapDispatchToProps = {
  ...ActionCreators,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(Account as any);
