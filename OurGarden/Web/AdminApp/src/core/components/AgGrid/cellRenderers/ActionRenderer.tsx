import React from "react";
import { ICellRendererParams } from "ag-grid-community";

const ActionRenderer = (params: ICellRendererParams) => {
  return (
    <>
      <span>+</span>
      <span>-</span>
    </>
  );
}

export default ActionRenderer;
