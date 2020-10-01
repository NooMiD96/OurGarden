import React from "react";

import Loading from "@src/core/components/Loading";
import OrderCreateFault from "./OrderCreateFault";
import OrderCreateSuccess from "./OrderCreateSuccess";

import { IOrderCreate } from "./interfaces/IOrderCreate";

import "./style/OrderCreate.style.scss";

export const OrderCreate = ({
  pending,
  errorInner,
  ymId,
  orderId,
}: IOrderCreate) => {
  // prettier-ignore
  if (
    pending
    || (
      !orderId && !errorInner
    )
  ) {
    return <Loading />;
  }

  if (errorInner) {
    return (
      <OrderCreateFault ymId={ymId} errorInner={errorInner} orderId={orderId} />
    );
  }

  return <OrderCreateSuccess ymId={ymId} orderId={orderId} />;
};

export default OrderCreate;
