import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const CompanyInfo = ({ navigate }: { navigate: NavigateFunction }) => (
  <div className="company-logo" onClick={() => navigate("/")} />
);

export default (props: any) => (
  <CompanyInfo {...props} navigate={useNavigate()} />
);
