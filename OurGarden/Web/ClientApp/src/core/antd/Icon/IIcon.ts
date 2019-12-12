import { IconDefinition } from "./Svg";
import { TIcons } from "@core/constants";

export interface ICustomIconProps {
  type: TIcons;
  className?: string;
  style?: object;
}

export interface ICustomIconState {
  svgProps: IconDefinition | null;
}
