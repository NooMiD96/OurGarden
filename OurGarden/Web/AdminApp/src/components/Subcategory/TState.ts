import { ISubcategoryState, ISubcategory } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  editItem: ISubcategory | null;
  showModal: boolean;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ISubcategoryState;
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
