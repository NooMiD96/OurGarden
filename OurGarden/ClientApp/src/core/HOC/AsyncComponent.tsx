import * as React from "react";

import Spin from "@core/antd/Spin";

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
                <Spin
                    spinning={isLoading}
                >
                    <div className={`loading-spin-container ${isLoading ? "hidden" : "visible"}`}>
                        {Component && <Component {...this.props} />}
                    </div>
                </Spin>
            );
        }
    }

    return AsyncComponent;
}
