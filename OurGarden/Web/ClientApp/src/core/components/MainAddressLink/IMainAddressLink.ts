import { push as pushAction } from "connected-react-router";

export interface IMainAddressLink {
  prefixIcon?: React.ReactNode;
  showFullAddress?: boolean;
  linkClassName?: string;
  push: typeof pushAction;
}
