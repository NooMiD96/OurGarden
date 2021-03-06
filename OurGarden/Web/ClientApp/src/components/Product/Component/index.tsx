import React from "react";
import _isEqual from "lodash.isequal";

import ProductContent from "./ProductContent";

import { TState, TComponentState } from "../TState";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/Product.style.scss";

export class Product extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      product,
      match: {
        params: { categoryId, subcategoryId, productId },
      },
    } = props;

    // prettier-ignore
    if (!props.isDataWasGeted) {
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
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getProduct,
      match: {
        params: { categoryId, subcategoryId, productId },
      },
      getBreadcrumb,
    } = this.props;

    if (!_isEqual(prevProps.match.params, this.props.match.params)) {
      getProduct(categoryId, subcategoryId, productId);

      getBreadcrumb({
        categoryId,
        subcategoryId,
        productId,
      });
    }
  }

  render() {
    const {
      product,
      addProductToCard,
      ymId,
      push,
      showPhotoModalWindow,
      showFeedbackModalWindow,
    } = this.props;

    return (
      <div className={`wysiwyg-wrapper content ${WHITE_BLOCK}`}>
        {product && (
          <>
            <ProductContent
              product={product}
              addProductToCard={addProductToCard}
              ymId={ymId}
              push={push}
              showPhotoModalWindow={showPhotoModalWindow}
              showFeedbackModalWindow={showFeedbackModalWindow}
            />
          </>
        )}
      </div>
    );
  }
}

export default Product;
