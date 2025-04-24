import React from "react";
import { useLocation } from "react-router-dom";
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
    const { isPageNotFound, pending, isDataWasReceive } = this.props;

    // prettier-ignore
    if (
      isPageNotFound !== nextProps.isPageNotFound
      || pending?.length !== nextProps.pending?.length
      || isDataWasReceive !== nextProps.isDataWasReceive
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
    this.props.dataWasReceive(false);
  };

  render() {
    const { isPageNotFound, children, pending } = this.props;
    const { PageNotFoundComponent } = this.state;

    if (isPageNotFound) {
      if (!PageNotFoundComponent) {
        return <LoadingHOC pending>{children}</LoadingHOC>;
      }

      return <PageNotFoundComponent.default />;
    }

    return <LoadingHOC pending={!!pending.length}>{children}</LoadingHOC>;
  }
}

export default (props: any) => <AppHOC {...props} location={useLocation()} />;
