import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";

import { getPreviewPhotoSrc } from "@core/utils/photo";
import { getLinkToProduct } from "@src/core/helpers/linkGenerator";

import { TState } from "../TState";

export class Category extends React.PureComponent<TState, unknown> {
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
      link: getLinkToProduct(x),
      photoUrl: getPreviewPhotoSrc(x),
    }));

    return (
      <>
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
