import React from "react";

import { IProduct } from "@src/components/Product/State";
import AddToCardButton from "./AddToCardButton";

import { IMouseClickEvent } from "../IEvents";

import "./style/AddToCard.style.scss";

export interface IAddToCard {
  product: IProduct & { link: string };
  itemCount: string;
  setItemCount: (value: string) => void;
  addToCard: (e: IMouseClickEvent) => void;
}

const AddToCard = (props: IAddToCard) => {
  // prettier-ignore
  const {
    product, itemCount, setItemCount, addToCard
  } = props;

  return (
    <div className="add-to-card-wrapper card-description">
      {product.price ? (
        <React.Fragment>
          <span className="card-cost">
            {product.price.toLocaleString()}
            р.
          </span>
          <AddToCardButton
            itemCount={itemCount}
            setItemCount={setItemCount}
            addToCard={addToCard}
          />
        </React.Fragment>
      ) : (
        "Под заказ"
      )}
    </div>
  );
};

export default AddToCard;
