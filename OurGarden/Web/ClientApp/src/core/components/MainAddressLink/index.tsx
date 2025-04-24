import React from "react";
import { useNavigate } from "react-router-dom";

import { ADDRESS, SHORT_ADDRESS } from "@core/constants";
import { IMainAddressLink } from "./IMainAddressLink";

const MainAddressLink = ({
  prefixIcon,
  navigate,
  showFullAddress = false,
  linkClassName = "",
}: IMainAddressLink) => (
  <a
    className={`email-wrapper ${linkClassName}`}
    onClick={(e) => {
      e.preventDefault();
      navigate("/Contacts");
    }}
  >
    {prefixIcon}
    <span className="text">{showFullAddress ? ADDRESS : SHORT_ADDRESS}</span>
  </a>
);

export default (props: any) => (
  <MainAddressLink {...props} navigate={useNavigate()} />
);
