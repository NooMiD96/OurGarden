import React from "react";
import { withRouter } from "react-router";
import { fetch } from "domain-task";

import LoadingHOC from "@core/HOC/LoadingHOC";

import { TState, TComponentState } from "@components/Main/State/TState";

export class AppHOC extends React.Component<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (typeof window !== "undefined") {
      props.clearAllRequest();
    }

    this.state = {
      PageNotFoundComponent: undefined,
    };
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

  componentDidUpdate(prevProps: TState) {
    if (this.props.errorInner !== prevProps.errorInner) {
      fetch(
        `/api/Home/LogWebAppError?errorString=${encodeURIComponent(
          this.props.errorInner
        )}`,
        {
          credentials: "same-origin",
          method: "POST",
        }
      );
    }
    if (this.props.isPageNotFound) {
      import(
        /* webpackChunkName: "PageNotFound" */ "@core/components/PageNotFound"
      ).then((component) => {
        this.setState({
          PageNotFoundComponent: component,
        });
      });
    }
  }

  resetState = () => {
    this.props.pageNotFoundError(false);
    this.props.dataWasGeted(false);
  };

  render() {
    const { isPageNotFound, children, pending } = this.props;
    const { PageNotFoundComponent } = this.state;

    if (isPageNotFound) {
      if (!PageNotFoundComponent) {
        return <LoadingHOC pending>{children}</LoadingHOC>;
      }
      // eslint-disable-next-line react/jsx-pascal-case
      return <PageNotFoundComponent.default />;
    }

    return <LoadingHOC pending={!!pending.length}>{children}</LoadingHOC>;
  }
}

export default withRouter(AppHOC);
