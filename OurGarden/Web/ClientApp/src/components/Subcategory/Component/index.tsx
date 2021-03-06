import React from "react";

import CatalogCardList from "@src/core/components/CatalogCardList";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { getPreviewPhotoSrc } from "@core/utils/photo";
import { getLinkToProduct } from "@src/core/helpers/linkGenerator";

import { TState, TComponentState } from "../TState";

export class Subcategory extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      subcategoryList,
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
      match: { params },
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
    } = this.props;

    const dataList = subcategoryList.map((x) => ({
      ...x,
      link: getLinkToProduct(x),
      photoUrl: getPreviewPhotoSrc(x),
    }));

    return (
      <>
        <DescriptionWrapper description={category?.description}>
          <CatalogCardList
            replace={replace}
            locationState={locationState}
            dataList={dataList}
          />
        </DescriptionWrapper>
      </>
    );
  }
}

export default Subcategory;
