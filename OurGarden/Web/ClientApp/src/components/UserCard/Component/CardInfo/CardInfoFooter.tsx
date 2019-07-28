import React from "react";

import Button from "@src/core/antd/Button";
import TotalPrice from "@src/core/components/TotalPrice";

import ButtonWrapper from "../style/ButtonWrapper.style";

import { ICardInfoFooter } from "./ICardInfo";
import { DisplayTypeEnum } from "../../TState";

const CardInfoFooter = (props: ICardInfoFooter) => {
  return (
    <React.Fragment>
      {props.isVisible && (
        <React.Fragment>
          <div style={{ paddingLeft: "1rem" }}>
            <TotalPrice totalPrice={props.totalPrice} />
          </div>
          <ButtonWrapper className="buttons-wrapper-with-padding">
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
          </ButtonWrapper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CardInfoFooter;
