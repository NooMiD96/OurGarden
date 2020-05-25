import React from "react";

import {
  HELP_EMAIL,
} from "@src/core/constants";
import { IMainEmailLink } from "./IMainEmailLink";

const MainEmailLink = ({ prefixIcon }: IMainEmailLink) => (
  <a className="email-wrapper" href={`mailto:${HELP_EMAIL}`}>
    {prefixIcon}
    <span className="text">{HELP_EMAIL}</span>
  </a>
);

export default MainEmailLink;
