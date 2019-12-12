import * as React from "react";

import Svg from "./Svg";
import { getIconAsync } from "@core/constants";

import { ICustomIconProps, ICustomIconState } from "./IIcon";

class CustomIcon extends React.PureComponent<
  ICustomIconProps,
  ICustomIconState
> {
  unmaunted = false;

  state: ICustomIconState = {
    svgProps: null
  };

  async componentDidMount() {
    const { type } = this.props;
    try {
      const svgProps = await getIconAsync(type);

      if (!this.unmaunted) {
        this.setState({ svgProps });
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
    const { svgProps } = this.state;
    return svgProps ? (
      <Svg
        className={this.props.className}
        style={this.props.style}
        svgProps={svgProps}
        {...this.props}
      />
    ) : (
      <span />
    );
  }
}

export default CustomIcon;
