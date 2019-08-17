import React from "react";

import CardInfo from "./CardInfo";
import CardConfirmation from "./CardConfirmation";

import { TState, TComponentState, DisplayTypeEnum } from "../TState";

import "./style/UserCard.style.scss";

export class UserCard extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    displayType: DisplayTypeEnum.CardInfo
  };

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
      <div className="user-card-wrapper content white-background">
        {renderComponent}
      </div>
    );
  }
}

export default UserCard;
