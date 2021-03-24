import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
  const [WrapperComponent, setWrapperComponent] = useState(null as any);

  useEffect(() => {
    props.loadCardFromLocalstate();
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
    <LottieWebIcon type="archive" onClick={() => props.push(CARD_PATH)} />
  );

  if (WrapperComponent) {
    return (
      // eslint-disable-next-line react/jsx-pascal-case
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
