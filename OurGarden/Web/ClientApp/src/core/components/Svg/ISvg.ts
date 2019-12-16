export type TSvgList = "remove" | "archive" | "search" | "phone" | "map-pin";

export interface ISvgProps {
  type: TSvgList;
}

export interface ISvgState {
  SvgComponent: any;
}
