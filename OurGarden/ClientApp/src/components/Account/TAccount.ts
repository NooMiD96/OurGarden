import { UserTypeEnums } from "@core/constants";
import { AccountState } from "./IAccountState";
import { ActionCreators } from "./actions";
// -----------------------------
// STATE OF COMPONENT
export enum ModalTypeEnums {
    Nothing,
    Authentication,
    Registration,
}
export type TComponentState = {
    modalType: ModalTypeEnums,
    pending: Boolean,
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = AccountState;
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
// -----------------------------
// MODELS
export type TRegistrationModel = {
    userName: string,
    email: string,
    password: string,
};
export type TAuthenticationModel = {
    userName: string,
    password: string,
};
export type TUserModel = {
    userName: string;
    userType: UserTypeEnums;
};
