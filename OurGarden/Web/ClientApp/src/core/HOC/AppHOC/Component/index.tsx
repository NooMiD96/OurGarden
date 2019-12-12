import React from "react";
import { withRouter } from "react-router";
import { UnregisterCallback } from "history";

import PageNotFound from "@core/components/PageNotFound";
import LoadingHOC from "@core/HOC/LoadingHOC";

import { TState } from "@components/Main/State/TState";

export class AppHOC extends React.Component<TState, {}> {
  unlisten: UnregisterCallback | null = null;

  constructor(props: TState) {
    super(props);

    if (props.isPageNotFound || props.isDataWasGeted) {
      this.unlisten = props.history.listen(this.resetState);
    }

    if (typeof window !== "undefined") {
      props.clearAllRequest();
    }
  }

  shouldComponentUpdate(nextProps: TState) {
    const { isPageNotFound, pending, isDataWasGeted } = this.props;

    // prettier-ignore
    if (
      isPageNotFound !== nextProps.isPageNotFound
      || pending !== nextProps.pending
      || isDataWasGeted !== nextProps.isDataWasGeted
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: TState) {
    const { props } = this;

    // prettier-ignore
    if (
      props.isPageNotFound !== prevProps.isPageNotFound
      || props.isDataWasGeted !== prevProps.isDataWasGeted
    ) {
      if (props.isPageNotFound || props.isDataWasGeted) {
        this.unlisten = props.history.listen(this.resetState);
      } else if (this.unlisten) {
        this.unlisten();
        this.unlisten = null;
      }
    }
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
