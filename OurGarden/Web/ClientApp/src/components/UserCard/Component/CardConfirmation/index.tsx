import React from "react";

import Title from "@core/antd/Typography/Title";
import CardConfirmationForm from "./CardConfirmationForm";

import { ICardConfirmation } from "./ICardConfirmation";
import { DisplayTypeEnum } from "../../TState";

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
