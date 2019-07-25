import React from "react";

import { IProduct } from "@src/components/Product/State";

import AddToCardWrapper from "./style/AddToCard.style";
import AddToCardButton from "./AddToCardButton";

import { IMouseClickEvent } from "../IEvents";

export interface IAddToCard {
  product: IProduct & { link: string };
  itemCount: string;
  setItemCount: (value: string) => void;
  addToCard: (e: IMouseClickEvent) => void;
}

const AddToCard = (props: IAddToCard) => {
  const { product, itemCount, setItemCount, addToCard } = props;

  return (
    <AddToCardWrapper className="card-description">
      <span className="card-cost">
        {product.price.toLocaleString()}
        р.
      </span>
      <AddToCardButton
        itemCount={itemCount}
        setItemCount={setItemCount}
        addToCard={addToCard}
      />
    </AddToCardWrapper>
  );
};

export default AddToCard;
