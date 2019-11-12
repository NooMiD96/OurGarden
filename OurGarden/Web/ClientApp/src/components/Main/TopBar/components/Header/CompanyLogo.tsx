import React from "react";
import { push as pushAction } from "connected-react-router";
import { connect } from "react-redux";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

const CompanyInfo = ({ push }: { push: typeof pushAction }) => (
  <div className="company-logo" onClick={() => push("/")} />
);

/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

export default connect(
  null,
  {
    push: pushAction
  }
)(CompanyInfo);
