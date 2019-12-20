import React from "react";

import CardConfirmationForm from "./CardConfirmationForm";

import { ICardConfirmation } from "./ICardConfirmation";
import { DisplayTypeEnum } from "../../TState";
import { Title } from "@src/core/antd/Typography";

const CardConfirmation = (props: ICardConfirmation) => {
  const totalPrice = props.productList
    .map((x) => x.count * x.product.price)
    .reduce((val, acc) => acc + val, 0);

  return (
    <React.Fragment>
      <Title className="confirmation-title">Данные заказа</Title>
      <CardConfirmationForm
        cancel={() => props.onChangeOrderStep(DisplayTypeEnum.CardInfo)}
        submit={props.sendOrder}
        totalPrice={totalPrice}
        ymId={props.ymId}
      />
    </React.Fragment>
  );
};

export default CardConfirmation;
