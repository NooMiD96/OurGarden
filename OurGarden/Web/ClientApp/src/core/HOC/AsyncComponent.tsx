import * as React from "react";

import Skeleton from "@core/antd/Skeleton";

export function AsyncComponent(ComponentLoader: any) {
  interface IState {
    Component: any;
  }
  class AsyncComponent extends React.Component<any, IState> {
    state: IState = {
      Component: null,
    };

    async componentDidMount() {
      const Component = await ComponentLoader();
      this.setState({
        Component: Component.default,
      });
    }

    render() {
      const { Component } = this.state;
      const isLoading = !Component;
      return (
        <>
          {Component && <Component {...this.props} />}
          {isLoading && (
            <>
              <Skeleton loading={isLoading} active />
              <Skeleton loading={isLoading} active />
              <Skeleton loading={isLoading} active />
              <Skeleton loading={isLoading} active />
              <Skeleton loading={isLoading} active />
            </>
          )}
        </>
      );
    }
  }

  return AsyncComponent;
}
