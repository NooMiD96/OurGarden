import React from "react";

import LoadingHOC from "@core/HOC/LoadingHOC";
import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { getPreviewPhotoSrc } from "@core/utils/photo";

import { TState, TComponentState } from "../TState";

export class Subcategory extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      subcategoryList
    } = props;

    if (
      !subcategoryList.length
      || params.categoryId !== subcategoryList[0].categoryId
    ) {
      props.getSubcategoryList(params.categoryId);
    }

    props.getBreadcrumb({ categoryId: params.categoryId });
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params }
    } = this.props;

    if (prevProps.match.params !== params) {
      this.props.getSubcategoryList(params.categoryId);

      this.props.getBreadcrumb({ categoryId: params.categoryId });
    }
  }

  render() {
    const {
      category, subcategoryList, push, pending
    } = this.props;

    const seoSection = getSEOMetaData("subcategory");

    const dataList = subcategoryList.map((x) => ({
      ...x,
      link: `/Catalog/${x.categoryId}/${x.subcategoryId}`,
      photoUrl: getPreviewPhotoSrc(x)
    }));

    return (
      <LoadingHOC
        pending={pending}
      >
        {category && (
          <HeaderHelmet
            title={
              seoSection.title
              && seoSection.title.replace(
                "{{value}}",
                category.alias
              )
            }
            metaDescription={seoSection.meta}
          />
        )}
        <CatalogCardList dataList={dataList} push={push} />
      </LoadingHOC>
    );
  }
}

export default Subcategory;
