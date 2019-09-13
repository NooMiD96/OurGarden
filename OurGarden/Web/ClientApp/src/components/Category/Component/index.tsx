import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState } from "../TState";

export const Category = (props: TState) => (
  <>
    <HeaderHelmet
      {...getSEOMetaData("category")}
    />
    <CatalogCardList dataList={props.categoryList} push={props.push} />
  </>
);

export default Category;
