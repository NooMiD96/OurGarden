import { NavigateFunction } from "react-router-dom";

export interface IMainAddressLink {
  prefixIcon?: React.ReactNode;
  showFullAddress?: boolean;
  linkClassName?: string;
  navigate: NavigateFunction;
}
