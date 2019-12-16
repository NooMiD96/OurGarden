import React from "react";

import Svg from "@src/core/components/Svg";

import { MAIN_MOBILE, SHORT_ADDRESS } from "@src/core/constants";

const CompanyInfo = () => (
  <React.Fragment>
    <div className="company-info place">
      <i className="anticon">
        <Svg type="map-pin" />
      </i>
      <span className="info">{SHORT_ADDRESS}</span>
    </div>

    <div className="company-info number">
      <i className="anticon">
        <Svg type="phone" />
      </i>
      <span className="info">{MAIN_MOBILE}</span>
    </div>
  </React.Fragment>
);

export default CompanyInfo;
