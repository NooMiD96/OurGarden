import React from "react";

import CatalogCardList from "@core/components/CatalogCardList";
import ProductCard from "@core/components/CatalogCardList/Cards/ProductCard";
import DescriptionWrapper from "@src/core/helpers/description/DescriptionWrapper";

import { getPreviewPhotoSrc } from "@core/utils/photo";
import { getLinkToProduct } from "@src/core/helpers/linkGenerator";

import { TState } from "../TState";
import { useLocation, useParams } from "react-router-dom";

export class ProductList extends React.PureComponent<TState, unknown> {
  constructor(props: TState) {
    super(props);

    const { params, productList } = this.props;

    if (!props.isDataWasReceive) {
      if (
        !productList.length ||
        params.categoryId !== productList[0].categoryId ||
        params.subcategoryId !== productList[0].subcategoryId
      ) {
        params.categoryId &&
          params.subcategoryId &&
          props.getProductList(params.categoryId, params.subcategoryId);
      }

      props.getBreadcrumb({
        categoryId: params.categoryId,
        subcategoryId: params.subcategoryId,
      });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const { params, getBreadcrumb } = this.props;

    if (
      prevProps.params.categoryId !== params.categoryId ||
      prevProps.params.subcategoryId !== params.subcategoryId
    ) {
      params.categoryId &&
        params.subcategoryId &&
        this.props.getProductList(params.categoryId, params.subcategoryId);

      getBreadcrumb({
        categoryId: params.categoryId,
        subcategoryId: params.subcategoryId,
      });
    }
  }

  render() {
    const {
      subcategory,
      productList,
      location: { state: locationState },
      ymId,
    } = this.props;

    const dataList = productList.map((product: any) => ({
      ...product,
      link: getLinkToProduct(product),
      photoUrl: getPreviewPhotoSrc(product),
    }));

    return (
      <DescriptionWrapper description={subcategory?.description}>
        <CatalogCardList
          dataList={dataList}
          locationState={locationState}
          cardComponent={(props: any) => (
            <ProductCard item={props.item} ymId={ymId} />
          )}
        />
      </DescriptionWrapper>
    );
  }
}

export default (props: any) => (
  <ProductList {...props} location={useLocation()} params={useParams()} />
);
