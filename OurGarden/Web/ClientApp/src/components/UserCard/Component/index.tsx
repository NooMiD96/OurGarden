import React from "react";

import CardInfo from "./CardInfo";
import CardConfirmation from "./CardConfirmation";
import OrderCreated from "@src/core/components/OrderCreated";

import { TState, TComponentState, DisplayTypeEnum } from "../TState";
import { IOrderUserInformation } from "../Model/IModel";

import { WHITE_BLOCK } from "@src/core/constants/style";

import "./style/UserCard.style.scss";

export class UserCard extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    displayType: DisplayTypeEnum.CardInfo,
    orderCreated: false,
    mounted: false,
  };

  componentDidMount() {
    this.props.setBreadcrumb({
      breadcrumb: [],
      key: "",
    });
    this.setState({
      mounted: true,
    });
  }

  onChangeOrderStep = (newType: DisplayTypeEnum) => {
    this.setState({
      displayType: newType,
    });
  };

  getAdditionalClassName = () => {
    const { productList } = this.props;
    const { displayType, orderCreated } = this.state;

    if (!productList || productList.length === 0) {
      return "card-empty";
    }

    if (orderCreated) {
      return "card-confirm";
    }

    return displayType === DisplayTypeEnum.CardConfirmation
      ? "card-confirmation flex-grow-0"
      : "card-info flex-grow-1";
  };

  sendOrder = (userInfo: IOrderUserInformation) => {
    this.setState({
      orderCreated: true,
    });
    this.props.sendOrder(userInfo);
  };

  render() {
    const {
      productList,
      changeCountOfProduct,
      removeProductFromCard,
      cleanProductCard,
      pending,
      errorInner,
      ymId,
    } = this.props;

    const { displayType, orderCreated, mounted } = this.state;

    if (!mounted) {
      return <div />;
    }

    let renderComponent = null;

    if (orderCreated) {
      renderComponent = (
        <OrderCreated pending={pending} errorInner={errorInner} ymId={ymId} />
      );
    } else {
      // prettier-ignore
      renderComponent
        = displayType === DisplayTypeEnum.CardInfo ? (
          <CardInfo
            productList={productList}
            removeProductFromCard={removeProductFromCard}
            changeCountOfProduct={changeCountOfProduct}
            cleanProductCard={cleanProductCard}
            onChangeOrderStep={this.onChangeOrderStep}
            ymId={ymId}
          />
        ) : (
          <CardConfirmation
            productList={productList}
            sendOrder={this.sendOrder}
            onChangeOrderStep={this.onChangeOrderStep}
            ymId={ymId}
          />
        );
    }

    const additionalClassName = this.getAdditionalClassName();

    return (
      <div
        className={`user-card-wrapper content ${WHITE_BLOCK} ${additionalClassName}`}
      >
        {renderComponent}
      </div>
    );
  }
}

export default UserCard;
