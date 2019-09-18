import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState } from "../TState";

export class Category extends React.PureComponent<TState, {}> {
  constructor(props: TState) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [{
        displayName: "Каталог",
        url: "Catalog",
        order: 1,
      }],
      key: "Catalog"
    });
  }

  render() {
    const { categoryList, push } = this.props;

    return (
      <>
        <HeaderHelmet {...getSEOMetaData("category")} />
        <CatalogCardList dataList={categoryList} push={push} />
      </>
    );
  }
}

export default Category;
