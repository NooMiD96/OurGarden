import React from "react";
import { withRouter } from "react-router";

import PageNotFound from "@core/components/PageNotFound";
import LoadingHOC from "@core/HOC/LoadingHOC";

import { TState } from "@components/Main/State/TState";

export class AppHOC extends React.Component<TState, {}> {
  constructor(props: TState) {
    super(props);

    if (typeof window !== "undefined") {
      props.clearAllRequest();
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: TState) {
    // prettier-ignore
    if (
      nextProps.location.pathname !== this.props.location.pathname
    ) {
      this.resetState();
    }
  }

  shouldComponentUpdate(nextProps: TState) {
    const { isPageNotFound, pending, isDataWasGeted } = this.props;

    // prettier-ignore
    if (
      isPageNotFound !== nextProps.isPageNotFound
      || pending?.length !== nextProps.pending?.length
      || isDataWasGeted !== nextProps.isDataWasGeted
    ) {
      return true;
    }

    return false;
  }

  resetState = () => {
    this.props.pageNotFoundError(false);
    this.props.dataWasGeted(false);
  };

  render() {
    const { isPageNotFound, children, pending } = this.props;

    if (isPageNotFound) {
      return <PageNotFound />;
    }

    return <LoadingHOC pending={!!pending.length}>{children}</LoadingHOC>;
  }
}

export default withRouter(AppHOC);
