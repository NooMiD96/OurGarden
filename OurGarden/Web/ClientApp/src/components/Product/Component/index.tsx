import React from "react";
import _isEqual from "lodash.isequal";
import { useLocation, useParams } from "react-router-dom";

import ProductContent from "./ProductContent";

import { TState, TComponentState } from "../TState";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/Product.style.scss";

export class Product extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    const {
      product,
      params: { categoryId, subcategoryId, productId },
    } = props;

    if (!props.isDataWasReceive) {
      if (
        !product ||
        categoryId !== product.categoryId ||
        subcategoryId !== product.subcategoryId ||
        productId !== product.productId
      ) {
        categoryId &&
          subcategoryId &&
          productId &&
          props.getProduct(categoryId, subcategoryId, productId);
      }

      props.getBreadcrumb({
        categoryId,
        subcategoryId,
        productId,
      });
    }
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getProduct,
      params: { categoryId, subcategoryId, productId },
      getBreadcrumb,
    } = this.props;

    if (!_isEqual(prevProps.params, this.props.params)) {
      categoryId &&
        subcategoryId &&
        productId &&
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
      showPhotoModalWindow,
      showFeedbackModalWindow,
    } = this.props;

    return (
      <div className={`wysiwyg-wrapper content ${WHITE_BLOCK}`}>
        {product && (
          <ProductContent
            product={product}
            addProductToCard={addProductToCard}
            ymId={ymId}
            showPhotoModalWindow={showPhotoModalWindow}
            showFeedbackModalWindow={showFeedbackModalWindow}
          />
        )}
      </div>
    );
  }
}

export default (props: any) => (
  <Product {...props} location={useLocation()} params={useParams()} />
);
