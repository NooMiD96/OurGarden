import React from "react";
import { Helmet } from "react-helmet-async";

import { getSEOMetaData, getAdditionalSEOInfo } from "@src/core/utils/SEO";

import { IHeaderHelmet } from "@src/core/utils/SEO/ISEO";

export const HeaderHelmet = ({
  seoSectionName,
  seoTitle,
  seoTitleReplacments = [],
  seoParams,
}: IHeaderHelmet) => {
  if (seoParams) {
    return (
      <Helmet>
        <title>
          {seoParams.seoTitle ? `${seoParams.seoTitle} | Наш Сад` : "Наш Сад"}
        </title>
        <meta name="description" content={seoParams.seoDescription} />
        <meta name="keywords" content={seoParams.seoKeywords} />
      </Helmet>
    );
  }

  if (!seoSectionName) {
    return (
      <Helmet>
        <title>Наш Сад</title>
      </Helmet>
    );
  }

  let seoTitleValue = null;

  if (!seoTitle) {
    const { title } = getSEOMetaData(seoSectionName);

    seoTitleValue = getAdditionalSEOInfo(title, seoTitleReplacments);
  } else {
    seoTitleValue = seoTitle;
  }

  return (
    <Helmet>
      {seoTitleValue ? (
        <title>{`${seoTitleValue} | Наш Сад`}</title>
      ) : (
        <title>Наш Сад</title>
      )}
    </Helmet>
  );
};

export default HeaderHelmet;
