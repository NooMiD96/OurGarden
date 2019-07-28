import React from "react";

import Wrapper from "./style/TotalPrice.style";

interface ITotalPrice {
  totalPrice: number;
}

const TotalPrice = (props: ITotalPrice) => (
  <Wrapper className="price-wrapper">
    <span>Сумма: </span>
    <span className="price">
      {props.totalPrice}
      {" рублей"}
    </span>
  </Wrapper>
);

export default TotalPrice;
