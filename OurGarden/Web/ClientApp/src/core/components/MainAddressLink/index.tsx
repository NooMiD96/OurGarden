import React from "react";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

import { ADDRESS, SHORT_ADDRESS } from "@src/core/constants";
import { IMainAddressLink } from "./IMainAddressLink";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */
const MainAddressLink = ({
  prefixIcon,
  push,
  showFullAddress = false,
  linkClassName = "",
}: TWithRouter<IMainAddressLink>) => (
  <a
    className={`email-wrapper ${linkClassName}`}
    onClick={(e) => {
      e.preventDefault();
      if (push) {
        push("/About");
      }
    }}
  >
    {prefixIcon}
    <span className="text">{showFullAddress ? ADDRESS : SHORT_ADDRESS}</span>
  </a>
);
/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

export default WithRouterPush<IMainAddressLink>(MainAddressLink as any);
