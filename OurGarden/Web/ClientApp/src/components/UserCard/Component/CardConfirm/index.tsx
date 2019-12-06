import React from "react";

import CardConfirmSuccess from "./CardConfirmSuccess";
import Loading from "@src/core/components/Loading";

import { ICardConfirm } from "./ICardConfirm";

export const CardConfirmation = ({ pending, errorInner }: ICardConfirm) => {
  if (pending) {
    return <Loading />;
  }

  if (errorInner) {
    return <CardConfirmSuccess />;
  }

  return <CardConfirmSuccess />;
};

export default CardConfirmation;
