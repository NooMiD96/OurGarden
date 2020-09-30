import React from "react";

import AddToCardButton from "../AddToCardButton";
import RussianCurrency from "@core/components/RussianCurrency";

import { IAddToCard } from "./interfaces/IAddToCard";

import "./style/AddToCard.style.scss";

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
            <RussianCurrency />
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
