import { connect } from "react-redux";

import Component from "./Component";

import { actionCreators } from "./actions";
import { actionCreators as userCardActions } from "@components/UserCard/actions";
import { actionCreators as modalWindowsActions } from "@components/ModalWindow/actions";

import { IApplicationState } from "@src/Store";
import { TOwnProps, TMapStateToProps, TMapDispatchToProps } from "./TState";

// prettier-ignore
const mapStateToProps = (
  state: IApplicationState,
  ownProp: TOwnProps
): TMapStateToProps => ({
  ...state.product,
  isDataWasReceive: state.app.isDataWasReceive,
  ymId: state.app.ymId,
  ...ownProp
} as TMapStateToProps);

const mapDispatchToProps: TMapDispatchToProps = {
  ...actionCreators,
  addProductToCard: userCardActions.addProductToCard,
  showPhotoModalWindow: modalWindowsActions.showPhotoModalWindow,
  showFeedbackModalWindow: modalWindowsActions.showFeedbackModalWindow,
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
