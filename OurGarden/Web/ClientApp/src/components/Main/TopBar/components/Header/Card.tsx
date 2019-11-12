import React, { useEffect } from "react";
import { push as pushAction } from "connected-react-router";
import { connect } from "react-redux";

import Archive from "@core/icons/Archive";
import Badge from "@core/antd/Badge";

import { actionCreators } from "@src/components/UserCard/actions";

import { darkGreenColor } from "@src/core/constants";

import { IApplicationState } from "@src/Store";

interface ICard {
  totalCount: number;
  push: typeof pushAction;
  loadCardFromLocalstate: typeof actionCreators.loadCardFromLocalstate;
}

const Card = (props: ICard) => {
  useEffect(() => {
    props.loadCardFromLocalstate();
  }, []);

  return (
    <React.Fragment>
      <Badge
        style={{ backgroundColor: darkGreenColor, color: "#fff" }}
        count={props.totalCount}
      >
        <Archive onClick={() => props.push("/Card")} />
      </Badge>
    </React.Fragment>
  );
};

export default connect(
  (state: IApplicationState) => ({
    totalCount: state.userCard.totalCount
  }),
  {
    push: pushAction,
    loadCardFromLocalstate: actionCreators.loadCardFromLocalstate
  }
)(Card);
