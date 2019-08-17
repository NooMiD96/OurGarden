import React from "react";

import "./style/TotalPrice.style.scss";

interface ITotalPrice {
  totalPrice: number;
}

const TotalPrice = (props: ITotalPrice) => (
  <div className="total-price-wrapper price-wrapper">
    <span>Сумма: </span>
    <span className="price">
      {props.totalPrice}
      {" рублей"}
    </span>
  </div>
);

export default TotalPrice;
