import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => (<any>{
  ...state.breadcrumb,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {};

export default <any>(
  connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
    mapStateToProps,
    mapDispatchToProps
  )(<any>Component)
);
