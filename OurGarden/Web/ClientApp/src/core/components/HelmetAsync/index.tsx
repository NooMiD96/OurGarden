import React from "react";
import { Helmet } from "react-helmet-async";

import { IPageSeoInformation } from "./interfaces/IHelmetAsync";

export const HelmetAsync = ({ seoTitle, seoDescription, seoKeywords }: IPageSeoInformation) => {
  const title = seoTitle
    ? `${seoTitle} | Наш Сад`
    : "Наш Сад";

  return (
    <Helmet>
      <title>
        {title}
      </title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
    </Helmet>
  );
};

export default React.memo(HelmetAsync);
