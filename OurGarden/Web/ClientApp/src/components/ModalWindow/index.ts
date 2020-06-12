import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "./actions";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";
import Component from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => (<TMapStateToProps>{
  ...state.modalWindow,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
};

export default <any>(
  connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
    mapStateToProps,
    mapDispatchToProps
  )(<any>Component)
);
