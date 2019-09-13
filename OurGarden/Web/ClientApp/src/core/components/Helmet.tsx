import React from "react";
import { Helmet } from "react-helmet";

export interface IHeaderHelmet {
  title?: string;
  metaDescription?: string;
}

export const HeaderHelmet = ({
  title,
  metaDescription
}: IHeaderHelmet = {
  title: "",
  metaDescription: ""
}) => (
  <Helmet>
    {title && (
      <title>
        {`${title} | Наш Сад`}
      </title>
    )}
    {metaDescription && (
      <meta
        name="description"
        content={metaDescription}
      />
    )}
  </Helmet>
);

export default HeaderHelmet;
