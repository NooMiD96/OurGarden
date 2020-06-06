import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";
import HeaderHelmet from "@src/core/components/Helmet";
import { DescriptionCatalogWrapper } from "@src/core/helpers/description/DescriptionWrapper";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { TState, TComponentState } from "../TState";

export class Subcategory extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      subcategoryList
    } = props;

    if (!props.isDataWasGeted) {
      // prettier-ignore
      if (
        !subcategoryList.length
        || params.categoryId !== subcategoryList[0].categoryId
      ) {
        props.getSubcategoryList(params.categoryId);
      }

      props.getBreadcrumb({ categoryId: params.categoryId });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params }
    } = this.props;

    if (prevProps.match.params.categoryId !== params.categoryId) {
      this.props.getSubcategoryList(params.categoryId);

      this.props.getBreadcrumb({ categoryId: params.categoryId });
    }
  }

  render() {
    const {
      category,
      subcategoryList,
      replace,
      location: { state: locationState },
      push
    } = this.props;

    const dataList = subcategoryList.map((x) => ({
      ...x,
      link: `/Catalog/${x.categoryId}/${x.subcategoryId}`,
      photoUrl: getPreviewPhotoSrc(x)
    }));

    return (
      <>
        {category && (
          <HeaderHelmet
            seoSectionName="Subcategory"
            seoTitle={category.seoTitle}
            seoTitleReplacments={[
              {
                replacementValue: category.alias
              }
            ]}
          />
        )}
        <DescriptionCatalogWrapper description={category?.description}>
          <CatalogCardList
            replace={replace}
            locationState={locationState}
            dataList={dataList}
            push={push}
          />
        </DescriptionCatalogWrapper>
      </>
    );
  }
}

export default Subcategory;
