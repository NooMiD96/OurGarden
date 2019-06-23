import { IAccountState } from "./State";
import { ActionCreators } from "./actions";
// -----------------------------
// STATE OF COMPONENT
export enum ModalTypeEnums {
  Nothing,
  Authentication,
  Registration,
}
export type TComponentState = {
  modalType: ModalTypeEnums;
  pending: boolean;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IAccountState;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
& TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof ActionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
& TMapDispatchToProps;
