// Данный HOC компонент служит для отображения лоадера вместо контента с хлебными крошками
// И как отображение страницы 404
import { connect } from "react-redux";

import { IApplicationState } from "@src/Store";

import { actionCreators } from "@components/Main/State/actions";

import {
  TOwnProps,
  TMapStateToProps,
  TMapDispatchToProps
} from "@components/Main/State/TState";

import Component from "./Component";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.app,
  ...ownProp
} as TMapStateToProps);

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
)(Component as any) as any;
