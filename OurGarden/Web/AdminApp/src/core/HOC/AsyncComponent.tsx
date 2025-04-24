import * as React from "react";

import Spin from "@core/antd/Spin";

interface IState {
  Component: any;
}

export class AsyncComponent extends React.Component<
  { componentLoader: any },
  IState
> {
  state: IState = {
    Component: null,
  };

  async componentDidMount() {
    const Component = await this.props.componentLoader();
    this.setState({
      Component: Component.default,
    });
  }

  render() {
    const { Component } = this.state;
    const isLoading = !Component;
    return (
      <Spin spinning={isLoading}>
        <div
          className={`loading-spin-container ${
            isLoading ? "hidden" : "visible"
          }`}
        >
          {Component && <Component {...this.props} />}
        </div>
      </Spin>
    );
  }
}
