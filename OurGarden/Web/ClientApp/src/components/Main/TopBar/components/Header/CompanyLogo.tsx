import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

const CompanyInfo = ({ push }: { push: any }) => (
  <div className="company-logo" onClick={() => push("/")}></div>
);

/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

export default connect(
  null,
  {
    push
  }
)(CompanyInfo);
