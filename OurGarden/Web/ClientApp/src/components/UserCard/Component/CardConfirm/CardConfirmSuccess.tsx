import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import Button from "@core/antd/Button";
import { Title, Paragraph } from "@core/antd/Typography";

import { ICardConfirmSuccess } from "./ICardConfirm";

const CardConfirmSuccess = ({ ymId }: ICardConfirmSuccess) => {
  useEffect(() => {
    if (ymId) {
      window.ym(ymId, "reachGoal", "SUCCESS_ORDER");
    }
  }, []);

  return (
    <div className="order-success">
      <Title className="title-wrapper">
        Спасибо за заказ! Мы Вам перезвоним!
      </Title>
      <Paragraph className="info-text">
        Мы отправили Вам письмо с информацией о заказе на почту.
      </Paragraph>
      <div className="btn-wrapper">
        <Button className="custome-styled-btn" type="primary">
          <NavLink to="/">Вернуться на главную</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default CardConfirmSuccess;
