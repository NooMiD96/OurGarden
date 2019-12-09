import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";

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
    const { category, subcategoryList, push } = this.props;

    const dataList = subcategoryList.map((x) => ({
      ...x,
      link: `/Catalog/${x.categoryId}/${x.subcategoryId}`,
      photoUrl: getPreviewPhotoSrc(x)
    }));

    return (
      <>
        {category && (
          <HeaderHelmet
            seoSectionName="subcategory"
            seoTitle={[
              {
                replacementValue: category.alias
              }
            ]}
          />
        )}
        <CatalogCardList dataList={dataList} push={push} />
      </>
    );
  }
}

export default Subcategory;
