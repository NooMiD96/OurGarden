import React from "react";

import CardConfirmSuccess from "./CardConfirmSuccess";
import Loading from "@src/core/components/Loading";

const CardConfirmation = ({ pending }: {pending: boolean}) => (
  <React.Fragment>
    {pending ? (
      <Loading />
    ) : (
      <CardConfirmSuccess />
    )}
  </React.Fragment>
);

export default CardConfirmation;
