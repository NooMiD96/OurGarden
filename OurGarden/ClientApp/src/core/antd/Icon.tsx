import * as React from "react";
import Svg, { IconDefinition } from "./Svg";
import { getIconAsync, TIcons } from "../constants";

export interface CustomIconProps {
  type: TIcons;
  className?: string;
  style?: object;
}

export interface CustomIconState {
  svgProps: IconDefinition | null;
}

class CustomIcon extends React.PureComponent<CustomIconProps, CustomIconState> {
  state: CustomIconState = {
    svgProps: null,
  };

  async componentDidMount() {
    const { type } = this.props;
    try {
      const svgProps = await getIconAsync(type);

      this.setState({svgProps: svgProps});
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        throw new Error(err.message);
      }
    }
  }

  render() {
    const { svgProps } = this.state;
    return (
      svgProps
        ? <Svg
          className={this.props.className}
          style={this.props.style}
          svgProps={svgProps}
          {...this.props}
        />
        : <span />
    );
  }
}

export default CustomIcon;
