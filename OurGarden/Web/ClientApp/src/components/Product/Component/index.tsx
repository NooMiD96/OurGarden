import React from "react";

import Loading from "@src/core/components/Loading";
import Row from "@src/core/antd/Row";
import { Title } from "@src/core/antd/Typography";
import AddToCardButton from "@src/core/components/AddToCardButton";

import ProductWrapper from "./style/Product.style";

import { getProductPhotoSrc } from "@src/core/helpers/product";

import { TState, TComponentState } from "../TState";
import { IMouseClickEvent } from "@src/core/IEvents";

export class Product extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    itemCount: "1"
  };

  componentDidMount() {
    const {
      getProduct,
      match: {
        params: { categoty, subcategory, product }
      }
    } = this.props;

    getProduct(categoty, subcategory, product);
  }

  componentDidUpdate(prevProps: TState) {
    const {
      getProduct,
      match: {
        params: { categoty, subcategory, product }
      }
    } = this.props;

    if (prevProps.match.params !== this.props.match.params) {
      getProduct(categoty, subcategory, product);
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

    return (
      <ProductWrapper className="content white-background">
        {pending || !product ? (
          <Loading />
        ) : (
          <Row>
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
                {product.price.toLocaleString()}
                р.
              </span>
              <span className="product-description">Описание</span>
            </div>

            <div
              className="product-description-wysiwyg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            <AddToCardButton
              itemCount={itemCount}
              setItemCount={this.setItemCount}
              addToCard={this.addToCard}
            />
          </Row>
        )}
      </ProductWrapper>
    );
  }
}

export default Product;
