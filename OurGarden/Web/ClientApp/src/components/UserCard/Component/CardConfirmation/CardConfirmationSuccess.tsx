import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@src/core/antd/Button";
import { Title } from "@src/core/antd/Typography";

const CardConfirmationSuccess = () => {
  return (
    <div className="order-success">
      <Title className="text-wrapper">
        Спасибо за заказ! Мы Вам перезвоним!
      </Title>
      <div className="btn-wrapper">
        <Button type="primary">
          <NavLink to="/">Вернуться на главную</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default CardConfirmationSuccess;
