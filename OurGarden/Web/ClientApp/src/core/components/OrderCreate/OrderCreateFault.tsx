import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import Button from "@core/antd/Button";
import { Title, Paragraph } from "@core/antd/Typography";
import MainMobileLink from "../MainMobileLink";

import { CARD_PATH } from "@src/core/constants";

import { IOrderCreateFault } from "./interfaces/IOrderCreateFault";

export const OrderCreateFault = ({
  ymId,
  orderId,
  errorInner: _,
}: IOrderCreateFault) => {
  useEffect(() => {
    if (ymId) {
      window.ym(ymId, "reachGoal", "FAULT_ORDER");
    }
  }, []);

  // prettier-ignore
  return (
    <div className="order-result-wrapper">
      <Title className="title-wrapper">Упс, что-то пошло не так...</Title>
      <Paragraph className="info-text">
        {orderId ? (
          <>
            Нам не удалось отправить уведомление о заказе Вам и на нашу почту.
            Пожалуйста, сообщите нам номер вашего заказа - №
            {orderId}
            {" "}
            - и об
            этой ошибке, воспользовавшись онлайн чатом или позвоните нам по
            телефону
            {" "}
            <MainMobileLink ymId={ymId} />
            .
          </>
        ) : (
          <>
            Нам не удалось оформить Ваш заказ. Пожалуйста, свяжитесь с нами по
            телефону
            {" "}
            <MainMobileLink ymId={ymId} />
            {" "}
            или воспользуйтесь онлайн чатом и мы сами оформим заказ, который
            остался в вашей корзине.
          </>
        )}
      </Paragraph>
      <div className="btn-wrapper">
        <Button className="custom-styled-btn" type="primary">
          <NavLink to="/">Вернуться на главную</NavLink>
        </Button>
        <Button className="custom-styled-btn">
          <NavLink to={CARD_PATH}>Вернуться в корзину</NavLink>
        </Button>
      </div>
    </div>
  );
};

export default OrderCreateFault;
