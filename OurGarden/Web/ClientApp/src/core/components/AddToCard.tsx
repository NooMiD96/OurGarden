import React from "react";

import { IProduct } from "@src/components/Product/State";

import AddToCardWrapper from "./style/AddToCard.style";
import AddToCardButton from "./AddToCardButton";

export interface IAddToCard {
  product: IProduct & { link: string };
  itemCount: string;
  setItemCount: (value: string) => void;
}

const AddToCard = (props: IAddToCard) => {
  const { product, itemCount, setItemCount } = props;

  return (
    <AddToCardWrapper className="card-description">
      <span className="card-cost">
        {product.price.toLocaleString()}
        р.
      </span>
      <AddToCardButton itemCount={itemCount} setItemCount={setItemCount} />
    </AddToCardWrapper>
  );
};

export default AddToCard;
