import { connect } from "react-redux";
import { goBack as goBackAction } from "connected-react-router";

import Component from "./Component";

import { actionCreators } from "./actions";

import { IApplicationState } from "@src/Store";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => (<TMapStateToProps>{
  ...state.modalWindow,
  router: state.router,
  ...ownProp
});

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
  goBack: goBackAction,
};

export default <any>(
  connect<TMapStateToProps, TMapDispatchToProps, TOwnProps, IApplicationState>(
    mapStateToProps,
    mapDispatchToProps
  )(<any>Component)
);
