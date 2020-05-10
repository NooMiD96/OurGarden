import React from "react";

import Row from "@core/antd/Row";
import { Title } from "@core/antd/Typography";
import AddToCardButton from "@core/components/AddToCardButton";
import RussianCurrency from "@core/components/RussianCurrency";

import { getPhotoSrc } from "@core/utils/photo";

import { IMouseClickEvent } from "@core/IEvents";
import { IProductContentProps, IProductContentState } from "./IProductContent";

export class ProductContent extends React.PureComponent<
  IProductContentProps,
  IProductContentState
> {
  constructor(props: IProductContentProps) {
    super(props);

    this.state = {
      itemCount: "1"
    };
  }

  setItemCount = (newCount: string) => {
    this.setState({
      itemCount: newCount
    });
  };

  addToCard = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { ymId } = this.props;

    window.ym(ymId, "reachGoal", "CHECKOUT_CLICK");

    this.setState({
      itemCount: "1"
    });

    this.props.addProductToCard({
      count: Number.parseInt(this.state.itemCount, 10),
      product: this.props.product
    });
  };

  render() {
    const { product } = this.props;
    const { itemCount } = this.state;

    const productPhoto = getPhotoSrc(product);

    return (
      <React.Fragment>
        {productPhoto && (
          <img
            src={productPhoto}
            alt={product!.alias}
            className="product-photo"
          />
        )}

        <div className="product-info">
          <Title>{product.alias}</Title>
          <span className="product-cost">
            {product.price ? (
              <>
                {`${product.price.toLocaleString()}`}
                <RussianCurrency />
              </>
            ) : (
              "Под заказ"
            )}
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
      </React.Fragment>
    );
  }
}

export default ProductContent;
