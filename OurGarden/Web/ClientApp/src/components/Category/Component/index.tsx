import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";

import { TState } from "../TState";

export const Category = (props: TState) => (
  <CatalogCardList dataList={props.categoryList} push={props.push} />
);

export default Category;
