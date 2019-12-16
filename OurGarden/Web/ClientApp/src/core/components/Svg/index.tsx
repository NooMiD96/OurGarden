import * as React from "react";

import { getSvg } from "./utils";

import { ISvgProps, ISvgState } from "./ISvg";

class Svg extends React.PureComponent<ISvgProps, ISvgState> {
  unmaunted = false;

  state: ISvgState = {
    SvgComponent: undefined
  };

  async componentDidMount() {
    const { type } = this.props;

    try {
      const SvgComponent = await getSvg(type);

      if (!this.unmaunted) {
        this.setState({ SvgComponent });
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        throw new Error(err.message);
      }
    }
  }

  componentWillUnmount() {
    this.unmaunted = true;
  }

  render() {
    const { SvgComponent } = this.state;
    return SvgComponent ? <SvgComponent /> : <span />;
  }
}

export default Svg;
