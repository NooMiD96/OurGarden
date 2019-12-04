import React from "react";

import LoadingHOC from "@core/HOC/LoadingHOC";
import HeaderHelmet from "@core/components/Helmet";
import ProductContent from "./ProductContent";

import { getSEOMetaData } from "@core/utils/seoInformation";

import { TState, TComponentState } from "../TState";

import "./style/Product.style.scss";

export class Product extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      product,
      match: {
        params: { categoryId, subcategoryId, productId }
      }
    } = props;

    if (
      !product
      || categoryId !== product.categoryId
      || subcategoryId !== product.subcategoryId
      || productId !== product.productId
    ) {
      props.getProduct(categoryId, subcategoryId, productId);
    }

    props.getBreadcrumb({
      categoryId,
      subcategoryId,
      productId
    });
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getProduct,
      match: {
        params: { categoryId, subcategoryId, productId }
      },
      getBreadcrumb
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getProduct(categoryId, subcategoryId, productId);

      getBreadcrumb({
        categoryId,
        subcategoryId,
        productId
      });
    }
  }

  render() {
    const { product, addProductToCard, pending } = this.props;

    const seoSection = getSEOMetaData("product");

    return (
      <div className="product-wrapper content white-background grey-border">
        <LoadingHOC
          pending={pending || !product}
        >
          {product && (
            <>
              <HeaderHelmet
                title={
                  seoSection.title
                  && seoSection.title.replace("{{value}}", product.alias)
                }
                metaDescription={seoSection.meta}
              />
              <ProductContent
                product={product}
                addProductToCard={addProductToCard}
              />
            </>
          )}
        </LoadingHOC>
      </div>
    );
  }
}

export default Product;
