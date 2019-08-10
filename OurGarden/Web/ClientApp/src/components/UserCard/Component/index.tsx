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

  onChangeOrderStep = (newType: DisplayTypeEnum) => {
    this.setState({
      displayType: newType
    });
  };

  render() {
    const {
      productList,
      pending,
      sendOrder,
      changeCountOfProduct,
      removeProductFromCard,
      сleanProductCard
    } = this.props;

    const { displayType } = this.state;

    const renderComponent
      = displayType === DisplayTypeEnum.CardInfo ? (
        <CardInfo
          productList={productList}
          removeProductFromCard={removeProductFromCard}
          changeCountOfProduct={changeCountOfProduct}
          сleanProductCard={сleanProductCard}
          onChangeOrderStep={this.onChangeOrderStep}
        />
      ) : (
        <CardConfirmation
          productList={productList}
          sendOrder={sendOrder}
          onChangeOrderStep={this.onChangeOrderStep}
          pending={pending}
        />
      );

    return (
      <UserCardWrapper className="content white-background">
        {renderComponent}
      </UserCardWrapper>
    );
  }
}

export default UserCard;
