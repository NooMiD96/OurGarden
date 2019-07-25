import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import { actionCreators as userCardActions } from "@components/UserCard/actions";
import {
  TOwnProps,
  TMapStateToProps,
  TMapDispatchToProps,
} from "./TState";
import Component from "./Component";

const mapStateToProps = (state: IApplicationState, ownProp: TOwnProps): TMapStateToProps => ({
  ...state.product,
  ...state.router,
  ...ownProp,
}) as TMapStateToProps;

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
  addProductToCard: userCardActions.addProductToCard,
};

export default connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(Component as any) as any;
