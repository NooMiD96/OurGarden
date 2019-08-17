import * as React from "react";

interface IState {
  error: any;
  info: any;
}

class ErrorHandler extends React.Component<any, IState> {
  state: IState = {
    error: false,
    info: null
  };

  componentDidCatch(error: any, info: any) {
    // Something happened to one of my children.
    // Add error to state
    this.setState({
      error: error,
      info: info
    });
  }

  render() {
    if (this.state.error) {
      // Some error was thrown. Let's display something helpful to the user
      return (
        <div>
          <h5>{this.state.error.message}</h5>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.info.componentStack}
          </details>
        </div>
      );
    }
    // No errors were thrown. As you were.
    return this.props.children;
  }
}

export default ErrorHandler;
