import * as React from "react";
import { IconDefinition } from "@antdSvgs/../types";
// TODO: recursive function
interface ISvgProps {
  className?: string;
  style?: object;
  svgProps?: IconDefinition;
  type: string;
}

const getSvgClass = (type: string, className?: string) => {
  let result = `anticon anticon-${type}`;

  if (className) {
    result += ` ${className}`;
  }

  return result;
};

const Svg = (props: ISvgProps) => {
  if (!props.svgProps || typeof props.svgProps.icon !== "object") {
    return null;
  }

  const { icon } = props.svgProps;
  const iProp = { ...props };

  delete iProp.svgProps;
  delete iProp.className;
  delete iProp.style;

  const iClassName = getSvgClass(props.type, props.className);

  return (
    <i className={iClassName} style={props.style} {...iProp}>
      <svg fill="currentColor" height="1em" width="1em" {...icon.attrs}>
        {icon.children
          && icon.children.map((val, index) => (
            <val.tag key={index} {...val.attrs} />
          ))}
      </svg>
    </i>
  );
};

export { IconDefinition };

export default Svg;
