import React, { useEffect } from "react";
import { connect } from "react-redux";

import Badge from "@core/antd/Badge";
import LottieWebIcon from "@core/components/LottieWebIcon";
import WithRouterPush, {
  TWithRouter,
} from "@src/core/components/WithRouterPush";

import { actionCreators } from "@src/components/UserCard/actions";
import { CARD_PATH } from "@src/core/constants";
import { DARK_GREEN_COLOR } from "@src/core/constants/style";

import { IApplicationState } from "@src/Store";

interface ICard {
  totalCount: number;
  loadCardFromLocalstate: typeof actionCreators.loadCardFromLocalstate;
}

const Card = (props: TWithRouter<ICard>) => {
  useEffect(() => {
    props.loadCardFromLocalstate();
  }, []);

  return (
    <React.Fragment>
      <Badge
        style={{ backgroundColor: DARK_GREEN_COLOR, color: "#fff" }}
        count={props.totalCount}
      >
        <LottieWebIcon type="archive" onClick={() => props.push(CARD_PATH)} />
      </Badge>
    </React.Fragment>
  );
};

export default WithRouterPush<any>(
  connect(
    (state: IApplicationState) => ({
      totalCount: state.userCard.totalCount,
    }),
    {
      loadCardFromLocalstate: actionCreators.loadCardFromLocalstate,
    }
  )(Card) as any
);
