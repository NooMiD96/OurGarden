import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { TState } from "../TState";

export class Category extends React.PureComponent<TState, {}> {
  constructor(props: TState) {
    super(props);

    props.setBreadcrumb({
      breadcrumb: [
        {
          displayName: "Каталог",
          url: "Catalog",
          order: 1,
        },
      ],
      key: "Catalog",
    });
  }

  render() {
    const {
      categoryList,
      replace,
      location: { state: locationState },
    } = this.props;

    const dataList = categoryList.map((x) => ({
      ...x,
      link: `/Catalog/${x.categoryId}`,
      photoUrl: getPreviewPhotoSrc(x),
    }));

    return (
      <>
        <HeaderHelmet seoSectionName="Category" />
        <CatalogCardList
          replace={replace}
          locationState={locationState}
          dataList={dataList}
        />
      </>
    );
  }
}

export default Category;
