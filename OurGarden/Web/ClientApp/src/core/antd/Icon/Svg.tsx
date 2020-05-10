import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { IconDefinition } from "@ant-design/icons-svg/es/types";

// TODO: recursive function
interface ISvgProps {
  svgProps?: IconDefinition;
  className?: string;
  style?: object;
}

const Svg = (props: ISvgProps) => {
  if (!props.svgProps || typeof props.svgProps.icon !== "object") {
    return null;
  }

  const { icon } = props.svgProps;
  const iProp = { ...props };
  delete iProp.svgProps;
  delete iProp.className;
  delete iProp.style;

  return (
    <i
      className={`anticon${props.className ? ` ${props.className}` : ""}`}
      style={props.style}
      {...iProp}
    >
      <svg fill="currentColor" height="1em" width="1em" {...icon.attrs}>
        {/* prettier-ignore */ icon.children
          && icon.children.map((val, index) => (
            <val.tag key={index} {...val.attrs} />
          ))}
      </svg>
    </i>
  );
};

export { IconDefinition };

export default Svg;
