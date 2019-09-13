import React from "react";

import Loading from "@src/core/components/Loading";
import Row from "@src/core/antd/Row";
import { Title } from "@src/core/antd/Typography";
import AddToCardButton from "@src/core/components/AddToCardButton";
import HeaderHelmet from "@src/core/components/Helmet";

import { getProductPhotoSrc } from "@src/core/helpers/product";
import { getSEOMetaData } from "@src/core/utils/seoInformation";

import { TState, TComponentState } from "../TState";
import { IMouseClickEvent } from "@src/core/IEvents";

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

    if (!product
      || categoryId !== product.categoryId
      || subcategoryId !== product.subcategoryId
      || productId !== product.productId
    ) {
      props.getProduct(categoryId, subcategoryId, productId);
    }

    this.state = {
      itemCount: "1"
    };
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getProduct,
      match: {
        params: { categoryId, subcategoryId, productId }
      }
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getProduct(categoryId, subcategoryId, productId);
    }
  }

  setItemCount = (newCount: string) => {
    this.setState({
      itemCount: newCount
    });
  };

  addToCard = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      itemCount: "1"
    });

    this.props.addProductToCard({
      count: Number.parseInt(this.state.itemCount),
      product: this.props.product!
    });
  };

  render() {
    const { product, pending } = this.props;
    const { itemCount } = this.state;

    const productPhoto = product && getProductPhotoSrc(product);
    const seoSection = getSEOMetaData("product");

    return (
      <div className="product-wrapper content white-background">
        {pending || !product ? (
          <>
            <Loading />
          </>
        ) : (
          <Row>
            <HeaderHelmet
              title={
                seoSection.title
                && seoSection.title.replace("{{value}}", product.alias)
              }
              metaDescription={seoSection.meta}
            />
            {productPhoto && (
              <img
                src={productPhoto}
                alt={product.alias}
                className="product-photo"
              />
            )}

            <div className="product-info">
              <Title>{product.alias}</Title>
              <span className="product-cost">
                {product.price
                  ? `${product.price.toLocaleString()}р.`
                  : "Под заказ"}
              </span>
              <span className="product-description">Описание</span>
            </div>

            <div
              className="product-description-wysiwyg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {product.price ? (
              <AddToCardButton
                itemCount={itemCount}
                setItemCount={this.setItemCount}
                addToCard={this.addToCard}
              />
            ) : null}
          </Row>
        )}
      </div>
    );
  }
}

export default Product;
