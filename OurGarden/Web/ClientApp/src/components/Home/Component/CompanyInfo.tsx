import React from "react";

import DescriptionWrapper, {
  WYSIWYG_PART_CLASS,
} from "@src/core/helpers/description/DescriptionWrapper";

import { WHITE_BLOCK } from "@src/core/constants/style";

import { IPageInfo } from "@src/core/interfaces/IPageInfo";

const CompanyInfo = ({ pageInfo }: { pageInfo?: IPageInfo }) => (
  <DescriptionWrapper
    description={pageInfo?.description}
    wrapperClassName={`${WHITE_BLOCK} ${WYSIWYG_PART_CLASS}`}
  />
);

export default CompanyInfo;
