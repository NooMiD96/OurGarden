import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import Archive from "@core/icons/Archive";
import Badge from "@core/antd/Badge";

import { darkGreenColor } from "@src/core/constants";

import { IApplicationState } from "@src/Store";

interface ICard {
  totalCount: number;
  push: (location: string) => void;
}

const Card = (props: ICard) => (
  <React.Fragment>
    <Badge
      style={{ backgroundColor: darkGreenColor, color: "#fff" }}
      count={props.totalCount}
    >
      <Archive onClick={() => props.push("/Корзина")} />
    </Badge>
  </React.Fragment>
);

export default connect(
  (state: IApplicationState) => ({
    totalCount: state.userCard.totalCount
  }),
  {
    push: push
  }
)(Card);
