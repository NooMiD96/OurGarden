import React from "react";
import { connect } from "react-redux";
import { push as pushAction } from "connected-react-router";

import Svg from "@src/core/components/Svg";

import {
  MAIN_MOBILE,
  SHORT_ADDRESS,
  MAIN_MOBILE_FORMATTED
} from "@src/core/constants";

import { IApplicationState } from "@src/Store";

export interface ICompanyInfo {
  ymId: number;
  push: typeof pushAction;
}

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */
const CompanyInfo = ({ ymId, push }: ICompanyInfo) => (
  <React.Fragment>
    <div className="company-info place">
      <a
        className="number-wrapper info"
        onClick={(e) => {
          e.preventDefault();
          push("/About");
        }}
      >
        <i className="anticon">
          <Svg type="map-pin" />
        </i>
        <span className="text">{SHORT_ADDRESS}</span>
      </a>
    </div>

    <div className="company-info number">
      <a
        className="number-wrapper info"
        href={`tel:${MAIN_MOBILE_FORMATTED}`}
        onClick={() => window.ym(ymId, "reachGoal", "PHONE_CLICK")}
      >
        <i className="anticon">
          <Svg type="phone" />
        </i>
        <span className="text">{MAIN_MOBILE}</span>
      </a>
    </div>
  </React.Fragment>
);
/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

export default connect(
  (state: IApplicationState) => ({
    ymId: state.app.ymId
  }),
  {
    push: pushAction
  }
)(CompanyInfo);
