import React, { useState } from "react";
import { Push } from "connected-react-router";

import Card from "@core/antd/Card";
import Button from "@src/core/antd/Button";
import NumberInput from "@src/core/components/NumberInput";

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
          <div className="card-description">
            <span className="card-cost">
              {product.price.toLocaleString()}
              р.
            </span>
            <span>
              <NumberInput
                value={itemCount}
                onValueChange={setItemCount}
                addonAfter={<Button type="default" block>В корзину</Button>}
              />
            </span>
          </div>
        )}
      />
    </Card>
  )
}

export default ProductCard;
