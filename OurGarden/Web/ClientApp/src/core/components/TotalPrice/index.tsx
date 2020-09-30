import React from "react";

import RussianCurrency from "@core/components/RussianCurrency";

import "./style/TotalPrice.style.scss";

interface ITotalPrice {
  totalPrice: number;
}

const TotalPrice = (props: ITotalPrice) => (
  <div className="total-price-wrapper price-wrapper">
    <span>Сумма: </span>
    <span className="price">
      {props.totalPrice}
      <RussianCurrency />
    </span>
  </div>
);

export default TotalPrice;
