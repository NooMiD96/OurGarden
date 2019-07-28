import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@src/core/antd/Button";

const CardConfirmationSuccess = () => {
  return (
    <div className="order-success">
      Спасибо за заказ! Мы Вам перезвоним!
      <Button type="primary">
        <NavLink to="/">Вернуться на главную</NavLink>
      </Button>
    </div>
  );
};

export default CardConfirmationSuccess;
