import React, { useState } from "react";
import { connect } from "react-redux";
import { Push } from "connected-react-router";

import Card from "@core/antd/Card";
import AddToCard from "@core/components/AddToCard";
import LazyImage from "@core/components/LazyImage";

import { getProductPhotoSrc } from "@core/helpers/product";

import { IProduct } from "@components/Product/State";
import { IMouseClickEvent } from "@core/IEvents";
import { actionsList } from "@components/UserCard/actions";

export interface IProductCard {
  pending: boolean;
  product: IProduct & { link: string };
  push: Push;
  addToCard: typeof actionsList.addProductToCard;
}

const ProductCard = (props: IProductCard) => {
  const { pending, product, push } = props;
  const [itemCount, setItemCount] = useState("1");

  const addToCardFn = (e: IMouseClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setItemCount("1");

    props.addToCard({
      count: Number.parseInt(itemCount, 10),
      product
    });
  };

  const description = (
    <AddToCard
      itemCount={itemCount}
      setItemCount={setItemCount}
      product={product}
      addToCard={addToCardFn}
    />
  );

  return (
    <Card
      loading={pending}
      hoverable
      cover={
        <LazyImage alt={product.alias} src={getProductPhotoSrc(product)} />
      }
      onClick={() => {
        push(product.link);
      }}
    >
      <Card.Meta title={product.alias} description={description} />
    </Card>
  );
};

export default connect(
  null,
  {
    addToCard: actionsList.addProductToCard
  }
)(ProductCard);
