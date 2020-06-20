import { connect } from "react-redux";
import { push as pushAction } from "connected-react-router";

export type TIncomingWithRouterType<T> = (props: T) => JSX.Element;
export type TWithRouter<T> = T & { push: typeof pushAction };
export type TOutgoingWithRouterType<T> = (props: T) => any;

export const WithRouterPush: <T>(
  props: TIncomingWithRouterType<T>
) => TOutgoingWithRouterType<T> = (Component) => {
  const connectedComponent = connect(null, {
    push: pushAction,
  })(Component as any);

  return connectedComponent;
};

export default WithRouterPush;
