import React, { useState } from "react";
import { connect } from "react-redux";
import { Push } from "connected-react-router";

import Card from "@core/antd/Card";
import AddToCard from "@src/core/components/AddToCard";

import { getProductPhotoSrc } from "@src/core/helpers/product";

import { IProduct } from "@src/components/Product/State";
import { IMouseClickEvent } from "@src/core/IEvents";
import { actionsList } from "@src/components/UserCard/actions";

export interface IProductCard {
  pending: boolean;
  product: IProduct & {link: string};
  push: Push;
  addToCard: typeof actionsList.addProductToCard;
}

const ProductCard = (props: IProductCard) => {
  const { pending, product, push } = props;
  const [itemCount, setItemCount] = useState("1");

  const addToCard = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setItemCount("1");

    props.addToCard({
      count: Number.parseInt(itemCount, 10),
      product
    });
  }

  return (
    <Card
      loading={pending}
      hoverable
      cover={
        <img alt={product.alias} src={getProductPhotoSrc(product)} />
      }
      onClick={() => {
        push(product.link);
      }}
    >
      <Card.Meta
        title={product.alias}
        description={(
          <AddToCard
            itemCount={itemCount}
            setItemCount={setItemCount}
            product={product}
            addToCard={addToCard}
          />
        )}
      />
    </Card>
  )
}

export default connect(
  null,
  {
    addToCard: actionsList.addProductToCard
  }
)(ProductCard);
