import React, { useState } from "react";

import CardConfirmationForm from "./CardConfirmationForm";
import CardConfirmationSuccess from "./CardConfirmationSuccess";
import Loading from "@src/core/components/Loading";

import { ICardConfirmation } from "./ICardConfirmation";
import { DisplayTypeEnum } from "../../TState";
import { Title } from "@src/core/antd/Typography";

const CardConfirmation = (props: ICardConfirmation) => {
  const [isOrderCreate, changeOrderState] = useState(false);

  const totalPrice = props.productList
    .map((x) => x.count * x.product.price)
    .reduce((val, acc) => acc + val, 0);

  return (
    <React.Fragment>
      {!isOrderCreate && (
        <Title className="confirmation-title">Данные заказа</Title>
      )}
      {isOrderCreate ? (
        props.pending ? (
          <Loading />
        ) : (
          <CardConfirmationSuccess />
        )
      ) : (
        <CardConfirmationForm
          cancel={() => props.onChangeOrderStep(DisplayTypeEnum.CardInfo)}
          submit={(model) => {
            props.sendOrder(model);
            changeOrderState(true);
          }}
          totalPrice={totalPrice}
        />
      )}
    </React.Fragment>
  );
};

export default CardConfirmation;
