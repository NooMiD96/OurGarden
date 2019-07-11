import * as React from "react";

import LoadingIcon from "@src/core/components/Loading";

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

      return (
        <>
          {
            Component
              ? <Component {...this.props} />
              : <LoadingIcon />
          }
        </>
      );
    }
  }

  return AsyncComponent;
}
