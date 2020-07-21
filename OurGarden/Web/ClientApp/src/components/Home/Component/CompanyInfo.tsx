import React from "react";

import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { IPageInfo } from "@src/core/interfaces/IPageInfo";

const CompanyInfo = ({ pageInfo }: { pageInfo?: IPageInfo }) => (
  <DescriptionWrapper
    description={pageInfo?.description}
    wrapperClassName=" "
  />
);

export default CompanyInfo;
