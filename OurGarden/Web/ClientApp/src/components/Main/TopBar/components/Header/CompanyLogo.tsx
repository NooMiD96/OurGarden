import React from "react";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

const CompanyInfo = ({ push }: TWithRouter<any>) => (
  <div className="company-logo" onClick={() => push("/")} />
);

/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

export default WithRouterPush<any>(CompanyInfo as any);
