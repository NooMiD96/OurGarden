import React from "react";

import Phone from "@src/assets/svg/phone.svg";
import MapPin from "@src/assets/svg/map-pin.svg";

const CompanyInfo = () => (
  <React.Fragment>
    <div className="company-info place">
      <i className="anticon">
        <MapPin />
      </i>
      <span className="info">ул. 9 мая, 36</span>
    </div>

    <div className="company-info number">
      <i className="anticon">
        <Phone />
      </i>
      <span className="info">8 800 520 55 66</span>
    </div>
  </React.Fragment>
);

export default CompanyInfo;
