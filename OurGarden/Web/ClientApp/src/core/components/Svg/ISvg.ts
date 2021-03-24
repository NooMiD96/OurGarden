export type TSvgList =
  | "remove"
  | "archive"
  | "search"
  | "phone"
  | "map-pin"
  | "place-contacts"
  | "phone-contacts"
  | "mail-contacts"
  | "form-user"
  | "form-phone"
  | "form-mail"
  | "close";

export interface ISvgProps {
  type: TSvgList;
  className?: string;
}

export interface ISvgState {
  SvgComponent: any;
}
