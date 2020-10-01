import { connect } from "react-redux";

import Component from "./Component";

import { actionCreators } from "./actions";

import { IApplicationState } from "@src/Store";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => <any>{
  ...state.router,
  ...state.pageSeoInformation,
  ...ownProp,
};

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
};

export default <any>(
  connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
    mapStateToProps,
    mapDispatchToProps
  )(<any>Component)
);
