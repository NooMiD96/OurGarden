import React from "react";

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

    // prettier-ignore
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
    const { product, addProductToCard } = this.props;

    const seoSection = getSEOMetaData("product");

    return (
      <div className="product-wrapper content white-background grey-border">
        {product && (
          <>
            <HeaderHelmet
              // prettier-ignore
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
      </div>
    );
  }
}

export default Product;
