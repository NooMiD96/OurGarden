import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import Button from "@core/antd/Button";
import Title from "@core/antd/Typography/Title";
import Paragraph from "@core/antd/Typography/Paragraph";

import { IOrderCreateSuccess } from "./interfaces/IOrderCreateSuccess";

export const OrderCreateSuccess = ({ ymId, orderId }: IOrderCreateSuccess) => {
  useEffect(() => {
    if (ymId) {
      window.ym(ymId, "reachGoal", "SUCCESS_ORDER");
    }
  }, []);

  return (
    <div className="order-result-wrapper">
      <Title className="title-wrapper">
        Спасибо за заказ! Мы Вам перезвоним!
      </Title>
      <Paragraph className="info-text">
        {orderId ? `Ваш заказ №${orderId} получен. ` : ""}
        Мы отправили Вам уведомление с информацией о заказе на почту.
      </Paragraph>
      <div className="btn-wrapper">
        <Button className="custom-styled-btn" type="primary">
          <NavLink to="/">Вернуться на главную</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default OrderCreateSuccess;
