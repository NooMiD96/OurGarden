export type TSvgList =
  | "remove"
  | "archive"
  | "search"
  | "phone"
  | "map-pin"
  | "place-contacts"
  | "phone-contacts"
  | "mail-contacts";

export interface ISvgProps {
  type: TSvgList;
}

export interface ISvgState {
  SvgComponent: any;
}
