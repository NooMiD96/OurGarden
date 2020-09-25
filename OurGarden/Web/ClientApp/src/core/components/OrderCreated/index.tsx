import React from "react";

import Loading from "@src/core/components/Loading";
import OrderCreatedSuccess from "./OrderCreatedSuccess";

import { IOrderCreated } from "./interfaces/IOrderCreated";

import "./style/OrderCreated.style.scss";

export const OrderCreated = ({ pending, errorInner, ymId }: IOrderCreated) => {
  if (pending) {
    return <Loading />;
  }

  if (errorInner) {
    return <OrderCreatedSuccess />;
  }

  return <OrderCreatedSuccess ymId={ymId} />;
};

export default OrderCreated;
