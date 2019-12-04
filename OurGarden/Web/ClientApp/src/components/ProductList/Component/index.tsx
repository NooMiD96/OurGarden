import React from "react";

import LoadingHOC from "@core/HOC/LoadingHOC";
import HeaderHelmet from "@core/components/Helmet";
import CatalogCardList from "@core/components/CatalogCardList";

import ProductCard from "./ProductCard";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { getPreviewPhotoSrc } from "@src/core/utils/photo";

import { TState } from "../TState";

export class ProductList extends React.PureComponent<TState, {}> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      productList
    } = this.props;

    if (
      !productList.length
      || params.categoryId !== productList[0].categoryId
      || params.subcategoryId !== productList[0].subcategoryId
    ) {
      props.getProductList(params.categoryId, params.subcategoryId);
    }

    props.getBreadcrumb({
      categoryId: params.categoryId,
      subcategoryId: params.subcategoryId
    });
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params },
      getBreadcrumb
    } = this.props;

    if (prevProps.match.params !== params) {
      this.props.getProductList(params.categoryId, params.subcategoryId);

      getBreadcrumb({
        categoryId: params.categoryId,
        subcategoryId: params.subcategoryId
      });
    }
  }

  render() {
    const {
      subcategory, productList, pending, push
    } = this.props;

    const dataList = productList.map((product) => ({
      ...product,
      link: `/Catalog/${product.categoryId}/${product.subcategoryId}/${product.productId}`,
      photoUrl: getPreviewPhotoSrc(product)
    }));

    const seoSection = getSEOMetaData("productList");

    return (
      <LoadingHOC
        pending={pending}
      >
        {subcategory && (
          <HeaderHelmet
            title={
              seoSection.title
              && seoSection.title.replace(
                "{{value}}",
                subcategory.alias
              )
            }
            metaDescription={seoSection.meta}
          />
        )}
        <CatalogCardList
          dataList={dataList}
          push={push}
          cardComponent={(props) => (
            <ProductCard pending={pending} item={props.item} push={props.push} onCardClick={props.onCardClick} />
          )}
        />
      </LoadingHOC>
    );
  }
}

export default ProductList;
