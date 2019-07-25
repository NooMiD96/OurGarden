import React, { useState } from "react";
import { Push } from "connected-react-router";

import Card from "@core/antd/Card";
import AddToCard from "@src/core/components/AddToCard";

import { IProduct } from "@src/components/Product/State";

export interface IProductCard {
  pending: boolean;
  product: IProduct & {link: string};
  push: Push;
}

const ProductCard = (props: IProductCard) => {
  const { pending, product, push } = props;
  const [itemCount, setItemCount] = useState("1");

  return (
    <Card
      loading={pending}
      hoverable
      cover={
        <img alt={product.alias} src={product.photos[0] && product.photos[0].url} />
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
          />
        )}
      />
    </Card>
  )
}

export default ProductCard;
