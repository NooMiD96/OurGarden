import React from "react";
import { Helmet } from "react-helmet";

import { getSEOMetaData, getAdditionalSEOInfo } from "@src/core/utils/SEO";

import { IHeaderHelmet } from "@src/core/utils/SEO/ISEO";

export const HeaderHelmet = ({
  seoSectionName,
  seoTitle = [],
  seoMeta = []
}: IHeaderHelmet) => {
  let { title, meta } = getSEOMetaData(seoSectionName);

  title = getAdditionalSEOInfo(title, seoTitle);
  meta = getAdditionalSEOInfo(meta, seoMeta) || "";

  return (
    <Helmet>
      {title ? <title>{`${title} | Наш Сад`}</title> : <title>Наш Сад</title>}
      <meta name="description" content={meta} />
    </Helmet>
  );
};

export default HeaderHelmet;
