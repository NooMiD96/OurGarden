import React from "react";
import { connect } from "react-redux";

import CardConfirmSuccess from "./CardConfirmSuccess";
import Loading from "@src/core/components/Loading";

import { IApplicationState } from "@src/Store";

export const CardConfirmation = ({ pending }: { pending: boolean }) => {
  if (pending) {
    return <Loading />;
  }

  return <CardConfirmSuccess />;
};

export default connect((state: IApplicationState) => ({
  pending: !!state.app.pending.length
}))(CardConfirmation);
