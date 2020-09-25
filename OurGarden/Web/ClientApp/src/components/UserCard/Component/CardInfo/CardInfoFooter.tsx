import React from "react";

import Button from "@src/core/antd/Button";
import TotalPrice from "@src/core/components/TotalPrice";

import { ICardInfoFooter } from "./ICardInfo";
import { DisplayTypeEnum } from "../../TState";

import "../style/ButtonWrapper.style.scss";

const CardInfoFooter = (props: ICardInfoFooter) => (
  <React.Fragment>
    {props.isVisible && (
      <React.Fragment>
        <div style={{ paddingLeft: "1rem" }}>
          <TotalPrice totalPrice={props.totalPrice} />
        </div>
        <div className="button-wrapper buttons-wrapper-with-padding">
          <Button
            className="custom-styled-btn"
            onClick={() => {
              window.ym(props.ymId, "reachGoal", "CLEAN_CHECKOUT");
              props.cleanProductCard();
            }}
          >
            Очистить корзину
          </Button>
          <Button
            className="custom-styled-btn"
            type="primary"
            onClick={() => {
              window.ym(props.ymId, "reachGoal", "TO_ORDER");
              props.onChangeOrderStep(DisplayTypeEnum.CardConfirmation);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default CardInfoFooter;
