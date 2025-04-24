import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import LottieWebIcon from "@core/components/LottieWebIcon";

import { actionCreators } from "@src/components/UserCard/actions";
import { CARD_PATH } from "@src/core/constants";
import { DARK_GREEN_COLOR } from "@src/core/constants/style";

import { IApplicationState } from "@src/Store";

interface ICard {
  totalCount: number;
  loadCardFromLocalState: typeof actionCreators.loadCardFromLocalState;
}

const Card = (props: ICard) => {
  const [WrapperComponent, setWrapperComponent] = useState(null as any);
  const navigate = useNavigate();

  useEffect(() => {
    props.loadCardFromLocalState();
  }, []);

  useEffect(() => {
    const loadComponent = async (productCount: number) => {
      if (productCount) {
        const component = await import(
          /* webpackChunkName: "UserCardBadge" */ "@core/antd/Badge"
        );

        setWrapperComponent(component);
      }
    };

    loadComponent(props.totalCount);
  }, [props.totalCount]);

  const icon = (
    <LottieWebIcon type="archive" onClick={() => navigate(CARD_PATH)} />
  );

  if (WrapperComponent) {
    return (
      <WrapperComponent.default
        className="badge-wrapper"
        style={{ backgroundColor: DARK_GREEN_COLOR, color: "#fff" }}
        count={props.totalCount}
      >
        {icon}
      </WrapperComponent.default>
    );
  }

  return <span className="badge-wrapper">{icon}</span>;
};

export default connect(
  (state: IApplicationState) => ({
    totalCount: state.userCard.totalCount,
  }),
  {
    loadCardFromLocalState: actionCreators.loadCardFromLocalState,
  }
)(Card) as any;
