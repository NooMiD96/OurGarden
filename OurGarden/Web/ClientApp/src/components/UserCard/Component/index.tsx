import React from "react";

import CardInfo from "./CardInfo";
import CardConfirmation from "./CardConfirmation";

import UserCardWrapper from "./style/UserCard.style";

import { TState, TComponentState, DisplayTypeEnum } from "../TState";

export class UserCard extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    displayType: DisplayTypeEnum.CardInfo
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {
      productList,
      removeProductFromCard,
      changeCountOfProduct
    } = this.props;

    const renderComponent
      = this.state.displayType === DisplayTypeEnum.CardInfo ? (
        <CardInfo
          productList={productList}
          removeProductFromCard={removeProductFromCard}
          changeCountOfProduct={changeCountOfProduct}
        />
      ) : (
        <CardConfirmation productList={productList} />
      );

    return (
      <UserCardWrapper>
        {renderComponent}
      </UserCardWrapper>
    );
  }
}

export default UserCard;
