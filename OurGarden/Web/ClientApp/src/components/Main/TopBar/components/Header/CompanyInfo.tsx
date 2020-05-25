import React from "react";
import { connect } from "react-redux";

import Svg from "@src/core/components/Svg";
import MainMobileLink from "@src/core/components/MainMobileLink";

import { IApplicationState } from "@src/Store";
import MainAddressLink from "@src/core/components/MainAddressLink";

export interface ICompanyInfo {
  ymId: number;
}

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */
const CompanyInfo = ({ ymId }: ICompanyInfo) => (
  <React.Fragment>
    <div className="company-info place">
      <MainAddressLink
        prefixIcon={(
          <i className="anticon">
            <Svg type="map-pin" />
          </i>
        )}
        linkClassName="info"
      />
    </div>

    <div className="company-info number">
      <MainMobileLink
        ymId={ymId}
        prefixIcon={(
          <i className="anticon">
            <Svg type="phone" />
          </i>
        )}
        linkClassName="info"
      />
    </div>
  </React.Fragment>
);
/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

export default connect(
  (state: IApplicationState) => ({
    ymId: state.app.ymId
  })
)(CompanyInfo);
