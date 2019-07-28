import React from "react";

import Button from "@src/core/antd/Button";

import { ICardInfoFooter } from "./ICardInfo";
import { DisplayTypeEnum } from "../../TState";

const CardInfoFooter = (props: ICardInfoFooter) => {
  return (
    <React.Fragment>
      {props.isVisible && (
        <React.Fragment>
          <div className="price-wrapper">
            <span>Сумма: </span>
            <span className="price">
              {props.totalPrice}
              {" рублей"}
            </span>
          </div>
          <div className="buttons-wrapper">
            <Button className="clean-button" onClick={props.сleanProductCard}>
              Очистить корзину
            </Button>
            <Button
              type="primary"
              className="order-button"
              onClick={() =>
                props.onChangeOrderStep(DisplayTypeEnum.CardConfirmation)
              }
            >
              Оформить заказ
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CardInfoFooter;
