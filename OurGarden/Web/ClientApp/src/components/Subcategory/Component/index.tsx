import React from "react";
import { useLocation, useParams } from "react-router-dom";

import CatalogCardList from "@src/core/components/CatalogCardList";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { getPreviewPhotoSrc } from "@core/utils/photo";
import { getLinkToProduct } from "@src/core/helpers/linkGenerator";

import { TState, TComponentState } from "../TState";

export class Subcategory extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const { params, subcategoryList } = props;

    if (!props.isDataWasReceive) {
      if (
        !subcategoryList.length ||
        params.categoryId !== subcategoryList[0].categoryId
      ) {
        params.categoryId && props.getSubcategoryList(params.categoryId);
      }

      props.getBreadcrumb({ categoryId: params.categoryId });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const { params } = this.props;

    if (prevProps.params.categoryId !== params.categoryId) {
      params.categoryId && this.props.getSubcategoryList(params.categoryId);

      this.props.getBreadcrumb({ categoryId: params.categoryId });
    }
  }

  render() {
    const {
      category,
      subcategoryList,
      location: { state: locationState },
    } = this.props;

    const dataList = subcategoryList.map((x: any) => ({
      ...x,
      link: getLinkToProduct(x),
      photoUrl: getPreviewPhotoSrc(x),
    }));

    return (
      <DescriptionWrapper description={category?.description}>
        <CatalogCardList locationState={locationState} dataList={dataList} />
      </DescriptionWrapper>
    );
  }
}

export default (props: any) => (
  <Subcategory {...props} location={useLocation()} params={useParams()} />
);
