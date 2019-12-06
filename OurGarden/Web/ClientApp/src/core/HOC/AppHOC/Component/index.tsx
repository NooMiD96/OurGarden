import React from "react";

import PageNotFound from "@core/components/PageNotFound";
import LoadingHOC from "@core/HOC/LoadingHOC";
import { withRouter } from "react-router";

import { TState } from "@components/Main/State/TState";
import { UnregisterCallback } from "history";

export class AppHOC extends React.Component<TState, {}> {
  unlisten: UnregisterCallback | null = null;

  constructor(props: TState) {
    super(props);

    if (props.isPageNotFound) {
      this.unlisten = props.history.listen(() => {
        this.props.pageNotFoundError(false);
      });
    }

    if (typeof window !== "undefined") {
      props.clearAllRequest();
    }
  }

  shouldComponentUpdate(nextProps: TState) {
    const { isPageNotFound, pending } = this.props;

    // prettier-ignore
    if (
      isPageNotFound !== nextProps.isPageNotFound
      || pending !== nextProps.pending
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: TState) {
    const { props } = this;

    if (props.isPageNotFound !== prevProps.isPageNotFound) {
      if (props.isPageNotFound) {
        this.unlisten = props.history.listen(() => {
          this.props.pageNotFoundError(false);
        });
      } else if (this.unlisten) {
        this.unlisten();
        this.unlisten = null;
      }
    }
  }

  render() {
    const { isPageNotFound, children, pending } = this.props;

    if (isPageNotFound) {
      return <PageNotFound />;
    }

    return <LoadingHOC pending={!!pending.length}>{children}</LoadingHOC>;
  }
}

export default withRouter(AppHOC);
