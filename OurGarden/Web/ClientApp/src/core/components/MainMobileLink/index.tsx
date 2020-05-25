import React from "react";

import { MAIN_MOBILE, MAIN_MOBILE_FORMATTED } from "@src/core/constants";
import { IMainMobileLink } from "./IMainMobileLink";

const MainMobileLink = ({
  ymId,
  prefixIcon,
  linkClassName = "",
}: IMainMobileLink) => (
  <a
    className={`number-wrapper ${linkClassName}`}
    href={`tel:${MAIN_MOBILE_FORMATTED}`}
    onClick={() => ymId && window.ym(ymId, "reachGoal", "PHONE_CLICK")}
  >
    {prefixIcon}
    <span className="text">{MAIN_MOBILE}</span>
  </a>
);

export default MainMobileLink;
