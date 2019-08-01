import { ICategoryState, ICategory } from "./State";
import { actionCreators } from "./actions";

// -----------------------------
// STATE OF COMPONENT
export type TComponentState = {
  editItem: ICategory | null;
  showModal: boolean;
};
// -----------------------------
// REDUX STATE OF COMPONENT
export type TStateToProps = ICategoryState;
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
