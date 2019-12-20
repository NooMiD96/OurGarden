import React from "react";

import CardConfirmSuccess from "./CardConfirmSuccess";
import Loading from "@src/core/components/Loading";

import { ICardConfirm } from "./ICardConfirm";

export const CardConfirmation = ({
  pending,
  errorInner,
  ymId
}: ICardConfirm) => {
  if (pending) {
    return <Loading />;
  }

  if (errorInner) {
    return <CardConfirmSuccess />;
  }

  return <CardConfirmSuccess ymId={ymId} />;
};

export default CardConfirmation;
