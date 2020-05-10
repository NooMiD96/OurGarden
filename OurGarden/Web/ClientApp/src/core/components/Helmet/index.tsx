import React from "react";
import { Helmet } from "react-helmet";

import { getSEOMetaData, getAdditionalSEOInfo } from "@src/core/utils/SEO";

import { IHeaderHelmet } from "@src/core/utils/SEO/ISEO";

export const HeaderHelmet = ({
  seoSectionName,
  seoTitle,
  seoTitleReplacments = [],
}: IHeaderHelmet) => {
  let seoTitleValue = null;

  if (!seoTitle) {
    const { title } = getSEOMetaData(seoSectionName);

    seoTitleValue = getAdditionalSEOInfo(title, seoTitleReplacments);
  } else {
    seoTitleValue = seoTitle;
  }

  return (
    <Helmet>
      {seoTitleValue ? <title>{`${seoTitleValue} | Наш Сад`}</title> : <title>Наш Сад</title>}
    </Helmet>
  );
};

export default HeaderHelmet;
