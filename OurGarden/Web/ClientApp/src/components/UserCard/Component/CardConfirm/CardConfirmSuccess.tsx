import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import Button from "@src/core/antd/Button";
import { Title } from "@src/core/antd/Typography";

import { ICardConfirmSuccess } from "./ICardConfirm";

const CardConfirmSuccess = ({ ymId }: ICardConfirmSuccess) => {
  useEffect(() => {
    if (ymId) {
      window.ym(ymId, "reachGoal", "SUCCESS_ORDER");
    }
  }, []);

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

export default CardConfirmSuccess;
