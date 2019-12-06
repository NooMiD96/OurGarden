import React from "react";

import HeaderHelmet from "@core/components/Helmet";
import CatalogCardList from "@core/components/CatalogCardList";
import ProductCard from "@core/components/CatalogCardList/Cards/ProductCard";

import { getSEOMetaData } from "@core/utils/seoInformation";
import { getPreviewPhotoSrc } from "@core/utils/photo";

import { TState } from "../TState";

export class ProductList extends React.PureComponent<TState, {}> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      productList
    } = this.props;

    // prettier-ignore
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
    const { subcategory, productList, push } = this.props;

    const dataList = productList.map((product) => ({
      ...product,
      link: `/Catalog/${product.categoryId}/${product.subcategoryId}/${product.productId}`,
      photoUrl: getPreviewPhotoSrc(product)
    }));

    const seoSection = getSEOMetaData("productList");

    return (
      <>
        {subcategory && (
          <HeaderHelmet
            // prettier-ignore
            title={
              seoSection.title
              && seoSection.title.replace("{{value}}", subcategory.alias)
            }
            metaDescription={seoSection.meta}
          />
        )}
        <CatalogCardList
          dataList={dataList}
          push={push}
          cardComponent={(props) => (
            <ProductCard
              item={props.item}
              push={props.push}
              onCardClick={props.onCardClick}
            />
          )}
        />
      </>
    );
  }
}

export default ProductList;
