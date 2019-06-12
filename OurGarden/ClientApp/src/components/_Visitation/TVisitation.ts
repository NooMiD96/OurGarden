import { IVisitationState } from "./State";
import { actionCreators } from "./actions";
import { Moment } from "moment";
// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
    date: Moment;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = IVisitationState;
export type TOwnProps = {};
export type TMapStateToProps = TStateToProps
    & TOwnProps;
// -----------------------------
// REDUX ACTIONS OF COMPONENT
export type TDispatchToProps = typeof actionCreators;
export type TMapDispatchToProps = TDispatchToProps;
// -----------------------------
// COMBINE REDUX PROPS
export type TState = TMapStateToProps
    & TMapDispatchToProps;
// -----------------------------
// MODELS
