import React from "react";

import Phone from "@src/assets/svg/phone.svg";
import MapPin from "@src/assets/svg/map-pin.svg";

import { MAIN_MOBILE, SHORT_ADDRESS } from "@src/core/constants";

const CompanyInfo = () => (
  <React.Fragment>
    <div className="company-info place">
      <i className="anticon">
        <MapPin />
      </i>
      <span className="info">{SHORT_ADDRESS}</span>
    </div>

    <div className="company-info number">
      <i className="anticon">
        <Phone />
      </i>
      <span className="info">{MAIN_MOBILE}</span>
    </div>
  </React.Fragment>
);

export default CompanyInfo;
