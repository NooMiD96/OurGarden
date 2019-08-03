import React from "react";

import CustomIcon from "@src/core/antd/Icon";

import { ICellRendererParams } from "ag-grid-community";

const style = {
  width: "100%",
  height: "100%"
};

const ActionRenderer = (params: ICellRendererParams) => {
  const onClick = () => {
    params.context.parentComponent.props.onDoubleClickHandler(params.data);
  };

  return (
    <React.Fragment>
      <CustomIcon style={style} onClick={onClick} type="edit" />
    </React.Fragment>
  );
};

export default ActionRenderer;
